import React from "react";
import Toast from "./Toast";
import { ErrorBoundary } from "./ErrorBoundary";
import RetryFallback from "./ErrorBoundary/RetryFallback";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <ErrorBoundary
      fallback={RetryFallback}
      onReset={() => {
        location.reload();
      }}
    >
      {children}
      <Toast />
    </ErrorBoundary>
  );
};

export default Layout;
