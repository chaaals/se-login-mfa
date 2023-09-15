import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./Dashboard.css";

type TUserCookie = {
  name: string;
};

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUserCookie | null>(null);

  useEffect(() => {
    const getUser = () => {
      const u = Cookies.get("user") ?? "";

      if (u) {
        setUser(JSON.parse(u) as TUserCookie);
      } else {
        navigate("/");
      }
    };

    getUser();
  }, [navigate]);

  return (
    <main className="dashboard-main">
      <nav className="dashboard-nav">{user && `Welcome, ${user.name}`}</nav>

      <button
        onClick={() => {
          Cookies.remove("user");
          navigate("/");
        }}
      >
        Log out
      </button>
    </main>
  );
};

export default Dashboard;
