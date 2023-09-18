import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { UserType } from "../../types";

import "./Dashboard.css";

type TUserTokenCookie = {
  token: string;
};

const USER_ENDPOINT = import.meta.env.VITE_PROJECT_API + "/user/login/";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const token = Cookies.get("token") ?? "";

      if (token) {
        const secret = JSON.parse(token) as TUserTokenCookie;

        const res = await fetch(USER_ENDPOINT + secret.token, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = (await res.json()) as UserType;

        if (user.username) {
          setUser(user);
        }
      } else {
        navigate("/");
      }
    };

    getUser();
  }, [navigate]);

  if (!user) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="dashboard-main">
      <nav className="dashboard-nav">{user && `Welcome, ${user.username}`}</nav>

      <button
        onClick={() => {
          Cookies.remove("token");
          navigate("/", { replace: true });
        }}
      >
        Log out
      </button>
    </main>
  );
};

export default Dashboard;
