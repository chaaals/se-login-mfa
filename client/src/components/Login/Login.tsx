import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Form from "../../common/Form";

import useFormInput, { LoginInput } from "../../hooks/useFormInput";

import { UserType } from "../../types";

import "./Login.css";

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/login/";

const Login: FC = () => {
  const { input: loginInput, handleChange } = useFormInput<LoginInput>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginInput.username) {
      setIsWrongCredentials(true);
      return;
    }

    // check password logic
    const res = await fetch(USER_ENDPOINT + loginInput.username, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: loginInput.password,
      }),
    });

    const user = (await res.json()) as UserType;

    if (!user?.username) {
      setIsWrongCredentials(true);
      return;
    }

    if (isWrongCredentials) {
      setIsWrongCredentials(false);
    }

    console.log("successfully logged in");
    navigate(`/log-in/otp?username=${user.username}`);
  };

  return (
    <Form heading="Log in" onSubmit={onSubmit}>
      <div>
        <label htmlFor="first-name">Username</label>
        <input
          required
          name="username"
          id="first-name"
          className={clsx(isWrongCredentials && "invalid")}
          placeholder="Enter your username"
          value={loginInput.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="last-name">Password</label>
        <input
          required
          name="password"
          type="password"
          id="last-name"
          className={clsx(isWrongCredentials && "invalid")}
          placeholder="Enter your password"
          value={loginInput.password}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
};

export default Login;
