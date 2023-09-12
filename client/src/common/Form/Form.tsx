import React, { FC } from "react";
import "./Form.css";

interface Props {
  children: React.ReactNode;
  heading: string;
  onSubmit: () => void;
}

const Form: FC<Props> = ({ children, heading, onSubmit }) => {
  return (
    <main>
      <section>
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
