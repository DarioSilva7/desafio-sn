import { loginAction } from "../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const LoginScreen = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState("password");

  const { email, password, errors, onInputChange } = useForm("login");

  const onclickLogin = async (e) => {
    e.preventDefault();
    const response = await loginAction({
      email: email,
      password: password,
    });
    dispatch(loginUser(response));
    window.localStorage.setItem("user", JSON.stringify(response));
    navigate("/home");
  };

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(window.localStorage.getItem("user"));
      const storedPage = window.localStorage.getItem("page");

      if (storedUser) {
        dispatch(loginUser(storedUser));
        navigate(storedPage);
      }
    }
  }, []);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://github.com/org-sistemas-sn/desafio-tecnico/blob/advancedPlus/assets/sn-sintesis.png?raw=true"
          alt="Your Company"
        ></img>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onclickLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={onInputChange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && <p className={"text-red-500"}>{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
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
                value={password}
                onChange={onInputChange}
                required
                placeholder="Example: @4Password"
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {/* {isLoading ? (
              "loading"
            ) : ( */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            {/* )} */}
          </div>
          <div>
            {errors.password && (
              <p className={"text-red-500"}>{errors.password}</p>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to={"/register"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
