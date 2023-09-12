import { FC } from "react";
import Form from "../common/Form";

import useFormInput, { SignupInput } from "../hooks/useFormInput";

const Signup: FC = () => {
  const { input: signUpInput, handleChange } = useFormInput<SignupInput>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  return (
    <Form heading="Sign up" onSubmit={() => console.log("lols")}>
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
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
          name="email"
          id="email"
          placeholder="Enter your email"
          value={signUpInput.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          placeholder="Enter your password"
          value={signUpInput.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          name="confirm_password"
          id="confirm-password"
          placeholder="Confirm your password"
          value={signUpInput.confirm_password}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
};

export default Signup;
