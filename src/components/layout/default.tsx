import React from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";

import SuccessAlert from "../alerts/success";
import ErrorAlert from "../alerts/error";
import Footer from "./footer";

const DefaultLayout = ({ children }: any) => {
  const router = useRouter();

  // No container on this page bc of pedalboards
  return router.pathname === "/jamUnitControl" ? (
    <>
      <Container>
        <SuccessAlert />
        <ErrorAlert />
      </Container>
      {children}
      <Footer />
    </>
  ) : (
    <>
      <Container>
        <SuccessAlert />
        <ErrorAlert />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default DefaultLayout;
