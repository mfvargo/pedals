import React from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";

import SuccessAlert from "../alerts/success";
import ErrorAlert from "../alerts/error";
import Navigation from "./navigation";
import Footer from "./footer";

const DefaultLayout = ({ children }: any) => {
  const router = useRouter();

  // No container on this page bc of pedalboards
  return router.pathname === "/jamUnitControl" ? (
    <>
      <Navigation />
      <Container>
        <SuccessAlert />
        <ErrorAlert />
      </Container>
      {children}
      <Footer />
    </>
  ) : (
    <>
      <Navigation />
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
