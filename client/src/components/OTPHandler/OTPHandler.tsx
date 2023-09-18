import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Cookies from "js-cookie";
import { getToken } from "../../util";
import Form from "../../common/Form";
import useFormInput, { OTPInput } from "../../hooks/useFormInput";

import { UserType } from "../../types";

import "./OTPHandler.css";

type TUserToken = {
  token: string;
};

type TUserResponse = UserType & TUserToken;

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/verify/";

const INIT_VALUE = {
  otp: "",
};

const OTPHandler: FC = () => {
  const { input: otpInput, handleChange } = useFormInput<OTPInput>(INIT_VALUE);

  const navigate = useNavigate();

  const [isInvalid, setIsInvalid] = useState(false);

  const { token } = getToken();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpInput.otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const res = await fetch(USER_ENDPOINT + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otpInput.otp,
      }),
    });

    const user = (await res.json()) as TUserResponse;

    if (user.username) {
      Cookies.set("token", JSON.stringify({ token: user.token }), {
        expires: 1,
        sameSite: "strict",
      });
      navigate("/dashboard");
    } else {
      setIsInvalid(true);
    }
  };

  if (!token) {
    return (
      <main className="otp-error">
        <h1>Oops, something went wrong.</h1>
        <p style={{ textAlign: "center" }}>
          One-time password requires a user.{" "}
          <a href="/log-in">Go to log in page</a>
        </p>
      </main>
    );
  }

  return (
    <Form heading="One-time Password" onSubmit={onSubmit}>
      <div>
        <input
          required
          name="otp"
          id="otp"
          className={clsx(isInvalid && "invalid")}
          placeholder="Enter your One-time password"
          onChange={handleChange}
          value={otpInput.otp}
        />
      </div>
    </Form>
  );
};

export default OTPHandler;
