/* eslint-disable react/prop-types */

import moment from "moment";

// eslint-disable-next-line react/prop-types
export const ModalUserDetail = ({ user, handleClick }) => {
  return (
    <div
      id="default-modal"
      tabIndex="1"
      aria-hidden="false"
      className="bg-slate-700/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-[calc(100%-1rem)] max-h-full"
    >
      <div className="mx-auto my-auto relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-2 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-auto">
              User details
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

          <div className="flex flex-col p-2 md:p-5 space-y-4">
            <div className="mb-8">
              <span>
                <img
                  className="w-13 h-13"
                  src={user.image}
                  alt={`${user.first_name} ${user.last_name} image`}
                />
              </span>
            </div>
            <ul className="flex-1 flex-wrap justify-center flex-col">
              {/* <li className="mb-8 flex flex-col">
              </li> */}
              <li className="mb-4 flex">
                <span className="block mb-2">Name</span>
                <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {user.first_name}
                </span>
              </li>
              <li className="mb-4 flex">
                <span className="block mb-2">Lastname</span>
                <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {user.last_name}
                </span>
              </li>
              <li className="mb-4 flex">
                <span className="block mb-2">Birthdate</span>
                <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {moment(user.birthdate).format("D [de] MMM, YYYY")}
                </span>
              </li>
              <li className="mb-4 flex">
                <span className="block mb-2">DNI</span>
                <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {user.dni}
                </span>
              </li>
              <li className="mb-4 flex">
                <span className="block mb-2">Email</span>
                <span className=" ml-2 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </li>
              <li className="mb-4 flex">
                <span className="block mb-2">Status</span>
                <span className=" ml-4 block text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                  {user.active ? "Active" : "Inactive"}
                </span>
              </li>
            </ul>
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
