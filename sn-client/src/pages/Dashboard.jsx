import { useDispatch, useSelector } from "react-redux";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  activeUserAction,
  deleteUserAction,
  getUsersAction,
} from "../services/actions";
import {
  inactivateUser,
  loadUsers,
  reactivateUser,
  setMessages,
} from "../redux/userSlice";
import { useEffect, useState } from "react";
import { ModalUserDetail } from "../components/ModalUserDetail";
import { ImageUpdateForm } from "../components/ImageUpdateForm";
import { ModalUserEdit } from "../components/ModalUserEdit";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";

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
    const { message } = await deleteUserAction(userId);
    dispatch(setMessages([{ msg: message }]));
    dispatch(inactivateUser(userId));
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
    dispatch(setMessages([{ msg: message }]));
    dispatch(reactivateUser(userId));
  };

  useEffect(() => {
    getUsersAsync();
  }, [dispatch]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <SearchBar />
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
                        <EyeIcon
                          title="Detail"
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => showUserEdit(userItem)}
                      >
                        <PencilIcon
                          title="Edit"
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => deleteUser(userItem.id)}
                      >
                        <TrashIcon
                          title="Delete"
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
        <div className="flex justify-center mt-5 mb-5">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-5"
            onClick={() => setShowInactives(!showInactives)}
          >
            Usuarios inactivos
          </button>
          <Pagination pages={Math.ceil(qtyUsers / limit)} />
        </div>
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
      {showInactives && (
        //   <button onClick={() => handleClickActivateUser(u.id)}>
        //     Activar
        //   </button>
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
            {inactiveUsers &&
              inactiveUsers.map((userItem) => {
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
                        <EyeIcon
                          title="Edit"
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="mx-2 cursor-pointer"
                        onClick={() => handleClickActivateUser(userItem.id)}
                      >
                        <ArrowUpIcon
                          title="Activate"
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
      )}
    </>
  );
};
