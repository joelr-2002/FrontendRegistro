import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './Styles/index.css';
    import Routes from './Router/routes';
    import NavbarComponente from './Components/NavbarComponente';
    import NavbarAutenticado from './Components/NavbarLoggedComponente';

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';
    import 'jquery/dist/jquery.min.js';
    import 'popper.js/dist/popper.min.js';

    const isAuthenticated = false;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <>
        {isAuthenticated ? <NavbarAutenticado/> : <NavbarComponente />}
        <Routes />
      </>
    );