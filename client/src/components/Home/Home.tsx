import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../util";
import "./Home.css";

const Home: FC = () => {
  const navigate = useNavigate();
  const { token } = getToken();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <main>
      <section className="btn-container">
        <button className="btn sign-up" onClick={() => navigate("/sign-up")}>
          Sign up
        </button>
        <span>or</span>
        <button className="btn log-in" onClick={() => navigate("/log-in")}>
          Log in
        </button>
      </section>
    </main>
  );
};

export default Home;
