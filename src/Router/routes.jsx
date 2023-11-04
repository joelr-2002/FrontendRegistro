import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdministradorMenu from "../Components/AdministradorMenu";


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario-aspirantes" element={<InscripcionComponent />} />
        <Route path="/" element={<InicioSesion />} />
        <Route path="/administrador" element={<AdministradorMenu />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;