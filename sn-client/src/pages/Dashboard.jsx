import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  activeUserAction,
  deleteUserAction,
  getUsersAction,
} from "../services/actions";
import { filterById, loadUsers, reactivateUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { ModalUserDetail } from "../components/ModalUserDetail";
import { ImageUpdateForm } from "../components/ImageUpdateForm";
import { ModalUserEdit } from "../components/ModalUserEdit";
import { Pagination } from "../components/Pagination";
// import { SearchBar } from "./SearchBar";

export const Dashboard = () => {
  const { allUsers, inactiveUsers, qtyUsers, limit } = useSelector(
    (state) => state.user
  );

  const [openModalDetail, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [userSelected, setUserSelected] = useState({});
  const [showInactives, setShowInactives] = useState(false);
  const dispatch = useDispatch();

  const deleteUser = async (userId) => {
    await deleteUserAction(userId);
    dispatch(filterById(userId));
  };

  const showUserDetails = async (userData) => {
    setOpenModal(true);
    setUserSelected(userData);
  };
  const showUserEdit = async (userData) => {
    setOpenModalEdit(true);
    setUserSelected(userData);
  };
  const getUsersAsync = async () => {
    const data = await getUsersAction();
    dispatch(loadUsers(data));
  };

  const handleClickActivateUser = async (userId) => {
    const { message } = await activeUserAction(userId);
    alert(message);
    dispatch(reactivateUser(userId));
  };

  useEffect(() => {
    getUsersAsync();
  }, [dispatch]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <SearchBar /> */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Roles
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((userItem) => {
                return (
                  <tr
                    key={userItem.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td scope="row" className="px-6 py-4">
                      <ImageUpdateForm
                        isAdmin={true}
                        userId={userItem.id}
                        img={userItem.image}
                        className={"w-8 h-8"}
                      />
                    </td>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {userItem.first_name} {userItem.last_name}
                    </th>
                    <td className="px-6 py-4">{userItem.email}</td>

                    <td className="px-6 py-4">
                      {userItem.Roles.map((r) => {
                        return (
                          <ul key={r.id}>
                            <li value={r.id}>{r.name}</li>
                          </ul>
                        );
                      })}
                    </td>
                    <td className="px-6 py-4 flex">
                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => showUserDetails(userItem)}
                      >
                        <EyeIcon className="block h-6 w-6" aria-hidden="true" />
                      </button>

                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => showUserEdit(userItem)}
                      >
                        <PencilIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => deleteUser(userItem.id)}
                      >
                        <TrashIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination pages={Math.ceil(qtyUsers / limit)} />
        <button
          className="mx-2 cursor-pointer"
          onClick={() => setShowInactives(!showInactives)}
        >
          Usuarios inactivos
        </button>
      </div>
      {openModalDetail && (
        <ModalUserDetail
          user={userSelected}
          handleClick={() => setOpenModal(false)}
        />
      )}
      {openModalEdit && (
        <ModalUserEdit
          user={userSelected}
          handleClick={() => setOpenModalEdit(false)}
        />
      )}
      {showInactives &&
        inactiveUsers.map((u) => {
          return (
            <div key={u.id}>
              <h2>Inactive Users</h2>
              <span>{u.first_name}</span>
              <span>{u.last_name}</span>
              <span>{u.email}</span>
              <button onClick={() => handleClickActivateUser(u.id)}>
                Activar
              </button>
            </div>
          );
        })}
    </>
  );
};
