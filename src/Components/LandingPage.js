import React from 'react';
import '../Styles/landing.css';

const LandingPage = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src="../assets/eh.png" alt="Encarguito HN" className="logo" />
            Encarguito HN
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/web-administrador">Administración</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/web-motoristas">Motoristas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="page.html">Productos</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid landing">
          <div className="row">
            <div className="col-md-6">
              <h1 className="company-name">Encarguito HN</h1>
              <p className="company-description">Nos especializamos en llevar tus pedidos a la puerta de tu casa, en tiempo record y con la máxima seguridad del mercado, brindando actualizaciones constantes de tu pedido.</p>
              <div className="cta-buttons">
                <a href="login.html" className="btn btn-primary btn-lg">Iniciar Sesión</a>
                <a href="signup.html" className="btn btn-secondary btn-lg">Registrarse</a>
              </div>
            </div>
            <div className="col-md-6">
              <img src="Logo/eh.png" alt="Encarguito HN" className="landing-logo" />
            </div>
          </div>
        </div>
      </div>
    );
};

export default LandingPage;
