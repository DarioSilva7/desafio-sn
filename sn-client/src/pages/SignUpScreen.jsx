import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { useForm } from "../hooks/useForm";
import { registerAction } from "../services/actions";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { validateInputsRegister } from "../utils/validations";

export const SignUpScreen = () => {
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("register");
  const navigate = useNavigate();

  const {
    errors,
    first_name,
    last_name,
    dni,
    email,
    password,
    confirm,
    formState,
    onInputChange,
  } = useForm("register");

  const [birthdate, setBirthdate] = useState(null);

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const inputError = validateInputsRegister(formState);
    const hasErrors = Object.values(inputError).some((error) => {
      return !!error;
    });
    if (hasErrors) {
      alert("Please complete all fields to submit your registration");
    } else {
      const data = await registerAction({
        first_name,
        last_name,
        dni: parseInt(dni),
        email,
        password,
        confirm,
        birthdate,
      });
      if (data.ok) {
        alert(data.message);
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmitRegister}>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name (*)
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  value={first_name}
                  onChange={onInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.first_name && (
                  <p className={"text-red-500"}>{errors.first_name}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name (*)
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="last_name"
                  required
                  onChange={onInputChange}
                  value={last_name}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.last_name && (
                  <p className={"text-red-500"}>{errors.last_name}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="dni"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                DNI (*)
              </label>
              <div className="mt-2">
                <input
                  id="dni"
                  name="dni"
                  type="number"
                  autoComplete="dni"
                  required
                  value={dni}
                  min={1000000}
                  minLength={8}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.dni && <p className={"text-red-500"}>{errors.dni}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address (*)
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className={"text-red-500"}>{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Birthdate
              </label>
              <Calendar
                birthdate={birthdate}
                currentDate={null}
                setBirthdate={setBirthdate}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password (*)
                </label>
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
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPass}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className={"text-red-500"}>{errors.password}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password (*)
                </label>
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
              <div className="mt-2">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirmPass}
                  autoComplete="current-password"
                  required
                  value={confirm}
                  onChange={onInputChange}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirm && (
                  <p className={"text-red-500"}>{errors.confirm}</p>
                )}
              </div>
              {/* <span>(*) Required fields</span> */}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-4"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
