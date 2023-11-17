/* eslint-disable react/prop-types */
import { useForm } from "../hooks/useForm";
import { updateEmailAction } from "../services/actions";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

// eslint-disable-next-line react/prop-types
export const EmailUpdateForm = ({ isAdmin, userId, user }) => {
  const dispatch = useDispatch();

  const initialForm = { email: "" };
  const { email, onInputChange } = useForm(initialForm);

  const handleUpdateEmail = async () => {
    try {
      await updateEmailAction(isAdmin, userId, email);
      !isAdmin && dispatch(logout());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
        Email:
      </h3>
      <input
        className="w-full mb-2"
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder={user.email}
        onChange={onInputChange}
      />
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleUpdateEmail}
      >
        Replace
      </button>
    </div>
  );
};
