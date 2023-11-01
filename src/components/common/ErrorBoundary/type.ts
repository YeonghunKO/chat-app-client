import type { AxiosError } from "axios";

export type ErrorBoundaryError = AxiosError | Error | any;

export type ErrorFallbackProps = {
  err: ErrorBoundaryError;
  onRetry: () => void;
};
