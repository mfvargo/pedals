import { Component } from "react";
import Alert from "react-bootstrap/Alert";

import { HandlerContext, HandlerContextObj } from "../../contexts/HandlerContext";

interface State {
  show: boolean;
  error: Error | string;
  timer: any;
  secondsToShow: number;
}

class ErrorAlert extends Component<{}, State> {
  static contextType = HandlerContext;

  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
      error: "",
      timer: "",
      secondsToShow: 1000 * 5,
    };
  }

  componentDidMount() {
    const { errorHandler } = this.context as HandlerContextObj;
    errorHandler.subscribe("error-alert", this.subscription.bind(this));
  }

  componentWillUnmount() {
    const { errorHandler } = this.context as HandlerContextObj;
    const { timer } = this.state;
    errorHandler.unsubscribe("error-alert");
    clearTimeout(timer);
  }

  subscription({ error }: any) {
    const { secondsToShow } = this.state;
    const timer = setTimeout(() => {
      this.setState({ show: false });
    }, secondsToShow);

    this.setState({
      error,
      timer,
      show: true,
    });
  }

  format(error: any) {
    return error.toString();
  }

  handleHide() {
    this.setState({ show: false, error: "" });
  }

  render() {
    const { error, show } = this.state;
    if (!error) {
      return null;
    }

    const formattedError = this.format(error);

    return (
      <Alert show={show} onClose={this.handleHide.bind(this)} dismissible variant="danger">
        {formattedError}
      </Alert>
    );
  }
}

export default ErrorAlert;
