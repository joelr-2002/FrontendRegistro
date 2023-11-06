import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdministradorDocente from "../Components/AdministradorDocente";
import AdministradorMenu from "../Components/AdministradorMenu";
import AdministradorNotas from "../Components/AdministradorNotas";
import EstudiantesMenu from "../Components/EstudiantesMenu";
import EstudiantesEvalucionDocente from "../Components/EstudiantesEvaluacionDocente";
import EstudiantesNotas from "../Components/EstudiantesNotas";
import EstudiantesCancelaciones from "../Components/EstudiantesCancelaciones";

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
        <Route path="/estudiantes" element={<EstudiantesMenu />} />
        <Route path="/estudiantes/evaluacion-docente" element={<EstudiantesEvalucionDocente />} />
        <Route path="/estudiantes/notas" element={<EstudiantesNotas />} />
        <Route path="/estudiantes/cancelaciones" element={<EstudiantesCancelaciones />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;