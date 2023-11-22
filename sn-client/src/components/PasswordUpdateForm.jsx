import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { logout, setErrors, setMessages } from "../redux/userSlice";
import { updatePasswordAction } from "../services/actions";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { validateInputsChangePass } from "../utils/validations";

// eslint-disable-next-line react/prop-types
export const PasswordUpdateForm = ({ isAdmin, userId }) => {
  const dispatch = useDispatch();
  const { password, confirm, formState, errors, onInputChange } = useForm(
    "changePass",
    {}
  );

  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const handleUpdatepassword = async () => {
    const inputError = validateInputsChangePass(formState);
    const hasErrors = Object.values(inputError).some((error) => {
      return !!error;
    });
    if (hasErrors) {
      dispatch(
        setErrors([
          { error: "Please complete both fields to update your password" },
        ])
      );
    } else {
      try {
        const data = await updatePasswordAction(isAdmin, userId, {
          password,
          confirm,
        });
        dispatch(setMessages([{ msg: data.message }]));
        dispatch(logout());
      } catch (error) {
        console.error("Error al actualizar el correo electrónico:", error);
      }
    }
  };
  return (
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
        {errors.password && <p className={"text-red-500"}>{errors.password}</p>}
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
        {errors.confirm && <p className={"text-red-500"}>{errors.confirm}</p>}
      </div>
      <button
        className={`w-auto mx-auto mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
        onClick={handleUpdatepassword}
      >
        Send
      </button>
    </div>
  );
};
