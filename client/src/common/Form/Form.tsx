import React, { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

interface Props {
  children: React.ReactNode;
  heading: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<Props> = ({ children, heading, onSubmit }) => {
  return (
    <main>
      <section className="form-container">
        <h1>{heading}</h1>
        <form className="sign-up-form" onSubmit={onSubmit}>
          {children}
          <button type="submit">Submit</button>
        </form>
        {heading === "Log in" && (
          <p>
            No account? <Link to="/sign-up">Sign up!</Link>
          </p>
        )}
        {heading === "Sign up" && (
          <p>
            Already have an account? <Link to="/log-in">Log in!</Link>
          </p>
        )}
      </section>
    </main>
  );
};

export default Form;
