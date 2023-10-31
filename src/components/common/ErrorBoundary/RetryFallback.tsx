import React from "react";
import { ErrorFallbackProps } from "./type";

const RetryFallback = ({ err, onRetry }: ErrorFallbackProps) => {
  return (
    <div>
      {err?.message}
      <span>retryfall back이지롱</span>
    </div>
  );
};

export default RetryFallback;
