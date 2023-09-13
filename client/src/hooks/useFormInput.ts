import { useState, ChangeEvent } from "react";

export type LoginInput = {
  username: string;
  password: string;
};

export type SignupInput = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

interface FormInput<T> {
  input: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function useFormInput<T extends LoginInput | SignupInput>(
  initialValue: T
): FormInput<T> {
  const [input, setInput] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { input, handleChange };
}

export default useFormInput;