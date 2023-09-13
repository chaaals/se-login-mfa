import React, { FC } from "react";

import "./Toast.css";

interface Props {
  children: React.ReactNode;
}

const Toast: FC<Props> = ({ children }) => {
  return <div className="toast">{children}</div>;
};

export default Toast;
