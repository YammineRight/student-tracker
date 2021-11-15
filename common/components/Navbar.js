import Link from "next/link";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/client";

const NavbarCustom = ({}) => {
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  const [session, loading] = useSession();

  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (session) {
    return (
      <Navbar
        expand="lg"
        className="sticky-top"
        style={{
          position: "fixed",
          left: "0px",
          right: "0px",
          transition: "0.6s ease",
          backgroundColor: navBackground ? "#F8F9FA" : "transparent",
        }}
      >
        <Container>
          <Link passHref={true} href="/">
            <Navbar.Brand>
              <div className="d-flex align-items-center">
                <img
                  src="/logo-black.svg"
                  alt="logo"
                  style={{ paddingRight: "7px" }}
                />
                Courses Overflow
              </div>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              navBackground == false
                ? setNavBackground(true)
                : setNavBackground(false);
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link passHref={true} href="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </Link>
              <Link passHref={true} href="/my-courses">
                <Nav.Link>Courses</Nav.Link>
              </Link>

              <Nav.Link
                className="link-signout"
                onClick={() => signOut()}
              >
                Logout
              </Nav.Link>
            </Nav>
            <Button
              onClick={() => signOut()}
              className="button-signout"
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        expand="lg"
        className="sticky-top"
        style={{
          position: "fixed",
          left: "0px",
          right: "0px",
          transition: "0.6s ease",
          backgroundColor: navBackground ? "#F8F9FA" : "transparent",
        }}
      >
        <Container>
          <Link passHref={true} href="/">
            <Navbar.Brand>
              <div className="d-flex align-items-center">
                <img
                  src="/logo-black.svg"
                  alt="logo"
                  style={{ paddingRight: "7px" }}
                />
                Courses Overflow
              </div>
            </Navbar.Brand>
          </Link>
          <Button onClick={() => signIn()}>Login</Button>
        </Container>
      </Navbar>
    );
  }
};

export default NavbarCustom;
