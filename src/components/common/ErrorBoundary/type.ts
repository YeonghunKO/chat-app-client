import type { AxiosError } from "axios";

export type ErrorBoundaryError = AxiosError | Error | null;

export type ErrorFallbackProps = {
  err: ErrorBoundaryError;
  onRetry: () => void;
};
