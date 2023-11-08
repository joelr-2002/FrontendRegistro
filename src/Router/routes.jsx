import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdmDocente from "../Components/AdministradorDocente";
import AdmMenu from "../Components/AdministradorMenu";
import AdmNotas from "../Components/AdministradorNotas";
import AdmPeriodo from "../Components/AdministradorPeriodo";
import AdmNuevoPeriodo from "../Components/AdministradorNuevoPeriodo";

import EstudiantesMenu from "../Components/EstudiantesMenu";
import EstudiantesEvalucionDocente from "../Components/EstudiantesEvaluacionDocente";
import EstudiantesNotas from "../Components/EstudiantesNotas";
import EstudiantesCancelaciones from "../Components/EstudiantesCancelaciones";

import JefeDepartamentoMenu from "../Components/JefeDepartamentoMenu";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario-aspirantes" element={<InscripcionComponent />} />
        <Route path="/" element={<InicioSesion />} />

        <Route path="*" element={<h1>Not Found</h1>} />

        <Route path="/administrador" element={<AdmMenu />} />
        <Route path="/administrador/creacion-docente" element={<AdmDocente />} />
        <Route path="/administrador/habilitar-notas" element={<AdmNotas />} />
        <Route path="/administrador/periodo" element={<AdmPeriodo />} />
        <Route path="/administrador/nuevo-periodo" element={<AdmNuevoPeriodo />} />

        <Route path="/estudiantes" element={<EstudiantesMenu />} />
        <Route path="/estudiantes/evaluacion-docente" element={<EstudiantesEvalucionDocente />} />
        <Route path="/estudiantes/notas" element={<EstudiantesNotas />} />
        <Route path="/estudiantes/cancelaciones" element={<EstudiantesCancelaciones />} />
        
        <Route path="/jefe-departamento" element={<JefeDepartamentoMenu />} />

      </Routes>
    </Router>
  );
}

export default RoutesComponent;