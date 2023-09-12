import { FC } from "react";
import Form from "../common/Form";

const Signup: FC = () => {
  return (
    <Form heading="Sign up" onSubmit={() => console.log("lols")}>
      <div>
        <label htmlFor="first-name">First Name</label>
        <input id="first-name" placeholder="Enter your first name" />
      </div>

      <div>
        <label htmlFor="last-name">Last Name</label>
        <input id="last-name" placeholder="Enter your last name" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" placeholder="Enter your email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" placeholder="Enter your password" />
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input id="confirm-password" placeholder="Confirm your password" />
      </div>
    </Form>
  );
};

export default Signup;
