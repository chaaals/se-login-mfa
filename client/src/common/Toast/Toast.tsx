import { FC } from "react";

import "./Toast.css";

interface Props {
  heading: string;
}

const Toast: FC<Props> = ({ heading }) => {
  return <div className="toast">{heading}</div>;
};

export default Toast;
