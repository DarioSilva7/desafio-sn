import { useEffect, useState } from "react";
import {
  validateChangePass,
  validateLogin,
  validateRegister,
} from "../utils/validations";

export const useForm = (typeForm, initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState({});
  // const [hasTry, setHasTry] = useState(false);

  const onInputChange = ({ target, ...rest }) => {
    const { name, value } = target;

    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    // if (hasTry)
    switch (typeForm) {
      case "changePass":
        setErrors(validateChangePass(formState));
        break;
      case "login":
        setErrors(validateLogin(formState));
        break;
      case "register":
        setErrors(validateRegister(formState));
        break;

      default:
        break;
    }
  }, [formState, typeForm]);

  return {
    ...formState,
    errors,
    formState,
    onInputChange,
  };
};
// dario
// silva
// 33722435
// sincimex@gmail.com
// @4Password
