import React, { FunctionComponent } from "react";
import { ErrorBoundaryError, ErrorFallbackProps } from "./type";

interface ErrorBoundaryProps {
  onReset?: () => void;
  fallback: FunctionComponent<ErrorFallbackProps>;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  err: ErrorBoundaryError;
}

const initialState = { hasError: false, err: null };

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, err: null };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: ErrorBoundaryError) {
    return { hasError: true, err: error };
  }

  resetErrorBoundary() {
    this.props.onReset && this.props.onReset();
    this.setState(initialState);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return (
        <Fallback err={this.state.err} onRetry={this.resetErrorBoundary} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
