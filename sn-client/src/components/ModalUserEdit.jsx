/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { updateDataAction } from "../services/actions";
import { Calendar } from "./Calendar";
import { changeDataAsAdmin, loadUser, setMessages } from "../redux/userSlice";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const ModalUserEdit = ({ user, handleClick }) => {
  const dispatch = useDispatch();
  const { roles, user: UserLoggued } = useSelector((state) => state.user);

  const { last_name, first_name, dni, onInputChange } = useForm({});
  const [birthdate, setBirthdate] = useState();

  const isAdmin = roles.includes("admin");

  const handleClickData = async () => {
    const objData = {
      last_name,
      first_name,
      dni: dni && parseInt(dni),
      birthdate,
    };
    const data = await updateDataAction(isAdmin, user.id, objData);
    if (data.ok) {
      isAdmin && UserLoggued.id !== user.id
        ? dispatch(changeDataAsAdmin(data.data.user))
        : dispatch(loadUser(data.data.user));
      dispatch(setMessages([{ msg: data.message }]));
      handleClick();
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="1"
      aria-hidden="false"
      className="bg-slate-700/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-[calc(100%-1rem)] max-h-full"
    >
      <div className="mx-auto my-auto relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className=" ml-auto text-xl font-semibold text-gray-900 dark:text-white">
              Edit profile
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={handleClick}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="flex flex-col p-4 md:p-5 space-y-4">
            <label htmlFor="first_name">Name: </label>
            <input
              type="text"
              name="first_name"
              placeholder={`${user.first_name}`}
              value={first_name}
              onChange={onInputChange}
            />
            <label htmlFor="last_name">Lastname: </label>
            <input
              type="text"
              name="last_name"
              placeholder={`${user.last_name}`}
              value={last_name}
              onChange={onInputChange}
            />
            <label htmlFor="dni">DNI: </label>
            <input
              type="number"
              name="dni"
              placeholder={`${user.dni}`}
              value={dni}
              onChange={onInputChange}
            />
            <label htmlFor="birthdate">Birthdate:</label>
            <Calendar
              birthdate={birthdate}
              currentDate={user.birthdate}
              setBirthdate={setBirthdate}
            />
            {/* <input
              type="text"
              name="birthdate"
              placeholder={
                moment(user.birthdate).format("D [de] MMM, YYYY") ||
                "YYYY-MM-DD"
              }
              value={birthdate}
              onChange={onInputChange}
            /> */}
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleClickData}
            >
              Update
            </button>
            {/* <EmailUpdateForm
              isAdmin={true}
              userId={user.id}
              user={user}
            ></EmailUpdateForm> */}
            {isAdmin && (
              <>
                <li className="mb-8 flex flex-col">
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Roles:
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600 pl-7	">
                    {user.Roles.map((r) => {
                      return (
                        <ul key={r.id} className="list-disc">
                          <li>{r.name}</li>
                        </ul>
                      );
                    })}
                  </p>
                </li>

                {/* <li className="mb-8 flex flex-col">
                  <span className="block mb-2">Estado</span>
                  <span className="block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                    {user.active ? "Activo" : "Inactivo"}
                  </span>
                </li> */}
              </>
            )}
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
