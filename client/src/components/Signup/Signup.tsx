import { FC, FormEvent } from "react";
import Form from "../../common/Form";

import useFormInput, { SignupInput } from "../../hooks/useFormInput";
import clsx from "clsx";

import "./Signup.css";

const Signup: FC = () => {
  const { input: signUpInput, handleChange } = useFormInput<SignupInput>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpInput.password !== signUpInput.confirm_password) {
      return;
    }

    // username logic
    // email logic

    // submit logic
  };

  return (
    <Form heading="Sign up" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          required
          name="username"
          id="username"
          placeholder="Enter your first name"
          value={signUpInput.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          required
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
          name="email"
          id="email"
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
          className={clsx(
            signUpInput.password &&
              signUpInput.password.length !== 8 &&
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
  );
};

export default Signup;
