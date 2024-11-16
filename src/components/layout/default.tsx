import React from "react";
import Container from "react-bootstrap/Container";
import { WebsockStream } from "../chatControl/WebSockStream";

import SuccessAlert from "../alerts/success";
import ErrorAlert from "../alerts/error";
import Footer from "./footer";

const DefaultLayout = ({ children }: any) => {
  // No container on this page bc of pedalboards
  return (
    <>
      <Container>
        <SuccessAlert />
        <ErrorAlert />
      </Container>
      {children}
      <WebsockStream />
      <Footer />
    </>
  );
};

export default DefaultLayout;
