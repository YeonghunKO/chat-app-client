import React from "react";
import Toast from "./Toast";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div>
      {children}
      <Toast />
    </div>
  );
};

export default Layout;
