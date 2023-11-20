import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import "../Styles/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";

import formatearFechas from "../utils/formatearFechas.js";

//Componente fechas de periodo
const Fechas = ({
  fechaFinalPlanificacionAcd,
  opcionSeleccionada,
  setFechasValidadas,
  setDatosFechas,
}) => {
  const [idPeriodo, setIDPeriodo] = useState("");
  const [nombrePeriodo, setNombrePeriodo] = useState("");
  const [anioPeriodo, setAnioPeriodo] = useState("");
  const [fechaIPeriodoAcd, setFechaIPeriodoAcd] = useState("");
  const [fechaFPeriodoAcd, setFechaPeriodoAcd] = useState("");
  const [fechaIPlanificacionAcd, setFechaIPlanificacionAcd] = useState("");
  const [fechaFPlanificacionAcd, setFechaFPlanificacionAcd] = useState("");
  const [fechaIngresoNotas, setFechaIngresoNotas] = useState("");
  const [fechaFIngresoNotas, setFechaFIngresoNotas] = useState("");
  const [fechaICancelaciones, setFechaICancelaciones] = useState("");
  const [fechaFCancelaciones, setFechaFCancelaciones] = useState("");

  const [fechasValidas, setFechasValidas] = useState(false); // Estado para rastrear la validación
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje

  const handleFechaIPeriodoAcdChange = (e) => {
    setFechaIPeriodoAcd(e);
  };

  const handleFechaFPeriodoAcdChange = (e) => {
    setFechaPeriodoAcd(e);
  };

  const handleFechaIPlanificacionAcdChange = (e) => {
    setFechaIPlanificacionAcd(e);
  };

  const handleFechaFPlanificacionAcdChange = () => {
    setFechaFPlanificacionAcd(fechaFinalPlanificacionAcd);
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

  const handleValidarFechas = () => {
    // Verificar si hay campos vacíos
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
      !fechaFCancelaciones
    ) {
      setMensaje("Completa todos los campos antes de validar.");
      setFechasValidas(false);
      return;
    }
    const currentYear = new Date().getFullYear();

    /*Validación que el año sea correcto */
    if (anioPeriodo <= 0 || anioPeriodo < currentYear) {
      setMensaje("El año del periodo es inválido");
      setFechasValidas(false);
    } else if (
      /*Validación para que la fecha final siempre sea despues que la inicial*/
      new Date(fechaFPeriodoAcd) < new Date(fechaIPeriodoAcd) ||
      new Date(fechaFPlanificacionAcd) < new Date(fechaIPlanificacionAcd) ||
      new Date(fechaFIngresoNotas) < new Date(fechaIngresoNotas)
    ) {
      setMensaje(
        "Verifique las fechas: La fecha inicial no puede ser despues que la fecha final"
      );
      setFechasValidas(false);
    } else if (new Date(fechaIPlanificacionAcd) > new Date(fechaIPeriodoAcd)) {
      /*Validación para que la planificación academica siempre sea antes que el inicio de periodo*/
      setMensaje(
        "Verifique las fechas: La planificación académica debe de ser antes que el inicio de periodo"
      );
      setFechasValidas(false);
    } else if (
      /*Validación para que la fecha final del periodo corrsponda con la solicitud, en este caso no se negará la validación si hay casos especiales*/
      /*Trimestral */
      opcionSeleccionada === 1 &&
      new Date(fechaFPeriodoAcd) - new Date(fechaIPeriodoAcd) <
        1000 * 60 * 60 * 24 * 90 // 90 días, 3 meses
    ) {
      setMensaje(
        "Advertencia: El Periodo es Trimestral, por lo que debería de haber un margen de 3 meses mínimos tentativos entre la fecha de inicio y fin"
      );
    } else if (
      /*Semestral */
      opcionSeleccionada === 2 &&
      new Date(fechaFPeriodoAcd) - new Date(fechaIPeriodoAcd) <
        1000 * 60 * 60 * 24 * 180 // 180 días, 6 meses
    ) {
      setMensaje(
        "Advertencia: El Periodo es Semestral, por lo que debería de haber un margen de 6 meses minimos tentativos entre la fecha de inicio y fin"
      );
    } else if (
      /*Validación para que haya una semana de diferencia entre las fechas de inicio de planificación académica y de inicio de periodo académico.*/
      new Date(fechaIPlanificacionAcd) - new Date(fechaIPeriodoAcd) >
      1000 * 60 * 60 * 24 * 7 // 7 días, 1 semana
    ) {
      setMensaje(
        "Debe haber un margen de al menos 1 semana entre las fechas de inicio de planificación académica y de inicio de periodo académico."
      );
      setFechasValidas(false);
    } else if (new Date(fechaIPlanificacionAcd) > new Date(fechaIngresoNotas)) {
      /*Validación para que el ingreso de notas sea despues que la planificación*/
      setMensaje(
        "Verifique las fechas: La planificación académica debe de ser antes que el ingreso de notas"
      );
      setFechasValidas(false);
    } else if (
      /*Validación para que haya un margen de 2 meses entre planificacion e ingreso de notas minimo*/
      new Date(fechaIngresoNotas) - new Date(fechaIPlanificacionAcd) <
      1000 * 60 * 60 * 24 * 60 // 60 días
    ) {
      setMensaje(
        "Debe haber un margen de al menos 2 meses entre las fechas de inicio y de ingreso."
      );
      setFechasValidas(false);
    } else if (
      new Date(fechaFPlanificacionAcd) > new Date(fechaICancelaciones)
    ) {
      setMensaje(
        "Verifique las fechas: La fecha de inicio de Cancelaciones Excepcionales debe ser despues de terminar el periodo de la Planificación Académica"
      );
      setFechasValidas(false);
    } else if (new Date(fechaFCancelaciones) > new Date(fechaIngresoNotas)) {
      setMensaje(
        "Verifique las fechas: La fecha final de Cancelaciones Excepcionales debe ser antes de iniciar el periodo de Ingreso de Notas"
      );
      setFechasValidas(false);
    } else {
      setMensaje("Validación exitosa: fechas son correctas.");
      setFechasValidas(true);
    }

    setFechasValidadas(fechasValidas);

    setDatosFechas({
      idPeriodo,
      anioPeriodo,
      fechaIPeriodoAcd,
      fechaFPeriodoAcd,
      fechaIPlanificacionAcd,
      fechaFPlanificacionAcd,
      fechaIngresoNotas,
      fechaFIngresoNotas,
      fechaICancelaciones,
      fechaFCancelaciones,
    });
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
        const dPeriodo = data.data[0].PERIODO;
        const aPeriodo = data.data[0].ANIO;

        if (dPeriodo === 1) {
          setIDPeriodo(1);
          setNombrePeriodo("IPAC");
        } else if (dPeriodo === 2) {
          setIDPeriodo(2);
          setNombrePeriodo("IIPAC");
        } else {
          setNombrePeriodo(3);
          setNombrePeriodo("IIIPAC");
        }

        setAnioPeriodo(aPeriodo);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Form.Group controlId="formPeriodo" style={{ padding: "10px" }}>
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
          <Form.Group controlId="formAnio" style={{ padding: "10px" }}>
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
            <Form.Group controlId="formIPfA" style={{ padding: "10px" }}>
              <Form.Label>
                Fecha de Inicio de Planificación Académica:
              </Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaIPlanificacionAcd}
                onChange={(e) => {
                  handleFechaIPlanificacionAcdChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFPfA" style={{ padding: "10px" }}>
              <Form.Label>Fecha Final de Planificación Académica:</Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaFinalPlanificacionAcd}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ padding: "15px" }}>
          <Col>
            <Form.Group controlId="formIPeA" style={{ padding: "10px" }}>
              <Form.Label>Fecha de Inicio de Periodo Académico:</Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaIPeriodoAcd}
                onChange={(e) => {
                  handleFechaIPeriodoAcdChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFPeA" style={{ padding: "10px" }}>
              <Form.Label>Fecha Final de Periodo Académico:</Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaFPeriodoAcd}
                onChange={(e) => {
                  handleFechaFPeriodoAcdChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ padding: "15px" }}>
          <Col>
            <Form.Group controlId="formIN" style={{ padding: "10px" }}>
              <Form.Label>Fecha de Ingreso de Notas:</Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaIngresoNotas}
                onChange={(e) => {
                  handleFechaIngresoNotasChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFIN" style={{ padding: "10px" }}>
              <Form.Label>Fecha Final de Ingreso de Notas:</Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaFIngresoNotas}
                onChange={(e) => {
                  handleFechaFIngresoNotasChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ padding: "15px" }}>
          <Col>
            <Form.Group controlId="formICE" style={{ padding: "10px" }}>
              <Form.Label>
                Fecha de Inicio de Cancelaciones Excepcionales:
              </Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaICancelaciones}
                onChange={(e) => {
                  handleFechaICancelacionesChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFCE" style={{ padding: "10px" }}>
              <Form.Label>
                Fecha Final de Cancelaciones Excepcionales:
              </Form.Label>
              <Form.Control
                className="text-center"
                type="date"
                value={fechaFCancelaciones}
                onChange={(e) => {
                  handleFechaFCancelacionesChange(e.target.value);
                  setFechasValidadas(false);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </form>

      {fechasValidas === false && <div style={{ color: "red" }}>{mensaje}</div>}
      <Button
        className="btnE2"
        onClick={() => {
          handleValidarFechas();
          handleFechaFPlanificacionAcdChange();
        }}
      >
        Validar Fechas
      </Button>
    </>
  );
};

//Componente fechas de matricula
function ConfMatricula({
  setFechaFinalPlanificacionAcd,
  setConfMatriculaValidada,
  setConfMatriculaData,
}) {
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

  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [confMatriculaValidar, setConfMatriculaValidar] = useState(false);
  const [mensaje, setMensaje] = useState("");

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

  const handleValidarFechasHoras = () => {
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

    if (camposVacios) {
      setMensaje("Completa todos los campos antes de validar.");
      setConfMatriculaValidar(false);
      setConfMatriculaValidada(confMatriculaValidar);
      return;
    }

    const indicesInvalidos = opciones.some(
      (opcion) =>
        opcion.nombre !== "Primer Ingreso" &&
        opcion.indiceMinimo >= opcion.indiceMaximo
    );

    if (indicesInvalidos) {
      setMensaje("El índice máximo debe ser mayor que el índice mínimo.");
      setConfMatriculaValidar(false);
      setConfMatriculaValidada(confMatriculaValidar);
      return;
    }

    const indicesFueraRango = opciones.some(
      (opcion) => 100 < opcion.indiceMaximo || opcion.indiceMinimo < 0
    );

    if (indicesFueraRango) {
      setMensaje("El indice debe de estar entre 0 y 100");
      setConfMatriculaValidar(false);
      setConfMatriculaValidada(confMatriculaValidar);
      return;
    }
    for (let i = 1; i < opciones.length; i++) {
      const nombre = opciones[i].nombre;
      const fechaInicioActual = new Date(opciones[i].fechaInicio);
      const fechaInicioAnterior = new Date(opciones[i - 1].fechaInicio);
      const indiceMaximoActual = opciones[i].indiceMaximo;
      const indiceMinimoAnterior = opciones[i - 1].indiceMinimo;

      if (fechaInicioActual <= fechaInicioAnterior) {
        setMensaje(
          "Verifica el orden de las fechas con la jerarquía de matricula"
        );
        setConfMatriculaValidar(false);
        setConfMatriculaValidada(confMatriculaValidar);
        return;
      }
      if (nombre !== "Adiciones y Cancelaciones") {
        if (indiceMaximoActual >= indiceMinimoAnterior) {
          setMensaje(
            "Verifica los indices, el indice maximo de una categoría no debe ser mayor que el indice minimo de la categoría anterior"
          );
          setConfMatriculaValidar(false);
          setConfMatriculaValidada(confMatriculaValidar);
          return;
        }
      }

      if (
        new Date(opciones[i].fechaCierre) < new Date(opciones[i].fechaInicio) ||
        new Date(opciones[i].horaCierre) < new Date(opciones[i].horaInicio)
      ) {
        setMensaje("Verifica las fechas y horas: deben ser correctas.");
        setConfMatriculaValidar(false);
        setConfMatriculaValidada(confMatriculaValidar);
        return;
      }
    }

    setMensaje();
    setConfMatriculaValidar(true);
    setConfMatriculaValidada(confMatriculaValidar);
    setConfMatriculaData(opciones);
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

    setFechaFinalPlanificacionAcd(date);
  };

  return (
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

      <div className={`tabla-container ${mostrarTabla ? "mostrar" : ""}`}>
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
                        setConfMatriculaValidada(false);
                      }}
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
                        nuevasOpciones[index].indiceMinimo = e.target.value;
                        setOpciones(nuevasOpciones);
                        setConfMatriculaValidada(false);
                      }}
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
                        nuevasOpciones[index].indiceMaximo = e.target.value;
                        setOpciones(nuevasOpciones);
                        setConfMatriculaValidada(false);
                      }}
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
                        handleFechaInicioChange(index, e.target.value);
                        setConfMatriculaValidada(false);
                      }}
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
                        handleFechaCierreChange(index, e.target.value);
                        setConfMatriculaValidada(false);
                      }}
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
                        nuevasOpciones[index].horaInicio = e.target.value;
                        setOpciones(nuevasOpciones);
                        setConfMatriculaValidada(false);
                      }}
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
                        nuevasOpciones[index].horaCierre = e.target.value;
                        setOpciones(nuevasOpciones);
                        setConfMatriculaValidada(false);
                      }}
                    />
                  </Form.Group>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ color: "red" }}>{mensaje}</div>
        <Button
          className="btnE2"
          style={{ padding: "10px" }}
          onClick={agregarFila}
        >
          Agregar Fila
        </Button>
        <Button
          className="btnE2"
          style={{ padding: "10px" }}
          onClick={handleValidarFechasHoras}
        >
          Validar Fechas y Horas
        </Button>
      </div>
    </div>
  );
}

