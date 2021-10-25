import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarCustom = ({}) => {
  return (
    <Navbar bg="light" expand="lg">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link passHref={true} href="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </Link>
            <Link passHref={true} href="/my-courses">
              <Nav.Link>Courses</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
