import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import "../Styles/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";
import Atras from "./utils/Regresar.jsx";

import formatearFechas from "../utils/formatearFechas.js";

//Se acortará el nombre de Administrador a Adm para mayor facilidad
const AdmConfPeriodo = () => {
  //INICIO COMPONENTE PRINCIPAL

  const handleSubmit = (e) => {
    e.preventDefault();

    setFechaIPeriodoAcdErr(false);
    setFechaFPeriodoAcdErr(false);
    setFechaIPlanificacionAcdErr(false);
    setFechaFPlanificacionAcdErr(false);
    setFechaIngresoNotasErr(false);
    setFechaFIngresoNotasErr(false);
    setFechaICancelacionesErr(false);
    setFechaFCancelacionesErr(false);

    for (let i = 0; i < opcionesErr.length; i++) {
      const nuevasOpcionesErr = [...opcionesErr];

      nuevasOpcionesErr[i].nombre = false;
      nuevasOpcionesErr[i].indiceMinimo = false;
      nuevasOpcionesErr[i].indiceMaximo = false;
      nuevasOpcionesErr[i].fechaInicio = false;
      nuevasOpcionesErr[i].fechaCierre = false;
      nuevasOpcionesErr[i].horaInicio = false;
      nuevasOpcionesErr[i].horaCierre = false;

      setOpcionesErr(nuevasOpcionesErr);
    }

    //VALIDACION CAMPOS VACIOS

    const camposVacios = opciones.some(
      (opcion) =>
        opcion.nombre === "" ||
        (opcion.nombre !== "Primer Ingreso" &&
          (opcion.indiceMinimo === "" || opcion.indiceMaximo === "")) ||
        opcion.fechaInicio === "" ||
        opcion.fechaCierre === "" ||
        opcion.horaInicio === "" ||
        opcion.horaCierre === ""
    );

    if (
      !idPeriodo ||
      !anioPeriodo ||
      !fechaIPeriodoAcd ||
      !fechaFPeriodoAcd ||
      !fechaIPlanificacionAcd ||
      !fechaFPlanificacionAcd ||
      !fechaIngresoNotas ||
      !fechaFIngresoNotas ||
      !fechaICancelaciones ||
      !fechaFCancelaciones ||
      camposVacios
    ) {
      alert("Completa todos los campos antes de validar.");
      setFechasValidas(false);

      if (!fechaIPeriodoAcd) {
        setFechaIPeriodoAcdErr(true);
      }
      if (!fechaFPeriodoAcd) {
        setFechaFPeriodoAcdErr(true);
      }
      if (!fechaIPlanificacionAcd) {
        setFechaIPlanificacionAcdErr(true);
      }
      if (!fechaFPlanificacionAcd) {
        setFechaFPlanificacionAcdErr(true);
      }
      if (!fechaIngresoNotas) {
        setFechaIngresoNotasErr(true);
      }
      if (!fechaFIngresoNotas) {
        setFechaFIngresoNotasErr(true);
      }
      if (!fechaICancelaciones) {
        setFechaICancelacionesErr(true);
      }
      if (!fechaFCancelaciones) {
        setFechaFCancelacionesErr(true);
      }

      setConfMatriculaValidar(false);
      for (let i = 0; i < opciones.length; i++) {
        const nuevasOpcionesErr = [...opcionesErr];
        if (opciones[i].nombre === "") {
          nuevasOpcionesErr[i].nombre = true;
          setOpcionesErr(nuevasOpcionesErr);
        }

        if (opciones[i].indiceMinimo === "") {
          nuevasOpcionesErr[i].indiceMinimo = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (opciones[i].indiceMaximo === "") {
          nuevasOpcionesErr[i].indiceMaximo = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (opciones[i].fechaInicio === "") {
          nuevasOpcionesErr[i].fechaInicio = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (opciones[i].fechaCierre === "") {
          nuevasOpcionesErr[i].fechaCierre = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (opciones[i].horaInicio === "") {
          nuevasOpcionesErr[i].horaInicio = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (opciones[i].horaCierre === "") {
          nuevasOpcionesErr[i].horaCierre = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
      }
      return;
    }

    //------------------------------------------------------------------------------------------------

    const currentYear = new Date().getFullYear();

    /*Validación que el año sea correcto */
    if (anioPeriodo <= 0 || anioPeriodo < currentYear) {
      alert("El año del periodo es inválido");
      setFechasValidas(false);
    } else if (
      /*Validación para que la fecha final siempre sea despues que la inicial*/
      new Date(fechaFPeriodoAcd) < new Date(fechaIPeriodoAcd) ||
      new Date(fechaFPlanificacionAcd) < new Date(fechaIPlanificacionAcd) ||
      new Date(fechaFIngresoNotas) < new Date(fechaIngresoNotas) ||
      new Date(fechaFCancelaciones) < new Date(fechaICancelaciones)
    ) {
      alert(
        "Verifique las fechas: La fecha inicial no puede ser despues que la fecha final"
      );
      setFechasValidas(false);

      if (new Date(fechaFPeriodoAcd) < new Date(fechaIPeriodoAcd)) {
        setFechaIPeriodoAcdErr(true);
        setFechaFPeriodoAcdErr(true);
      }

      if (new Date(fechaFPlanificacionAcd) < new Date(fechaIPlanificacionAcd)) {
        setFechaIPlanificacionAcdErr(true);
        setFechaFPlanificacionAcdErr(true);
      }
      if (new Date(fechaFIngresoNotas) < new Date(fechaIngresoNotas)) {
        setFechaIngresoNotasErr(true);
        setFechaFIngresoNotasErr(true);
      }
      if (new Date(fechaFCancelaciones) < new Date(fechaICancelaciones)) {
        setFechaICancelacionesErr(true);
        setFechaFCancelacionesErr(true);
      }
    } else if (new Date(fechaIPlanificacionAcd) > new Date(fechaIPeriodoAcd)) {
      /*Validación para que la planificación academica siempre sea antes que el inicio de periodo*/
      alert(
        "Verifique las fechas: La planificación académica debe de ser antes que el inicio de periodo"
      );
      setFechasValidas(false);
      setFechaIPeriodoAcdErr(true);
      setFechaIPlanificacionAcdErr(true);
    } else if (
      /*Validación para que la fecha final del periodo corrsponda con la solicitud, en este caso no se negará la validación si hay casos especiales*/
      /*Trimestral */
      opcionSeleccionada === 1 &&
      new Date(fechaFPeriodoAcd) - new Date(fechaIPeriodoAcd) <
        1000 * 60 * 60 * 24 * 90 // 90 días, 3 meses
    ) {
      alert(
        "Advertencia: El Periodo es Trimestral, por lo que debería de haber un margen de 3 meses mínimos tentativos entre la fecha de inicio y fin"
      );
    } else if (
      /*Semestral */
      opcionSeleccionada === 2 &&
      new Date(fechaFPeriodoAcd) - new Date(fechaIPeriodoAcd) <
        1000 * 60 * 60 * 24 * 180 // 180 días, 6 meses
    ) {
      alert(
        "Advertencia: El Periodo es Semestral, por lo que debería de haber un margen de 6 meses minimos tentativos entre la fecha de inicio y fin"
      );
    } else if (
      /*Validación para que haya una semana de diferencia entre las fechas de inicio de planificación académica y de inicio de periodo académico.*/
      new Date(fechaIPlanificacionAcd) - new Date(fechaIPeriodoAcd) >
      1000 * 60 * 60 * 24 * 7 // 7 días, 1 semana
    ) {
      alert(
        "Debe haber un margen de al menos 1 semana entre las fechas de inicio de planificación académica y de inicio de periodo académico."
      );
      setFechasValidas(false);
      setFechaIPeriodoAcdErr(true);
      setFechaIPlanificacionAcdErr(true);
    } else if (new Date(fechaIPlanificacionAcd) > new Date(fechaIngresoNotas)) {
      /*Validación para que el ingreso de notas sea despues que la planificación*/
      alert(
        "Verifique las fechas: La planificación académica debe de ser antes que el ingreso de notas"
      );
      setFechasValidas(false);
      setFechaIPlanificacionAcdErr(true);
      setFechaIngresoNotasErr(true);
    } else if (
      /*Validación para que haya un margen de 2 meses entre planificacion e ingreso de notas minimo*/
      new Date(fechaIngresoNotas) - new Date(fechaIPlanificacionAcd) <
      1000 * 60 * 60 * 24 * 60 // 60 días
    ) {
      alert(
        "Debe haber un margen de al menos 2 meses entre las fechas de inicio y de ingreso."
      );
      setFechasValidas(false);
      setFechaIPlanificacionAcdErr(true);
      setFechaIngresoNotasErr(true);
    } else if (
      new Date(fechaFPlanificacionAcd) > new Date(fechaICancelaciones)
    ) {
      alert(
        "Verifique las fechas: La fecha de inicio de Cancelaciones Excepcionales debe ser despues de terminar el periodo de la Planificación Académica"
      );
      setFechasValidas(false);
      setFechaFPlanificacionAcdErr(true);
      setFechaICancelaciones(true);
    } else if (new Date(fechaFCancelaciones) > new Date(fechaIngresoNotas)) {
      alert(
        "Verifique las fechas: La fecha final de Cancelaciones Excepcionales debe ser antes de iniciar el periodo de Ingreso de Notas"
      );
      setFechasValidas(false);
      setFechaFCancelacionesErr(true);
      setFechaIngresoNotasErr(true);
    } else {
      setFechasValidas(true);
      setFechaIPeriodoAcdErr(false);
      setFechaFPeriodoAcdErr(false);
      setFechaIPlanificacionAcdErr(false);
      setFechaFPlanificacionAcdErr(false);
      setFechaIngresoNotasErr(false);
      setFechaFIngresoNotasErr(false);
      setFechaICancelacionesErr(false);
      setFechaFCancelacionesErr(false);
    }

    /**------------------------------VALIDACIONES DE FECHAS DE MATRICULA----------------------------- */

    const indicesInvalidos = opciones.some(
      (opcion) =>
        opcion.nombre !== "Primer Ingreso" &&
        opcion.indiceMinimo >= opcion.indiceMaximo
    );

    if (indicesInvalidos) {
      alert("El índice máximo debe ser mayor que el índice mínimo.");
      setConfMatriculaValidar(false);
      for (let i = 0; i < opciones.length; i++) {
        const nuevasOpcionesErr = [...opcionesErr];
        if (opciones[i].indiceMinimo >= opciones[i].indiceMaximo) {
          nuevasOpcionesErr[i].indiceMinimo = true;
          nuevasOpcionesErr[i].indiceMaximo = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
      }

      return;
    }

    const indicesFueraRango = opciones.some(
      (opcion) => 100 < opcion.indiceMaximo || opcion.indiceMinimo < 0
    );

    if (indicesFueraRango) {
      alert("El indice debe de estar entre 0 y 100");
      setConfMatriculaValidar(false);
      for (let i = 0; i < opciones.length; i++) {
        const nuevasOpcionesErr = [...opcionesErr];

        if (100 < opciones[i].indiceMaximo || opciones[i].indiceMinimo < 0) {
          nuevasOpcionesErr[i].indiceMinimo = true;
          nuevasOpcionesErr[i].indiceMaximo = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
      }
      return;
    }

    if (new Date(opciones[0].fechaInicio) < new Date(fechaIPeriodoAcd)) {
      alert("La primera fecha de matricula debe ser al iniciar el periodo");
      setConfMatriculaValidar(false);
      return;
    }

    for (let i = 1; i < opciones.length; i++) {
      const nombre = opciones[i].nombre;
      const fechaInicioActual = new Date(opciones[i].fechaInicio);
      const fechaInicioAnterior = new Date(opciones[i - 1].fechaInicio);
      const indiceMaximoActual = opciones[i].indiceMaximo;
      const indiceMinimoAnterior = opciones[i - 1].indiceMinimo;
      const nuevasOpcionesErr = [...opcionesErr];

      if (fechaInicioActual <= fechaInicioAnterior) {
        alert("Verifica el orden de las fechas con la jerarquía de matricula");
        setConfMatriculaValidar(false);
        nuevasOpcionesErr[i].fechaInicio = true;
        nuevasOpcionesErr[i - 1].fechaInicio = true;
        setOpcionesErr(nuevasOpcionesErr);
        return;
      }

      if (nombre !== "Adiciones y Cancelaciones") {
        if (indiceMaximoActual >= indiceMinimoAnterior) {
          alert(
            "Verifica los indices, el indice maximo de una categoría no debe ser mayor que el indice minimo de la categoría anterior"
          );
          setConfMatriculaValidar(false);
          nuevasOpcionesErr[i].indiceMaximo = true;
          nuevasOpcionesErr[i - 1].indiceMinimo = true;
          setOpcionesErr(nuevasOpcionesErr);
          return;
        }
      }

      if (
        new Date(opciones[i].fechaCierre) < new Date(opciones[i].fechaInicio) ||
        new Date(opciones[i].horaCierre) < new Date(opciones[i].horaInicio)
      ) {
        alert("Verifica las fechas y horas: deben ser correctas.");
        setConfMatriculaValidar(false);
        if (
          new Date(opciones[i].fechaCierre) < new Date(opciones[i].fechaInicio)
        ) {
          nuevasOpcionesErr[i].fechaCierre = true;
          nuevasOpcionesErr[i].fechaInicio = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        if (
          new Date(opciones[i].horaCierre) < new Date(opciones[i].horaInicio)
        ) {
          nuevasOpcionesErr[i].horaCierre = true;
          nuevasOpcionesErr[i].horaInicio = true;
          setOpcionesErr(nuevasOpcionesErr);
        }
        return;
      }
    }

    setConfMatriculaValidar(true);
    for (let i = 1; i < opcionesErr.length; i++) {
      const nuevasOpcionesErr = [...opcionesErr];

      nuevasOpcionesErr[i].nombre = false;
      nuevasOpcionesErr[i].indiceMinimo = false;
      nuevasOpcionesErr[i].indiceMaximo = false;
      nuevasOpcionesErr[i].fechaInicio = false;
      nuevasOpcionesErr[i].fechaCierre = false;
      nuevasOpcionesErr[i].horaInicio = false;
      nuevasOpcionesErr[i].horaCierre = false;
      setOpcionesErr(nuevasOpcionesErr);
    }

    if (confMatriculaValidar === true && fechasValidas === true) {
      const matriculaData = opciones.map((opcion) => ({
        p_indice_inicio: opcion.indiceMinimo,
        p_indice_final: opcion.indiceMaximo,
        p_fecha_inicio:
          formatearFechas(opcion.fechaInicio) + " " + opcion.horaInicio,
        p_fecha_final:
          formatearFechas(opcion.fechaCierre) + " " + opcion.horaCierre,
        p_nombre: opcion.nombre,
        p_periodo_periodo: idPeriodo,
        p_periodo_anio: anioPeriodo,
        p_periodo_duracion_id: opcionSeleccionada,
      }));
      const data = {
        periodo: {
          p_fec_nota_ini: formatearFechas(fechaIngresoNotas),
          p_fec_nota_fin: formatearFechas(fechaFIngresoNotas),
          p_periodo_periodo: idPeriodo,
          p_periodo_anio: anioPeriodo,
          p_periodo_duracion_id: opcionSeleccionada,
          p_fec_ini_plan: formatearFechas(fechaIPlanificacionAcd),
          p_fec_final_plan: formatearFechas(fechaFPlanificacionAcd),
          p_fec_can_exp_ini: formatearFechas(fechaICancelaciones),
          p_fec_can_exp_fin: formatearFechas(fechaFCancelaciones),
          p_fec_periodo_ini: formatearFechas(fechaIPeriodoAcd),
          p_fec_periodo_fin: formatearFechas(fechaFPeriodoAcd),
        },
        matricula: matriculaData,
      };

      // Convierte los datos a formato JSON
      const jsonData = JSON.stringify(data);

      fetch(apiurl + "/api/v1/admin/configuracion-periodo", {
        method: "POST",
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Formulario enviado Correctamente");
          window.location.href = "/administrador/nuevo-periodo";
        })
        .catch((err) => {
          console.error(err);

          alert("Formulario no enviado");
        });
    }
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState(""); // Estado para almacenar la opción seleccionada

  const handleOpcion = (e) => {
    setOpcionSeleccionada(e.target.value); // Actualiza la opción seleccionada en el estado

    const reinicioOpciones = [
      {
        nombre: "A",
        indiceMinimo: 82,
        indiceMaximo: 100,
        fechaInicio: "",
        fechaCierre: "",
        horaInicio: "09:00",
        horaCierre: "23:59",
      },

      {
        nombre: "B y Primer Ingreso",
        indiceMinimo: 80,
        indiceMaximo: 81,
        fechaInicio: "",
        fechaCierre: "",
        horaInicio: "09:00",
        horaCierre: "23:59",
      },
      {
        nombre: "C",
        indiceMinimo: 70,
        indiceMaximo: 79,
        fechaInicio: "",
        fechaCierre: "",
        horaInicio: "09:00",
        horaCierre: "23:59",
      },
      {
        nombre: "D",
        indiceMinimo: 0,
        indiceMaximo: 69,
        fechaInicio: "",
        fechaCierre: "",
        horaInicio: "09:00",
        horaCierre: "23:59",
      },
      {
        nombre: "Adiciones y Cancelaciones",
        indiceMinimo: 0,
        indiceMaximo: 100,
        fechaInicio: "",
        fechaCierre: "",
        horaInicio: "09:00",
        horaCierre: "23:59",
      },
    ];

    setOpciones(reinicioOpciones);

    setIDPeriodo("");
    setNombrePeriodo("");
    setAnioPeriodo("");
    setFechaIPeriodoAcd("");
    setFechaFPeriodoAcd("");
    setFechaIPlanificacionAcd("");
    setFechaFPlanificacionAcd("");
    setFechaIngresoNotas("");
    setFechaFIngresoNotas("");
    setFechaICancelaciones("");
    setFechaFCancelaciones("");
    setMostrarTabla(false);
  };

  // FIN COMPONENTE PRINCIPAL

  //---------------------------------------------------------------------------------------------------
  //INICIO FECHAS DEL PERIODO

  const [idPeriodo, setIDPeriodo] = useState("");
  const [nombrePeriodo, setNombrePeriodo] = useState("");
  const [anioPeriodo, setAnioPeriodo] = useState("");
  const [fechaIPeriodoAcd, setFechaIPeriodoAcd] = useState("");
  const [fechaFPeriodoAcd, setFechaFPeriodoAcd] = useState("");
  const [fechaIPlanificacionAcd, setFechaIPlanificacionAcd] = useState("");
  const [fechaFPlanificacionAcd, setFechaFPlanificacionAcd] = useState("");
  const [fechaIngresoNotas, setFechaIngresoNotas] = useState("");
  const [fechaFIngresoNotas, setFechaFIngresoNotas] = useState("");
  const [fechaICancelaciones, setFechaICancelaciones] = useState("");
  const [fechaFCancelaciones, setFechaFCancelaciones] = useState("");

  const [fechaIPeriodoAcdErr, setFechaIPeriodoAcdErr] = useState(null);
  const [fechaFPeriodoAcdErr, setFechaFPeriodoAcdErr] = useState(null);
  const [fechaIPlanificacionAcdErr, setFechaIPlanificacionAcdErr] =
    useState(null);
  const [fechaFPlanificacionAcdErr, setFechaFPlanificacionAcdErr] =
    useState(null);
  const [fechaIngresoNotasErr, setFechaIngresoNotasErr] = useState(null);
  const [fechaFIngresoNotasErr, setFechaFIngresoNotasErr] = useState(null);
  const [fechaICancelacionesErr, setFechaICancelacionesErr] = useState(null);
  const [fechaFCancelacionesErr, setFechaFCancelacionesErr] = useState(null);

  const [fechasValidas, setFechasValidas] = useState(null); // Estado para rastrear la validación

  const handleFechaIPeriodoAcdChange = (e) => {
    setFechaIPeriodoAcd(e);
  };

  const handleFechaFPeriodoAcdChange = (e) => {
    setFechaFPeriodoAcd(e);
  };

  const handleFechaIPlanificacionAcdChange = (e) => {
    setFechaIPlanificacionAcd(e);
  };

  const handleFechaIngresoNotasChange = (e) => {
    setFechaIngresoNotas(e);
  };

  const handleFechaFIngresoNotasChange = (e) => {
    setFechaFIngresoNotas(e);
  };

  const handleFechaICancelacionesChange = (e) => {
    setFechaICancelaciones(e);
  };

  const handleFechaFCancelacionesChange = (e) => {
    setFechaFCancelaciones(e);
  };

  useEffect(() => {
    fetch(
      apiurl +
        "/api/v1/admin/siguiente-periodo?tipoPeriodo=" +
        opcionSeleccionada,
      {
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const dPeriodo = data.data[0].PERIODO;
        const aPeriodo = data.data[0].ANIO;

        if (dPeriodo === 1) {
          setIDPeriodo(1);
          setNombrePeriodo("IPAC");
        } else if (dPeriodo === 2) {
          setIDPeriodo(2);
          setNombrePeriodo("IIPAC");
        } else {
          setIDPeriodo(3);
          setNombrePeriodo("IIIPAC");
        }

        setAnioPeriodo(aPeriodo);
      })
      .catch((error) => console.log(error));
  }, [opcionSeleccionada]);
  //FIN FECHAS DEL PERIODO

  //---------------------------------------------------------------------------------------------------
  //INICIO FECHAS DE MATRICULA
  const [opciones, setOpciones] = useState([
    {
      nombre: "A",
      indiceMinimo: 82,
      indiceMaximo: 100,
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "09:00",
      horaCierre: "23:59",
    },

    {
      nombre: "B y Primer Ingreso",
      indiceMinimo: 80,
      indiceMaximo: 81,
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "09:00",
      horaCierre: "23:59",
    },
    {
      nombre: "C",
      indiceMinimo: 70,
      indiceMaximo: 79,
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "09:00",
      horaCierre: "23:59",
    },
    {
      nombre: "D",
      indiceMinimo: 0,
      indiceMaximo: 69,
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "09:00",
      horaCierre: "23:59",
    },
    {
      nombre: "Adiciones y Cancelaciones",
      indiceMinimo: 0,
      indiceMaximo: 100,
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "09:00",
      horaCierre: "23:59",
    },
  ]);

  const [opcionesErr, setOpcionesErr] = useState([
    {
      nombre: false,
      indiceMinimo: false,
      indiceMaximo: false,
      fechaInicio: false,
      fechaCierre: false,
      horaInicio: false,
      horaCierre: false,
    },

    {
      nombre: false,
      indiceMinimo: false,
      indiceMaximo: false,
      fechaInicio: false,
      fechaCierre: false,
      horaInicio: false,
      horaCierre: false,
    },
    {
      nombre: false,
      indiceMinimo: false,
      indiceMaximo: false,
      fechaInicio: false,
      fechaCierre: false,
      horaInicio: false,
      horaCierre: false,
    },
    {
      nombre: false,
      indiceMinimo: false,
      indiceMaximo: false,
      fechaInicio: false,
      fechaCierre: false,
      horaInicio: false,
      horaCierre: false,
    },
    {
      nombre: false,
      indiceMinimo: false,
      indiceMaximo: false,
      fechaInicio: false,
      fechaCierre: false,
      horaInicio: false,
      horaCierre: false,
    },
  ]);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [confMatriculaValidar, setConfMatriculaValidar] = useState(false);

  const handleOpcionClick = () => {
    setMostrarTabla(!mostrarTabla);
  };

  const agregarFila = () => {
    const nuevaFila = {
      nombre: "",
      indiceMinimo: "",
      indiceMaximo: "",
      fechaInicio: "",
      fechaCierre: "",
      horaInicio: "",
      horaCierre: "",
    };
    setOpciones([...opciones, nuevaFila]);
  };

  const agregarFilaErr = () => {
    const nuevaFilaErr = {
      nombre: null,
      indiceMinimo: null,
      indiceMaximo: null,
      fechaInicio: null,
      fechaCierre: null,
      horaInicio: null,
      horaCierre: null,
    };
    setOpcionesErr([...opcionesErr, nuevaFilaErr]);
  };

  const handleFechaInicioChange = (index, date) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index].fechaInicio = date;
    setOpciones(nuevasOpciones);
  };

  const handleFechaCierreChange = (index, date) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index].fechaCierre = date;
    setOpciones(nuevasOpciones);

    setFechaFPlanificacionAcd(date);
  };
  //FIN FECHAS DE MATRICULA
  return (
    <>
      <style>
        {`
          body {
            background-size: cover;
            background-image: linear-gradient(#99d8dd, #5cb3c1) !important;
            background-repeat: no-repeat;
            background-color: #5cb3c1 !important;
          }
        `}
      </style>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
      <div className="containerP text-center">
        <Atras />
        <h2 className="titulos">Crear Nuevo Periodo</h2>
        <div>
          <select value={opcionSeleccionada} onChange={handleOpcion}>
            <option value="" disabled={opcionSeleccionada !== ""}>
              {" "}
              Seleccione la duración{" "}
            </option>
            <option value={1}> Trimestral </option>
            <option value={2}>Semestral</option>
          </select>
          {/**---------------------------------FECHAS DE PERIODO------------------------------------ */}
          {opcionSeleccionada !== "" && (
            <div>
              <>
                <Row>
                  <Col>
                    <Form.Group
                      controlId="formPeriodo"
                      style={{ padding: "10px" }}
                    >
                      <Form.Label>Periodo</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="text"
                        value={nombrePeriodo}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="formAnio"
                      style={{ padding: "10px" }}
                    >
                      <Form.Label>Año</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="number"
                        value={anioPeriodo}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <br></br>
                <form>
                  <Row style={{ padding: "15px" }}>
                    <Col>
                      <Form.Group
                        controlId="formIPfA"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha de Inicio de Planificación Académica:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaIPlanificacionAcd}
                          onChange={(e) => {
                            handleFechaIPlanificacionAcdChange(e.target.value);
                          }}
                          isInvalid={fechaIPlanificacionAcdErr === true}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="formFPfA"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha Final de Planificación Académica:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaFPlanificacionAcd}
                          disabled
                        />
                      </Form.Group>
                      <div>
                        *Esta fecha depende de la fecha de finalizacion de
                        adiciones y cancelaciones
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ padding: "15px" }}>
                    <Col>
                      <Form.Group
                        controlId="formIPeA"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha de Inicio de Periodo Académico:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaIPeriodoAcd}
                          onChange={(e) => {
                            handleFechaIPeriodoAcdChange(e.target.value);
                          }}
                          isInvalid={fechaIPeriodoAcdErr === true}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="formFPeA"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha Final de Periodo Académico:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaFPeriodoAcd}
                          onChange={(e) => {
                            handleFechaFPeriodoAcdChange(e.target.value);
                          }}
                          isInvalid={fechaFPeriodoAcdErr === true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ padding: "15px" }}>
                    <Col>
                      <Form.Group
                        controlId="formIN"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>Fecha de Ingreso de Notas:</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaIngresoNotas}
                          onChange={(e) => {
                            handleFechaIngresoNotasChange(e.target.value);
                          }}
                          isInvalid={fechaIngresoNotasErr === true}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="formFIN"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha Final de Ingreso de Notas:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaFIngresoNotas}
                          onChange={(e) => {
                            handleFechaFIngresoNotasChange(e.target.value);
                          }}
                          isInvalid={fechaFIngresoNotasErr === true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ padding: "15px" }}>
                    <Col>
                      <Form.Group
                        controlId="formICE"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha de Inicio de Cancelaciones Excepcionales:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaICancelaciones}
                          onChange={(e) => {
                            handleFechaICancelacionesChange(e.target.value);
                          }}
                          isInvalid={fechaICancelacionesErr === true}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId="formFCE"
                        style={{ padding: "10px" }}
                      >
                        <Form.Label>
                          Fecha Final de Cancelaciones Excepcionales:
                        </Form.Label>
                        <Form.Control
                          className="text-center"
                          type="date"
                          value={fechaFCancelaciones}
                          onChange={(e) => {
                            handleFechaFCancelacionesChange(e.target.value);
                          }}
                          isInvalid={fechaFCancelacionesErr === true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </form>
              </>

              {/**----------------------------FECHAS DE MATRICULA-------------------------------- */}
              <div>
                <br></br>
                <h4>
                  <button
                    onClick={handleOpcionClick}
                    style={{ border: "none", background: "none" }}
                  >
                    {mostrarTabla ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </button>{" "}
                  Configuración de fechas de matrícula
                </h4>

                <div
                  className={`tabla-container ${mostrarTabla ? "mostrar" : ""}`}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Índice Mínimo</th>
                        <th>Índice Máximo</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Cierre</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Cierre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opciones.map((opcion, index) => (
                        <tr key={index}>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="text"
                                value={opcion.nombre}
                                onChange={(e) => {
                                  const nuevasOpciones = [...opciones];
                                  nuevasOpciones[index].nombre = e.target.value;
                                  setOpciones(nuevasOpciones);
                                }}
                                isInvalid={opcionesErr[index].nombre === true}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="number"
                                value={opcion.indiceMinimo}
                                min="0"
                                max="100"
                                disabled={opcion.nombre === "Primer Ingreso"}
                                onChange={(e) => {
                                  const nuevasOpciones = [...opciones];
                                  nuevasOpciones[index].indiceMinimo =
                                    e.target.value;
                                  setOpciones(nuevasOpciones);
                                }}
                                isInvalid={
                                  opcionesErr[index].indiceMinimo === true
                                }
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="number"
                                value={opcion.indiceMaximo}
                                min="0"
                                max="100"
                                disabled={opcion.nombre === "Primer Ingreso"}
                                onChange={(e) => {
                                  const nuevasOpciones = [...opciones];
                                  nuevasOpciones[index].indiceMaximo =
                                    e.target.value;
                                  setOpciones(nuevasOpciones);
                                }}
                                isInvalid={
                                  opcionesErr[index].indiceMaximo === true
                                }
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="date"
                                value={opcion.fechaInicio}
                                onChange={(e) => {
                                  handleFechaInicioChange(
                                    index,
                                    e.target.value
                                  );
                                }}
                                isInvalid={
                                  opcionesErr[index].fechaInicio === true
                                }
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="date"
                                value={opcion.fechaCierre}
                                onChange={(e) => {
                                  handleFechaCierreChange(
                                    index,
                                    e.target.value
                                  );
                                }}
                                isInvalid={
                                  opcionesErr[index].fechaCierre === true
                                }
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="time"
                                value={opcion.horaInicio}
                                onChange={(e) => {
                                  const nuevasOpciones = [...opciones];
                                  nuevasOpciones[index].horaInicio =
                                    e.target.value;
                                  setOpciones(nuevasOpciones);
                                }}
                                isInvalid={
                                  opcionesErr[index].horaInicio === true
                                }
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFCE">
                              <Form.Control
                                classname="text-center"
                                type="time"
                                value={opcion.horaCierre}
                                onChange={(e) => {
                                  const nuevasOpciones = [...opciones];
                                  nuevasOpciones[index].horaCierre =
                                    e.target.value;
                                  setOpciones(nuevasOpciones);
                                }}
                                isInvalid={
                                  opcionesErr[index].horaCierre === true
                                }
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    className="btn-seccionesNoMargin"
                    style={{ padding: "10px" }}
                    onClick={() => {
                      agregarFila();
                      agregarFilaErr();
                    }}
                  >
                    Agregar Fila
                  </Button>
                </div>
              </div>

              <Button
                className="btn-seccionesNoMargin"
                variant="primary"
                type="submit"
                style={{ width: "200px" }}
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdmConfPeriodo;
