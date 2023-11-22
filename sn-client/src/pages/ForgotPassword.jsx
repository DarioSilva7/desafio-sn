import { Link } from "react-router-dom";
import { setMessages } from "../redux/userSlice";
import { useForm } from "../hooks/useForm";
import { postForgotPassword } from "../services/actions";
import { useDispatch } from "react-redux";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { email, errors, onInputChange } = useForm("forgot");

  const handleforgotPassword = async () => {
    const message = await postForgotPassword(email);
    dispatch(setMessages([{ msg: message + ", puede cerrar esta pagina" }]));
  };

  return (
    <div className="flex justify-center flex-row py-8 bg-white">
      <div className="flex py-4 flex-col">
        <img
          className="mx-auto h-10 w-auto"
          src="https://github.com/org-sistemas-sn/desafio-tecnico/blob/advancedPlus/assets/sn-sintesis.png?raw=true"
          alt="Your Company"
        />
        <h1 className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Reset password
        </h1>
        <div className="flex flex-col">
          <label className="mt-4" htmlFor="email">
            email:
          </label>
          <div className="flex justify-start">
            <input
              className="border border-solid border-sky-900"
              id="email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div>
            {errors.email && <p className={"text-red-500"}>{errors.email}</p>}
          </div>
          <div className="flex items-baseline">
            <button
              className="w-auto mx-auto mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleforgotPassword}
            >
              Send
            </button>
            <span className="mt-10 text-center text-sm text-gray-500">
              Go to
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 p-2"
              >
                login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
