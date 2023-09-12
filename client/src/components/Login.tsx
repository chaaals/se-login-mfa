import { FC } from "react";
import Form from "../common/Form";

import useFormInput, { LoginInput } from "../hooks/useFormInput";

const Login: FC = () => {
  const { input: loginInput, handleChange } = useFormInput<LoginInput>({
    username: "",
    password: "",
  });

  return (
    <Form heading="Log in" onSubmit={() => console.log("lols")}>
      <div>
        <label htmlFor="first-name">Username</label>
        <input
          name="username"
          id="first-name"
          placeholder="Enter your username"
          value={loginInput.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="last-name">Password</label>
        <input
          name="password"
          type="password"
          id="last-name"
          placeholder="Enter your password"
          value={loginInput.password}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
};

export default Login;
