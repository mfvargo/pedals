import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

import { isBrowser } from "../../utils/isBrowser";
import { HandlerContext } from "../../contexts/HandlerContext";
import { SoftwareUpdateStatus } from "../ActiveUnit/SoftwareUpdateStatus";

export default function navigation() {
  const router = useRouter();
  const { sessionHandler } = useContext(HandlerContext);
  const [signedIn, setSignedIn] = useState(false);

  // this is calculated in an effect so it doesn't look like the client and server have different values
  useEffect(() => {
    checkSignedInState();
    sessionHandler.subscribe("navigation", checkSignedInState);
    return () => {
      sessionHandler.unsubscribe("navigation");
    };
  }, []);

  function checkSignedInState() {
    console.log("checking sign in state");
    const _signedIn = isBrowser() ? (window.localStorage.getItem("session:csrfToken") ? true : false) : false;
    setSignedIn(_signedIn);
  }

  const loggedInLinks = (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/jamUnits" className={router.pathname == "/jamUnits" ? "active" : ""}>JamUnits</Nav.Link>
        <Nav.Link href="/players" className={router.pathname == "/players" ? "active" : ""}>Who's On</Nav.Link>
        <Nav.Link href="/songs" className={router.pathname == "/songs" ? "active" : ""}>Songs</Nav.Link>
        <Nav.Link href="/account" className={router.pathname == "/account" ? "active" : ""}>Account</Nav.Link>
        <Nav.Link href="/sign-out">Sign Out</Nav.Link>
      </Nav>
      {router.pathname === "/jamUnitControl" && <SoftwareUpdateStatus />}
    </Navbar.Collapse>
  );

  const loggedOutLinks = (
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <Nav.Link href="/" className={router.pathname == "/" ? "active" : ""}>Home</Nav.Link>
        <Nav.Link href="/sign-up" className={router.pathname == "/sign-up" ? "active" : ""}>Sign Up</Nav.Link>
        <Nav.Link href="/sign-in" className={router.pathname == "/sign-in" ? "active" : ""}>Sign In</Nav.Link>
    </Nav>
  </Navbar.Collapse>
);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Link href="/" passHref>
          <Navbar.Brand>RTJam Nation</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {signedIn ? loggedInLinks : loggedOutLinks}

      </Container>
    </Navbar>
  );
}
