import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "../Components/InicioSesion";
import InscripcionComponent from "../Components/InscripcionAspirantes";
import AdmDocente from "../Components/AdministradorDocente";
import AdmMenu from "../Components/AdministradorMenu";
import AdmNotas from "../Components/AdministradorNotas";
import AdmPeriodo from "../Components/AdministradorPeriodo";
import AdmConfPeriodo from "../Components/AdministradorConfPeriodo";
import AdmAspirantes from "../Components/AdministradorAspirantes";
import AdmSEstudiantes from "../Components/AdministradorSEstudiantes";
import AdmDEstudiantes from "../Components/AdministradorDEstudiantes";


import EstudiantesMenu from "../Components/EstudiantesMenu";
import EvaluacionDocentes from "../Components/EstudiantesEvaluacionDocente";
import EstudiantesNotas from "../Components/EstudiantesNotas";
import EstudiantesCancelaciones from "../Components/EstudiantesCancelaciones";

import JefeDepartamentoMenu from "../Components/JefeDepartamentoMenu";
import JefeDepartamentoPlanificacionAcademica from "../Components/JefeDepartamentoPlanificacionAcademicaMenu";
import JefeDepartamentoCrearSeccion from "../Components/JefeDepartamentoCrearSeccion";
import JefeDepartamentoVerSeccion from "../Components/JefeDepartamentoVerSeccion";
import JefeDepartamentoEditarSeccion from "../Components/JefeDepartamentoEditarSeccion";

import DocentesMenu from "../Components/DocentesMenu";
import DocentesSubirNotas from "../Components/DocentesSubirNotas";
import DocentesClasesMenu from "../Components/DocentesClasesMenu";

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
        <Route path="/administrador/nuevo-periodo" element={<AdmConfPeriodo />} />
        <Route path="/administrador/actualizar-periodo" element={<AdmConfPeriodo />} />
        <Route path="/administrador/aspirantes" element={<AdmAspirantes />} />
        <Route path="/administrador/subir-estudiantes" element={<AdmSEstudiantes />} />
        <Route path="/administrador/descargar-estudiantes" element={<AdmDEstudiantes />} />

        <Route path="/estudiantes" element={<EstudiantesMenu />} />
        <Route path="/estudiantes/evaluacion-docente" element={<EvaluacionDocentes />} />
        <Route path="/estudiantes/notas" element={<EstudiantesNotas />} />
        <Route path="/estudiantes/cancelaciones" element={<EstudiantesCancelaciones />} />
        
        <Route path="/jefe-departamento" element={<JefeDepartamentoMenu />} />
        <Route path="/jefe-departamento/planificacion-academica-menu" element={<JefeDepartamentoPlanificacionAcademica />} />
        <Route path="/jefe-departamento/crear-seccion" element={<JefeDepartamentoCrearSeccion />} />
        <Route path="/jefe-departamento/secciones" element={<JefeDepartamentoVerSeccion />} />
        <Route path="/jefe-departamento/editar-seccion" element={<JefeDepartamentoEditarSeccion />} />
      
        <Route path="/docentes" element={<DocentesMenu />} />
        <Route path="/docentes/clases" element={<DocentesClasesMenu />} />
        <Route path="/docentes/notas" element={<DocentesSubirNotas />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;