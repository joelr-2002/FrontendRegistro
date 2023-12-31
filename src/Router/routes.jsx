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
import EstudiantesCancelaciones from "../Components/EstudiantesSolicitudes";
import EstudiantesMatricula from "../Components/EstudiantesMatricula"
import EstudiantesClases from "../Components/EstudiantesClases"
import EstudianteClase from "../Components/EstudianteClase"
import EstudiantesCertificado from "../Components/EstudiantesCertificado"
import EstudiantePerfil from "../Components/EstudiantePerfil"
import EstudiantePerfilEditar from "../Components/EstudiantePerfilEditar"
import EstudiantesChatMenu from "../Components/EstudiantesChatMenu";

import JefeDepartamentoMenu from "../Components/JefeDepartamentoMenu";
import JefeDepartamentoPlanificacionAcademica from "../Components/JefeDepartamentoPlanificacionAcademicaMenu";
import JefeDepartamentoCrearSeccion from "../Components/JefeDepartamentoCrearSeccion";
import JefeDepartamentoVerSeccion from "../Components/JefeDepartamentoVerSeccion";
import JefeDepartamentoEditarSeccion from "../Components/JefeDepartamentoEditarSeccion";
import JefeDepartamentoEvaluacionDocente from "../Components/JefeDepartamentoEvaluacionDocente";
import JefeDepartamentoCalificacionesDocente from "../Components/JefeDepartamentoCalificacionesDocente";
import JefeDepartamentoHistorialAcademico from "../Components/JefeDepartamentoHistorialAcademico";
import JefeDepartamentoReiniciarClaveDocente from "../Components/JefeDepartamentoReiniciarClaveDocente";
import JefeDepartamentoEstadistica from "../Components/JefeDepartamentoEstadisticas";

import DocentesClases from "../Components/Docentes";
import DocentesSubirNotas from "../Components/DocentesSubirNotas";
import DocentesClase from "../Components/DocentesClase";


import CoordMenu from "../Components/CoordinadorMenu";
import CoordCargaA from "../Components/CoordinadorCargaA";
import CoordEstudiantes from "../Components/CoordinadorEstudiantes";
import CoordSolicitudes from "../Components/CoordinadorSolicitudes";


import CambioClave from "../Components/CambioClave";

import Chat from "../Components/Chat";

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
        <Route path="/estudiantes/solicitudes" element={<EstudiantesCancelaciones />} />
        <Route path="/estudiantes/matricula" element={<EstudiantesMatricula />} />
        <Route path="/estudiantes/clases" element={<EstudiantesClases />} />
        <Route path="/estudiantes/clase/:ID" element={<EstudianteClase />} />
        <Route path="/estudiantes/certificado" element={<EstudiantesCertificado />} />
        <Route path="/estudiantes/perfil" element={<EstudiantePerfil />} />
        <Route path="/estudiantes/editar-perfil" element={<EstudiantePerfilEditar />} />
        <Route path="/estudiantes/chat" element={<EstudiantesChatMenu />} />
        
        <Route path="/jefe-departamento" element={<JefeDepartamentoMenu />} />
        <Route path="/jefe-departamento/planificacion-academica-menu" element={<JefeDepartamentoPlanificacionAcademica />} />
        <Route path="/jefe-departamento/crear-seccion" element={<JefeDepartamentoCrearSeccion />} />
        <Route path="/jefe-departamento/secciones" element={<JefeDepartamentoVerSeccion />} />
        <Route path="/jefe-departamento/editar-seccion" element={<JefeDepartamentoEditarSeccion />} />
        <Route path="/jefe-departamento/evaluacion-docente" element={<JefeDepartamentoEvaluacionDocente />} />
        <Route path="/jefe-departamento/calificaciones-docente" element={<JefeDepartamentoCalificacionesDocente />} />
        <Route path="/jefe-departamento/historial-academico" element={<JefeDepartamentoHistorialAcademico />} />
        <Route path="/jefe-departamento/restablecer-clave-docente" element={<JefeDepartamentoReiniciarClaveDocente />} />
        <Route path="/jefe-departamento/estadistica" element={<JefeDepartamentoEstadistica />} />

        <Route path="/docentes" element={<DocentesClases />} />
        <Route path="/docente/clase/:ID" element={<DocentesClase />} />
        <Route path="/docentes/notas" element={<DocentesSubirNotas />} />

        <Route path="/coordinador" element={<CoordMenu />} />
        <Route path="/coordinador/carga-academica" element={<CoordCargaA />} />
        <Route path="/coordinador/estudiantes" element={<CoordEstudiantes />} />
        <Route path="/coordinador/solicitudes" element={<CoordSolicitudes />} />
       
        <Route path="/api/restablecer-clave/" element={<CambioClave />} />

        <Route path="/chat" element={<Chat />} />

      </Routes>
    </Router>
  );
} 

export default RoutesComponent;