import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

//Renderizar Solicitud Cambio de Carrera
const SCambioCarrera = () => {
  const [sscca, setSsCCA] = useState([]);
  const [s, setS] = useState(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/obtener-cambio-car")
      .then((response) => response.json())
      .then((data) => {
        setS(data.data)
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [cancelacion, setCancelacion] = useState({
    clase: "",
    justificacion: "",
    archivo: null,
  });

  const handleTSolicitudes = () => {
    setS(null);
  };

  const handleEstadoA = () => {
    setEstado("aprobado");
  };

  const handleEstadoD = () => {
    setEstado("desaprobado");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      apiurl +
        "/api/v1/docentes/actualizacion/cambio-carrera?nsolicitud=131&actualizacion=1" ,
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
      })
      .catch((err) => {
        console.error(err);

        alert("Error");
      });
    console.log("Cambio de Carrera");
  };

  return (
    <>
      {!s && (<>
      {/*{solicitudes.map((solicitud) => (
          <div key={solicitud.id} className="solicitudes">
            <p>
              <strong>{solicitud.TIPO}</strong>
            </p>
            <p>
              Fecha: {new Date(solicitud.FECHA_SOLICITUD).toLocaleDateString()}
            </p>
            <p>
              <strong>
                {solicitud.ESTADO === 0 ? (
                  <div style={{ color: "red" }}>Desaprobado</div>
                ) : solicitud.ESTADO === 1 ? (
                  <div style={{ color: "green" }}>Aprobado</div>
                ) : (
                  <div style={{ color: "gray" }}>Pendiente</div>
                )}
              </strong>
            </p>
          </div>
        ))}
      */}
      
      
      </>)}

      {s && (
        <>
          <div className="headerSolicitud">
            <Row>
              <Button className="atras-sol" onClick={handleTSolicitudes}>
                <FontAwesomeIcon icon={faX} />
              </Button>
            </Row>
          </div>
          <div className="slideBar">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="clase">
                <Form.Label>Seleccione la Carrera</Form.Label>
                <Form.Control
                  name="clase"
                  value={cancelacion.clase}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="justificacion">
                <Form.Label>Justificación</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="justificacion"
                  value={cancelacion.justificacion}
                />
              </Form.Group>

              <Row
                className="justify-content-center"
                style={{ padding: "10px" }}
              >
                <Button
                  className="btn-seccionesNoMargin"
                  type="submit"
                  onClick={handleEstadoA}
                >
                  Aprobar
                </Button>

                <Button
                  className="btn-secciones-danger"
                  type="submit"
                  onClick={handleEstadoD}
                >
                  Desaprobar
                </Button>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

//Renderizar Solicitud Cancelacion Excepcional
const SCancelacionExc = () => {
  const [sscex, setSsCEX] = useState([]);
  const [s, setS] = useState(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/obtener-cancelaciones-excepcionales")
      .then((response) => response.json())
      .then((data) => {
        setSsCEX(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [cancelacion, setCancelacion] = useState({
    clase: "",
    justificacion: "",
    archivo: null,
  });

  const handleTSolicitudes = () => {
    setS(null);
  };
  const handleEstadoA = () => {
    setEstado("aprobado");
  };

  const handleEstadoD = () => {
    setEstado("desaprobado");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      apiurl +
        "/api/v1/docentes/actualizacion/cancelacion-excepcional?nsolicitud=3&actualizacion=0" ,
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
      })
      .catch((err) => {
        console.error(err);

        alert("Error");
      });
    console.log("Cambio de Carrera");
  };

  return (
    <>
      {!s && <></>}

      {s && (
        <>
          <div className="headerSolicitud">
            <Row>
              <Button className="atras-sol" onClick={handleTSolicitudes}>
                <FontAwesomeIcon icon={faX} />
              </Button>
            </Row>
          </div>
          <div className="slideBar">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="clase">
                <Form.Label>Clase a Cancelar</Form.Label>
                <Form.Control
                  as="select"
                  name="clase"
                  value={cancelacion.clase}
                >
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Historia">Historia</option>
                  <option value="Ciencias">Ciencias</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="justificacion">
                <Form.Label>Justificación</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="justificacion"
                  value={cancelacion.justificacion}
                />
              </Form.Group>

              <Form.Group controlId="archivo">
                <Form.Label>Comprobante</Form.Label>
                <Form.Control type="file" name="archivo" accept=".pdf" />
              </Form.Group>

              <Row
                className="justify-content-center"
                style={{ padding: "10px" }}
              >
                <Button
                  className="btn-seccionesNoMargin"
                  type="submit"
                  onClick={handleEstadoA}
                >
                  Aprobar
                </Button>

                <Button
                  className="btn-secciones-danger"
                  type="submit"
                  onClick={handleEstadoD}
                >
                  Desaprobar
                </Button>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

//Renderizar Solicitud Cambio de Centro
const SCambioCentro = () => {
  const [sscce, setSsCCE] = useState([]);
  const [s, setS] = useState(null);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/obtener-cambio-centro")
      .then((response) => response.json())
      .then((data) => {
        setSsCCE(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);



  const [cancelacion, setCancelacion] = useState({
    clase: "",
    justificacion: "",
    archivo: null,
  });

  const handleTSolicitudes = () => {
    setS(null);
  };
  const handleEstadoA = () => {
    setEstado("aprobado");
  };

  const handleEstadoD = () => {
    setEstado("desaprobado");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      apiurl +
        "/api/v1/docentes/actualizacion/cambio-centro?nsolicitud=131&actualizacion=1" ,
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
      })
      .catch((err) => {
        console.error(err);

        alert("Error");
      });
    console.log("Cambio de Carrera");
  };

  return (
    <>
      {!s && <></>}

      {s && (
        <>
          <div className="headerSolicitud">
            <Row >
              <Button className="atras-sol" onClick={handleTSolicitudes}>
                <FontAwesomeIcon icon={faX} />
              </Button>
            </Row>
          </div>
          <div className="slideBar">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="clase">
                <Form.Label>Centro Deseado</Form.Label>
                <Form.Control
                  as="select"
                  name="clase"
                  value={cancelacion.clase}
                >
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Historia">Historia</option>
                  <option value="Ciencias">Ciencias</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="justificacion">
                <Form.Label>Justificación</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="justificacion"
                  value={cancelacion.justificacion}
                />
              </Form.Group>

              <Row
                className="justify-content-center"
                style={{ padding: "10px" }}
              >
                <Button
                  className="btn-seccionesNoMargin"
                  type="submit"
                  onClick={handleEstadoA}
                >
                  Aprobar
                </Button>

                <Button
                  className="btn-secciones-danger"
                  type="submit"
                  onClick={handleEstadoD}
                >
                  Desaprobar
                </Button>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

//Renderizar Solicitudes
const STodo = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    fetch(apiurl + "")
      .then((response) => response.json())
      .then((data) => {
        setCentros(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="headerSolicitud">
        <Row></Row>
      </div>
      <div className="slideBar">
        {/**Aqui se realizará la visualizacion de todas las solicitudes */}
      </div>
    </>
  );
};

//---------------------------------------------Componente Principal-------------------------------------
const CoordSolicitudes = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const handleOpcionSChange = (os) => {
    setOpcionSeleccionada(os);
  };
  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
      <Container className="containerP">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Solicitudes
            </h2>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="separator-line">
            <Row>
              <div
                onClick={() => handleOpcionSChange("CCA")}
                className={`${
                  opcionSeleccionada === "CCA"
                    ? "opcion-seleccionadaSol"
                    : "opciones-solicitudes"
                } cursor-pointer`}
              >
                Cambio de Carrera
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("CE")}
                className={`${
                  opcionSeleccionada === "CE"
                    ? "opcion-seleccionadaSol"
                    : "opciones-solicitudes"
                } cursor-pointer`}
              >
                Cancelaciones Exepcionales
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("CCE")}
                className={`${
                  opcionSeleccionada === "CCE"
                    ? "opcion-seleccionadaSol"
                    : "opciones-solicitudes"
                } cursor-pointer`}
              >
                Cambio de Centro
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("Todo")}
                className={`${
                  opcionSeleccionada === "Todo"
                    ? "opcion-seleccionadaSol"
                    : "opciones-solicitudes"
                } cursor-pointer`}
              >
                Solicitudes Realizadas
              </div>
            </Row>
          </Col>

          <Col md={8}>
            {opcionSeleccionada === "CCA" && <SCambioCarrera />}
            {opcionSeleccionada === "CE" && <SCancelacionExc />}
            {opcionSeleccionada === "CCE" && <SCambioCentro />}
            {opcionSeleccionada === "Todo" && <STodo />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CoordSolicitudes;