//Se acortará el nombre de Administrador a Adm para mayor facilidad
const AdmConfPeriodo = () => {
  //Datos del componente Fecha
  const [datosFechas, setDatosFechas] = useState({
    idPeriodo: "",
    anioPeriodo: "",
    fechaIPeriodoAcd: "",
    fechaFPeriodoAcd: "",
    fechaIPlanificacionAcd: "",
    fechaFPlanificacionAcd: "",
    fechaIngresoNotas: "",
    fechaFIngresoNotas: "",
    fechaICancelaciones: "",
    fechaFCancelaciones: "",
  });

  //Datos del Componente ConfMatricula
  const [opcionesConfMatricula, setOpcionesConfMatricula] = useState([]);

  const handleConfMatriculaData = (opciones) => {
    setOpcionesConfMatricula(opciones);
  };

  // useEffect(() => {});
  const handleSubmit = (e) => {
    e.preventDefault();
    const matriculaData = opcionesConfMatricula.map((opcion) => ({
      p_indice_inicio: opcion.indiceMinimo,
      p_indice_final: opcion.indiceMaximo,
      p_fecha_inicio: formatearFechas(opcion.fechaInicio)+' '+opcion.horaInicio,
      p_fecha_final: formatearFechas(opcion.fechaCierre)+' '+opcion.horaCierre,
      p_nombre: opcion.nombre,
      p_periodo_periodo: datosFechas.idPeriodo,
      p_periodo_anio: datosFechas.anioPeriodo,
      p_periodo_duracion_id: opcionSeleccionada,
    }));

    const data = {
      periodo: {
        p_fec_nota_ini: formatearFechas(datosFechas.fechaIngresoNotas),
        p_fec_nota_fin: formatearFechas(datosFechas.fechaFIngresoNotas),
        p_periodo_periodo: datosFechas.idPeriodo,
        p_periodo_anio: datosFechas.anioPeriodo,
        p_periodo_duracion_id: opcionSeleccionada,
        p_fec_ini_plan: formatearFechas(datosFechas.fechaIPlanificacionAcd),
        p_fec_final_plan: formatearFechas(datosFechas.fechaFPlanificacionAcd),
        p_fec_can_exp_ini: formatearFechas(datosFechas.fechaICancelaciones),
        p_fec_can_exp_fin: formatearFechas(datosFechas.fechaFCancelaciones),
        p_fec_periodo_ini: formatearFechas(datosFechas.fechaIPeriodoAcd),
        p_fec_periodo_fin: formatearFechas(datosFechas.fechaFPeriodoAcd),
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
      })
      .catch((err) => {
        console.error(err);

        alert("Formulario no enviado");
      });
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState(""); // Estado para almacenar la opción seleccionada

  //Validacion de Fechas de Periodo y de Matricula
  const [fechasValidadas, setFechasValidadas] = useState(false);
  const [confMatriculaValidada, setConfMatriculaValidada] = useState(false);

  const [fechaFinalPlanificacionAcd, setFechaFinalPlanificacionAcd] =
    useState(""); // Nuevo estado para la fecha final de planificación académica

  const handleOpcion = (e) => {
    setOpcionSeleccionada(e.target.value); // Actualiza la opción seleccionada en el estado
  };

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
        <h2 className="titulos">Crear Nuevo Periodo</h2>
        <div>
          <select value={opcionSeleccionada} onChange={handleOpcion}>
            <option value="" disabled={opcionSeleccionada !== ""}>
              {" "}
              Seleccione la duración{" "}
            </option>
            <option
              value={1}
              onClick={() => {
                setConfMatriculaValidada(false);
                confMatriculaValidada(false);
              }}
            >
              {" "}
              Trimestral{" "}
            </option>
            <option
              value={2}
              onClick={() => {
                setConfMatriculaValidada(false);
                confMatriculaValidada(false);
              }}
            >
              Semestral
            </option>
          </select>

          {opcionSeleccionada === "1" && (
            <div>
              <Fechas
                fechaFinalPlanificacionAcd={fechaFinalPlanificacionAcd}
                opcionSeleccionada={opcionSeleccionada}
                setFechasValidadas={setFechasValidadas}
                setDatosFechas={setDatosFechas}
              />

              <ConfMatricula
                setFechaFinalPlanificacionAcd={setFechaFinalPlanificacionAcd}
                setConfMatriculaValidada={setConfMatriculaValidada}
                setConfMatriculaData={handleConfMatriculaData}
              />

              <Button
                variant="primary"
                type="submit"
                style={{ width: "200px" }}
                onClick={handleSubmit}
                disabled={!fechasValidadas || !confMatriculaValidada}
              >
                Enviar
              </Button>
            </div>
          )}

          {opcionSeleccionada === "2" && (
            <div>
              <Fechas
                fechaFinalPlanificacionAcd={fechaFinalPlanificacionAcd}
                opcionSeleccionada={opcionSeleccionada}
                setFechasValidadas={setFechasValidadas}
                setDatosFechas={setDatosFechas}
              />
              <ConfMatricula
                setFechaFinalPlanificacionAcd={setFechaFinalPlanificacionAcd}
                setConfMatriculaValidada={setConfMatriculaValidada}
                setConfMatriculaData={handleConfMatriculaData}
              />

              <Button
                variant="primary"
                type="submit"
                style={{ width: "200px" }}
                onClick={handleSubmit}
                disabled={!fechasValidadas || !confMatriculaValidada}
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
