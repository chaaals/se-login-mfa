import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Cookies from "js-cookie";
import Form from "../../common/Form";

import useFormInput, { LoginInput } from "../../hooks/useFormInput";

import Toast from "../../common/Toast";

import "./Login.css";

type TLoginResponse = { token: string };

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/login/";

const Login: FC = () => {
  const { input: loginInput, handleChange } = useFormInput<LoginInput>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

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

    const data = (await res.json()) as TLoginResponse;

    if (!data?.token) {
      setIsWrongCredentials(true);
      setIsToastVisible(true);

      setTimeout(() => setIsToastVisible(false), 3500);
      return;
    }

    if (isWrongCredentials) {
      setIsWrongCredentials(false);
    }

    Cookies.set("token", JSON.stringify({ token: data.token }), {
      expires: 1,
      sameSite: "strict",
    });

    navigate(`/log-in/otp
    `);
  };

  return (
    <>
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
      {isToastVisible && <Toast heading="Wrong Credentials!" />}
    </>
  );
};

export default Login;
