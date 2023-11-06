import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdmMenu from "../Components/AdministradorMenu";
import AdministradorNotas from "../Components/AdministradorNotas";
import CreacionDocente from "../Components/AdministradorDocente";


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario-aspirantes" element={<InscripcionComponent />} />
        <Route path="/" element={<InicioSesion />} />



        
        <Route path="/administrador" element={<AdmMenu />} />
        <Route path="/administrador/habilitar-notas" element={<AdministradorNotas />} />
        <Route path="/administrador/creacion-docente" element={<CreacionDocente />} />
        <Route path="/administrador/habilitar-matricula" element={<AdministradorNotas />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;