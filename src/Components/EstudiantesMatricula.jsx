import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Modal,
  Dropdown,
} from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

const EstudianteMatricula = () => {
  //Datos del estudiante
  const [estudiante, setEstudiante] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [uv, setUV] = useState(25);

  //Datos de las clases a matricular
  const [clasesAM, setClasesAM] = useState([]);

  //Clase matriculada
  const [clase, setClase] = useState("");
  const [seccion, setSeccion] = useState("");

  //Clases matriculadas
  const [clasesMatriculadas, setClasesMatriculadas] = useState([]);

  //fetch para obtener los centros regionales
  const [datosE, setDatosE] = useState([]);
  const [datosC, setDatosC] = useState([]);

  //Modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  //Obtiene datos del estudiante y sus clases matriculadas
  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/matricula", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const perfil = data.perfil[0];
        const clasesM = data.clases;
        setClasesMatriculadas(clasesM);
        setEstudiante(perfil.NOMBRE);
        setCuenta(perfil.CUENTA);
        setUV(perfil.UV);
        if (perfil.PERIODO === "1") {
          setPeriodo("IPAC " + perfil.AÑO);
        } else if (perfil.PERIODO === "2") {
          setPeriodo("IIPAC " + perfil.AÑO);
        } else if (perfil.PERIODO === "3") {
          setPeriodo("IIIPAC " + perfil.AÑO);
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Lista de clases disponibles para matricular
  const handleMatricularClick = () => {
    fetch(apiurl + "/api/v1/estudiante/clases-matricular", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const clasesDisponibles = data.data;

        const clasesNuevas = clasesDisponibles.filter((disponible) => {
          return !clasesMatriculadas.some(
            (matriculada) =>
              matriculada.COD_ASIGNATURA === disponible.COD_ASIGNATURA
          );
        });

        setClasesAM(clasesNuevas);

        console.log(clasesNuevas);
      })
      .catch((error) => console.log(error));

    setShowModal(true);
  };

  //matricular una clase
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };



  const handleMatriculadoClick = () => {
  
    if (selectedRow !== null) {
      const clasePorMatricular = clasesAM[selectedRow];

      const selectedData = clasesAM[selectedRow];

      fetch(
        apiurl +
          "/api/v1/estudiante/adicionar-seccion/?seccionID=" +
          selectedData.SECCION_ID,
        {
          method: "POST",
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.mensaje);
          setSelectedRow(null);
          if (data.mensaje === "NO TIENE EL REQUISITO") {
          } else {
            window.location.href = "/estudiantes/matricula";
            setShowModal(false);
          }
        })
        .catch((err) => {
          console.error(err);

          alert("Error");
        });
      setShowModal(false);

      setSelectedRow(null);
    }
  };

  //Cancelar una clase
  const handleCancelarClick = (index) => {
    const claseCancelar = clasesMatriculadas[index];
    fetch(
      apiurl +
        "/api/v1/estudiante/cancelar-seccion/?seccionID=" +
        claseCancelar.ID,
      {
        method: "POST",
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.mensaje);
        setSelectedRow(null);
        window.location.href = "/estudiantes/matricula";
      })
      .catch((err) => {
        console.error(err);

        alert("Fallo de Cancelación");
      });
  };

  return (
    <>
      <style>
        {`
                    body {
                        background-color: #5cb3c1 !important;
                    }
                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        
                    }
                `}
      </style>
      <NavbarLoggedInComponent urlLogo="./../assets/unah_logo.png" />
      <div className="containerP menu-container ">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>Matricula</h2>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Numero de Cuenta</th>
              <th>Periodo</th>
              <th>U.V.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{estudiante}</td>
              <td>{cuenta}</td>
              <td>{periodo}</td>
              <td>{uv}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Clase</th>
              <th>Sección</th>
              <th>Docente</th>
              <th>UV</th>
              <th>Días</th>
              <th>H.I.</th>
              <th>H.F.</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {clasesMatriculadas.map((dato, index) => (
              <tr key={index}>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.ASIGNATURA}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.SECCION}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.DOCENTE}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.UV}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {(() => {
                    let dias = "";

                    if (dato.LUNES === 1) {
                      dias += "Lu ";
                    }
                    if (dato.MARTES === 1) {
                      dias += "Ma ";
                    }
                    if (dato.MIERCOLES === 1) {
                      dias += "Mi ";
                    }
                    if (dato.JUEVES === 1) {
                      dias += "Ju ";
                    }
                    if (dato.VIERNES === 1) {
                      dias += "Vi ";
                    }
                    if (dato.SABADO === 1) {
                      dias += "SA ";
                    }
                    if (dato.DOMINGO === 1) {
                      dias += "Do ";
                    }
                    return dias;
                  })()}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.HORA_INICIO}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {dato.HORA_FIN}
                </td>
                <td
                  className="centrado"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <Button
                    className="btn-secciones-danger"
                    onClick={() => handleCancelarClick(index)}
                  >
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="justify-content-center">
          <Button
            className="btn-seccionesNoMargin"
            onClick={handleMatricularClick}
          >
            Matricular
          </Button>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Matricular Clase</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <Table
              striped
              bordered
              hover
              style={{ width: "100%", tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Sección</th>
                  <th>Docente</th>
                  <th>Horario</th>
                  <th>Días</th>
                  <th>Requisitos</th>
                </tr>
              </thead>
              <tbody>
                {clasesAM.map((dato, index) => (
                  <tr
                    onClick={() => handleRowClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {dato.NOMBRE_ASIGNATURA}
                    </td>
                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {dato.NOMBRE_SECCION}
                    </td>
                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {dato.DOCENTE}
                    </td>
                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {dato.HORA_INICIO} - {dato.HORA_FINALl}
                    </td>
                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {(() => {
                        let dias = "";

                        if (dato.LUNES === 1) {
                          dias += "Lu ";
                        }
                        if (dato.MARTES === 1) {
                          dias += "Ma ";
                        }
                        if (dato.MIERCOLES === 1) {
                          dias += "Mi ";
                        }
                        if (dato.JUEVES === 1) {
                          dias += "Ju ";
                        }
                        if (dato.VIERNES === 1) {
                          dias += "Vi ";
                        }
                        if (dato.SABADO === 1) {
                          dias += "SA ";
                        }
                        if (dato.DOMINGO === 1) {
                          dias += "Do ";
                        }
                        return dias;
                      })()}
                    </td>

                    <td
                      className={
                        selectedRow === index ? "fila-seleccionada" : ""
                      }
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {(() => {
                        let requisitos = "";

                        if (
                          dato.COD_REQUISITO === "NULL" &&
                          dato.NOMBRE_REQUISITO === "NULL"
                        ) {
                        } else {
                          requisitos = (
                            <>
                              {dato.NOMBRE_REQUISITO}
                              <br></br>
                              {dato.COD_REQUISITO}
                            </>
                          );
                        }

                        return requisitos;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col>
                <Button
                  className="btn-seccionesNoMargin"
                  onClick={handleMatriculadoClick}
                  disabled={selectedRow === null}
                >
                  Matricular
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn-secciones-danger"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EstudianteMatricula;
