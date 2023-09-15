import { FC, FormEvent, useState } from "react";
import Form from "../../common/Form";

import useFormInput, { SignupInput } from "../../hooks/useFormInput";
import clsx from "clsx";

import { UserType } from "../../types";
import Toast from "../../common/Toast";

import "./Signup.css";

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/create";

const INIT_VALUE = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Signup: FC = () => {
  const {
    input: signUpInput,
    handleChange,
    resetForm,
  } = useFormInput<SignupInput>(INIT_VALUE);

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpInput.password !== signUpInput.confirm_password) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(USER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: signUpInput.first_name,
          last_name: signUpInput.last_name,
          username: signUpInput.username,
          email: signUpInput.email,
          password: signUpInput.password,
        }),
      });

      const data = (await res.json()) as UserType;

      if (data.username) {
        resetForm(INIT_VALUE);
      } else {
        setIsInvalidCredentials(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);

    setIsToastVisible(true);

    setTimeout(() => setIsToastVisible(false), 3500);
  };

  return (
    <>
      <Form heading="Sign up" onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            required
            disabled={isLoading}
            name="username"
            id="username"
            className={clsx(isInvalidCredentials && "invalid")}
            placeholder="Enter your first name"
            value={signUpInput.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            required
            disabled={isLoading}
            name="first_name"
            id="first-name"
            placeholder="Enter your first name"
            value={signUpInput.first_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            required
            disabled={isLoading}
            name="last_name"
            id="last-name"
            placeholder="Enter your last name"
            value={signUpInput.last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            disabled={isLoading}
            name="email"
            id="email"
            className={clsx(isInvalidCredentials && "invalid")}
            type="email"
            placeholder="Enter your email"
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            disabled={isLoading}
            className={clsx(
              signUpInput.password &&
                signUpInput.password.length < 8 &&
                "invalid"
            )}
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            required
            disabled={isLoading}
            className={clsx(
              signUpInput.password !== signUpInput.confirm_password && "invalid"
            )}
            name="confirm_password"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={signUpInput.confirm_password}
            onChange={handleChange}
          />
        </div>
      </Form>
      {isToastVisible && (
        <Toast>
          {isInvalidCredentials
            ? "Username or Email was already taken."
            : "User has been created!"}
        </Toast>
      )}
    </>
  );
};

export default Signup;
