import { useState } from "react";
import { validateChangePass } from "../utils/validations";

export const useForm = (typeForm, initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const onInputChange = ({ target, ...rest }) => {
    const { name, value } = target;

    setFormState({ ...formState, [name]: value });

    switch (typeForm) {
      case "changePass":
        setErrors(validateChangePass({ ...errors, [name]: value }));
        break;

      default:
        break;
    }
  };
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
