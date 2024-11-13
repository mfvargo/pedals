import { Component } from "react";
import Alert from "react-bootstrap/Alert";

import { HandlerContext, HandlerContextObj } from "../../contexts/HandlerContext";

interface State {
  show: boolean;
  message: string;
  timer: any;
  secondsToShow: number;
}

class SuccessAlert extends Component<{}, State> {
  static contextType = HandlerContext;

  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
      message: "",
      timer: null,
      secondsToShow: 1000 * 5,
    };
  }

  componentDidMount() {
    const { successHandler } = this.context as HandlerContextObj;
    successHandler.subscribe("success-alert", this.subscription.bind(this));
  }

  componentWillUnmount() {
    const { successHandler } = this.context as HandlerContextObj;
    const { timer } = this.state;
    successHandler.unsubscribe("success-alert");
    clearTimeout(timer);
  }

  subscription({ message }: any) {
    const { secondsToShow } = this.state;
    const timer = setTimeout(() => {
      this.setState({ show: false });
    }, secondsToShow);

    this.setState({
      message,
      timer,
      show: true,
    });
  }

  format(message: any) {
    return message.toString();
  }

  handleHide() {
    this.setState({ show: false, message: "" });
  }

  render() {
    const { message, show } = this.state;
    if (!message) {
      return null;
    }

    const formattedMessage = this.format(message);

    return (
      <Alert show={show} onClose={this.handleHide.bind(this)} dismissible variant="success">
        {formattedMessage}
      </Alert>
    );
  }
}

export default SuccessAlert;
