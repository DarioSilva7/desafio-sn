import { useNavigate, useLocation, Link } from "react-router-dom";
import { setErrors, setMessages } from "../redux/userSlice";
import { useForm } from "../hooks/useForm";
import { putResetPasswordAction } from "../services/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateInputsChangePass } from "../utils/validations";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const tokenResetPassword = urlParams.get("token");

  const navigate = useNavigate();
  const { password, confirm, errors, formState, onInputChange } =
    useForm("changePass");

  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const handleResetPassword = async () => {
    const inputError = validateInputsChangePass(formState);
    const hasErrors = Object.values(inputError).some((error) => {
      return !!error;
    });
    if (hasErrors) {
      dispatch(
        setErrors([
          { error: "Please complete both fields to reset your password" },
        ])
      );
    } else {
      const { ok, message } = await putResetPasswordAction(
        { password, confirm },
        tokenResetPassword
      );
      if (ok) {
        dispatch(setMessages([{ msg: message }]));
        navigate("/login", { replace: true });
      } else
        dispatch(
          setErrors([{ error: "No fue posible restablecer la contraseña" }])
        );
    }
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
          <label className="mt-4" htmlFor="password">
            New password:
          </label>
          <div className="flex justify-start">
            <input
              className="border border-solid border-sky-900"
              type={showPass}
              id="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            {showPass === "text" ? (
              <EyeSlashIcon
                className="w-8 ml-2 cursor-pointer"
                onClick={() => setShowPass("password")}
              />
            ) : (
              <EyeIcon
                className="w-8 ml-2 cursor-pointer"
                onClick={() => setShowPass("text")}
              />
            )}
          </div>
          <div>
            {errors.password && (
              <p className={"text-red-500"}>{errors.password}</p>
            )}
          </div>
          <label className="mt-4" htmlFor="confirm">
            Confirm password:
          </label>
          <div className="flex justify-start">
            <input
              className="border border-solid border-sky-900"
              type={showConfirmPass}
              id="confirm"
              name="confirm"
              value={confirm}
              onChange={onInputChange}
            />
            {showConfirmPass === "text" ? (
              <EyeSlashIcon
                className="w-8 ml-2 cursor-pointer"
                onClick={() => setShowConfirmPass("password")}
              />
            ) : (
              <EyeIcon
                className="w-8 ml-2 cursor-pointer"
                onClick={() => setShowConfirmPass("text")}
              />
            )}
          </div>
          <div>
            {errors.confirm && (
              <p className={"text-red-500"}>{errors.confirm}</p>
            )}
          </div>
          <div className="flex items-baseline">
            <button
              className="w-auto mx-auto mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleResetPassword}
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
