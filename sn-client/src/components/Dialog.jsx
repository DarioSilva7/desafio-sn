/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export const Dialog = ({ errors, messages, clouseDialog }) => {
  return (
    <div className="w-full flex absolute top-10 justify-center p-4 z-50">
      {errors && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-md max-w-4/5 flex flex-col items-center p-4 opacity-95 border-2 border-solid border-red-700 rounded-md">
          {errors.map((e) => (
            <p key={e.error}>{e.error}</p>
          ))}
          <button
            onClick={clouseDialog}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
          >
            Ok
          </button>
        </div>
      )}
      {messages && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-md max-w-4/5 flex flex-col items-center rounded-md p-4 opacity-95 border-2 border-solid border-indigo-500">
          {messages.map((message) => (
            <p key={message.msg}>{message.msg}</p>
          ))}
          <button
            onClick={clouseDialog}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
          >
            Ok
          </button>
        </div>
      )}
    </div>
  );
};
