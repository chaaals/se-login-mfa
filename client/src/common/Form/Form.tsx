import React, { FC, FormEvent } from "react";
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
      </section>
    </main>
  );
};

export default Form;
