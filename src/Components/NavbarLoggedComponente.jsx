import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';


const NavbarLoggedInComponent = ({ onLogout, urlLogo }) => {
  return (
    <>
    <style>
      {`
        .bg-light {
          background-image: linear-gradient(#99d8dd, #93d4da) !important;
          background-size: cover;
          background-color: #99d8dd !important;
        }
      `}
    </style>
    <Navbar bg="light" expand="lg" sticky="top" zIndex="1">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="UNAH Logo"
            href="/"
            src= {urlLogo}
            width="77"
            height="48.5"
            className="d-inline-block align-top"
            style={{ marginLeft: '-6.5%' }}
          />{' '}
          <span style={{ marginLeft: '7%' }}>Registro UNAH</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="danger" onClick={onLogout}>Cerrar Sesión</Button>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};

export default NavbarLoggedInComponent;
