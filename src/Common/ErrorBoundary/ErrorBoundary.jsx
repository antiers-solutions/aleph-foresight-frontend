/**
 * A React Error Boundary component that catches and displays errors in a user-friendly way.
 *
 * @description
 * This component wraps around other components to catch any errors that may occur during rendering.
 * If an error occurs, it displays an error page with the error message and stack trace.
 *
 */
import React from "react";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import { msgs } from "../../utils/appConstants";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: msgs.errorPage?.error,
      stack: msgs.errorPage?.desc,
    };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error?.message,
      stack: error?.stack,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state?.error} desc={this.state?.stack} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
