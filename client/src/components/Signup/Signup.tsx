import { FC, FormEvent, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import Form from "../../common/Form";
import Toast from "../../common/Toast";
import useFormInput, { SignupInput } from "../../hooks/useFormInput";

import "./Signup.css";

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/create";

type TInvalidCred = {
  invalid_email: boolean;
  invalid_username: boolean;
};

const INIT_VALUE = {
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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<TInvalidCred | null>(null);

  const [toastHeading, setToastHeading] = useState<string | null>(null);

  const token = searchParams.get("verify");

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
          username: signUpInput.username,
          email: signUpInput.email,
          password: signUpInput.password,
        }),
      });

      const data = await res.json();

      if (data.user_created) {
        resetForm(INIT_VALUE);
        setIsInvalidCredentials(null);

        setToastHeading("Email verification sent.");
        setTimeout(() => setToastHeading(null), 3500);
      } else {
        setIsInvalidCredentials(data as TInvalidCred);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const verifyUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(USER_ENDPOINT + `/verify/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const { message, status } = await res.json();

      if (status.success) {
        setIsUserVerified(true);

        setToastHeading(message);
        setTimeout(() => setToastHeading(null), 3500);
      } else {
        setToastHeading(message);
        setTimeout(() => setToastHeading(null), 3500);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      {token && (
        <main className="verify-container">
          {!isLoading && !isUserVerified && (
            <>
              <h1>Verify User</h1>
              <button className="verify-button" onClick={verifyUser}>
                Verify
              </button>
            </>
          )}

          {isLoading && !isUserVerified && <h1>Verifying...</h1>}

          {!isLoading && isUserVerified && (
            <h1>
              Verified! <Link to="/log-in">Go to Log in</Link>
            </h1>
          )}
        </main>
      )}
      {!token && (
        <>
          <button className="breadcrumb" onClick={() => navigate("/")}>
            &#x2190; Home
          </button>
          <Form heading="Sign up" onSubmit={onSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                required
                disabled={isLoading}
                name="username"
                id="username"
                className={clsx(
                  isInvalidCredentials?.invalid_username && "invalid"
                )}
                placeholder="Enter your first name"
                value={signUpInput.username}
                onChange={handleChange}
              />
              {isInvalidCredentials?.invalid_username && (
                <span className="invalid-message">Username is taken</span>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                disabled={isLoading}
                name="email"
                id="email"
                className={clsx(
                  isInvalidCredentials?.invalid_email && "invalid"
                )}
                type="email"
                placeholder="Enter your email"
                value={signUpInput.email}
                onChange={handleChange}
              />
              {isInvalidCredentials?.invalid_email && (
                <span className="invalid-message">Email is taken</span>
              )}
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
                  signUpInput.password !== signUpInput.confirm_password &&
                    "invalid"
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
        </>
      )}
      {toastHeading && <Toast heading={toastHeading} />}
    </>
  );
};

export default Signup;
