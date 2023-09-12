import { FC } from "react";
import Form from "../common/Form";

const Login: FC = () => {
  return (
    <Form heading="Log in" onSubmit={() => console.log("lols")}>
      <div>
        <label htmlFor="first-name">Username</label>
        <input id="first-name" placeholder="Enter your username" />
      </div>

      <div>
        <label htmlFor="last-name">Password</label>
        <input id="last-name" placeholder="Enter your password" />
      </div>
    </Form>
  );
};

export default Login;
