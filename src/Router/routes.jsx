import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdministradorMenu from "../Components/AdministradorMenu";
import AdministradorNotas from "../Components/AdministradorNotas";
import CreacionDocente from "../Components/AdministradorDocente";


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario-aspirantes" element={<InscripcionComponent />} />
        <Route path="/" element={<InicioSesion />} />
        <Route path="/administrador" element={<AdministradorMenu />} />
        <Route path="/administrador/habilitar-notas" element={<AdministradorNotas />} />
        <Route path="/administrador/creacion-docente" element={<CreacionDocente />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;