import { FC, FormEvent, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Cookies from "js-cookie";
import Form from "../../common/Form";
import useFormInput, { OTPInput } from "../../hooks/useFormInput";

import { UserType } from "../../types";

import "./OTPHandler.css";

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/verify/";

const INIT_VALUE = {
  otp: "",
};

const OTPHandler: FC = () => {
  const {
    input: otpInput,
    handleChange,
    resetForm,
  } = useFormInput<OTPInput>(INIT_VALUE);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isInvalid, setIsInvalid] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpInput.otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const username = searchParams.get("username");

    const res = await fetch(USER_ENDPOINT + username, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otpInput.otp,
      }),
    });

    const user = (await res.json()) as UserType;

    if (user.username) {
      Cookies.set("user", JSON.stringify({ name: user.username }), {
        expires: 1,
      });
      navigate("/dashboard");
    } else {
      setIsInvalid(true);
      resetForm(INIT_VALUE);
    }
  };

  if (!searchParams.has("username") || !searchParams.get("username")) {
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
        <span>{"OTP - "}</span>
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
