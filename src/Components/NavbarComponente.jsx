import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Router } from 'react-router-dom';

const NavbarComponent = (urlLogo) => {
  
  //objeto a array
  urlLogo = Object.values(urlLogo);

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
    <Navbar bg="light" expand="md" sticky="top" zindex="1"
    style={{
      backgroundColor: '#99d8dd !important',
    }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="UNAH Logo"
            src={urlLogo[0] === undefined ? './assets/unah_logo.png' : urlLogo[0]}
            width="77"
            height="48.5"
            className="d-inline-block align-top"
            style={{ marginLeft: '-6.5%' }}
          />{' '}
          <span className="ml-2">Registro UNAH</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
    </>
  );
};

export default NavbarComponent;
