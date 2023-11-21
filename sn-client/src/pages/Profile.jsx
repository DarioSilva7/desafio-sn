import { PencilIcon } from "@heroicons/react/24/outline";
import { EmailUpdateForm } from "../components/EmailUpdateForm";
import { useEffect, useState } from "react";
import { ImageUpdateForm } from "../components/ImageUpdateForm";
import { useSelector } from "react-redux";
import { PasswordUpdateForm } from "../components/PasswordUpdateForm";
import { ModalUserEdit } from "../components/ModalUserEdit";
import moment from "moment";

/* eslint-disable react/prop-types */
export const Profile = ({ user }) => {
  window.localStorage.setItem("page", "/profile");

  const { roles, profilePicture } = useSelector((state) => state.user);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [userSelected, setUserSelected] = useState({});

  const [openPass, setOpenPass] = useState(false);

  const showUserEdit = async (userData) => {
    setOpenModalEdit(true);
    setUserSelected(userData);
  };

  useEffect(() => {
    // dispatch(getUser());
  }, [profilePicture]);

  return (
    <div>
      <div className="bg-white py-6">
        <h1 className=" mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Welcome to your profile
        </h1>
        {/* <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        </div> */}
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <div>
              <ImageUpdateForm
                isAdmin={false}
                userId={user.id}
                img={profilePicture}
                className={"mb-4 h-50 w-50"}
              ></ImageUpdateForm>
              <div className="mt-4 flex flex-col items-start">
                <button onClick={() => setOpenPass(!openPass)}>
                  <span className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Change password
                  </span>
                </button>
                {openPass && (
                  <PasswordUpdateForm isAdmin={false} userId={user.id} />
                )}
              </div>
            </div>
            <div className="flex flex-row p-2 md:p-5 space-y-4">
              <ul className="flex-auto flex-wrap justify-center flex-col">
                <li className="mb-4 flex">
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Name
                  </h3>
                  <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.first_name}
                  </span>
                </li>
                <li className="mb-4 flex">
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Lastname
                  </h3>
                  <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.last_name}
                  </span>
                </li>
                <li className="mb-4 flex">
                  <span className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Birthdate
                  </span>
                  <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.birthdate &&
                      moment(user.birthdate).format("D [de] MMM, YYYY")}
                  </span>
                </li>
                <li className="mb-4 flex">
                  <span className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    DNI
                  </span>
                  <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.dni}
                  </span>
                </li>
                <li className="mb-4 flex">
                  <EmailUpdateForm
                    isAdmin={false}
                    userId={user.id}
                    user={user}
                  ></EmailUpdateForm>
                </li>
                <li className="mb-4 flex">
                  <span className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Status
                  </span>
                  <span className=" ml-4 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </li>
                {roles.includes("admin") && (
                  <>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      Roles:
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600 pl-7	">
                      {roles.map((r) => {
                        return (
                          <ul key={r} className="list-disc">
                            <li>{r}</li>
                          </ul>
                        );
                      })}
                    </p>
                  </>
                )}
              </ul>
              <button
                className="flex mx-2 cursor-pointer"
                onClick={() => showUserEdit(user)}
              >
                <PencilIcon
                  title="Edit"
                  className="block h-8 w-8"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModalEdit && (
        <ModalUserEdit
          user={userSelected}
          handleClick={() => setOpenModalEdit(false)}
        />
      )}
    </div>
  );
};
