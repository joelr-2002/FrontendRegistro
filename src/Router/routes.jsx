import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdministradorDocente from "../Components/AdministradorDocente";
import AdministradorMenu from "../Components/AdministradorMenu";
import AdministradorNotas from "../Components/AdministradorNotas";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario-aspirantes" element={<InscripcionComponent />} />
        <Route path="/" element={<InicioSesion />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/administrador" element={<AdministradorMenu />} />
        <Route path="/administrador/creacion-docente" element={<AdministradorDocente />} />
        <Route path="/administrador/habilitar-notas" element={<AdministradorNotas />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;