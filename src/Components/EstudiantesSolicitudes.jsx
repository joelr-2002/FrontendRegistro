import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

//Renderizar Solicitud Cambio de Carrera
const SCambioCarrera = ({ carreraAct, centroAct, indiceAct }) => {
  const [scca, setSCCA] = useState({
    justificacion: "",
    id_carrera: "",
  });
  const [carreras, setCarreras] = useState([]);
  const [carreraErr, setCarreraErr] = useState(false);
  const [justificacionErr, setJustificacionErr] = useState(false);

  useEffect(() => {
    fetch(apiurl + "/api/v1/centros")
      .then((response) => response.json())
      .then((data) => {
        const centroEncontrado = data.data.find(
          (centros) => centros.NOMBRE === centroAct
        );
        if (centroEncontrado) {
          obtenerCarrerasCentro(centroEncontrado.ID);
        }
        console.log(data);
      })

      .catch((error) => console.log(error));
  }, []);

  const obtenerCarrerasCentro = (idC) => {
    const id = idC;
    fetch(apiurl + "/api/v1/carreras/?idCentro=" + id)
      .then((response) => response.json())
      .then((data) => {
        setCarreras(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setCarreraErr(false);
    setJustificacionErr(false);

    const { name, value } = e.target;
    setSCCA({
      ...scca,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCarreraErr(false);
    setJustificacionErr(false);

    if (scca.justificacion === "") {
      setJustificacionErr(true);
    }
    if (scca.id_carrera === "") {
      setCarreraErr(true);
    }
    if (justificacionErr === true || carreraErr === true) {
      return;
    }

    fetch(apiurl + "/api/v1/estudiante/cambio-carrera", {
      method: "POST",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scca),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        window.location.href = "/estudiantes/solicitudes";
      })
      .catch((err) => {
        console.error(err);
        alert("Formulario no enviado. Error: " + err.message);
      });

    console.log(scca);

    console.log("Cambio de Carrera");
  };

  return (
    <>
      <div className="headerSolicitud">
        <Row>
          <Col>
            <Row>
              <strong>Centro Actual: {centroAct}</strong>
            </Row>
            <Row>
              <strong>Carrera Actual: {carreraAct}</strong>
            </Row>
          </Col>

          <Col>
            <Row>
              <strong>Indice Actual: {indiceAct}</strong>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="slideBar">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clase">
            <Form.Label>Seleccione la Carrera</Form.Label>
            <Form.Control
              as="select"
              vale={scca.id_carrera}
              name="id_carrera"
              onChange={handleChange}
              isInvalid={carreraErr === true}
            >
              <option value="" disabled={scca.id_carrera !== ""}>
                Seleccione una carrera
              </option>
              {carreras.map(
                (carrera) =>
                  carrera.NOM_CARRERA !== carreraAct && (
                    <option key={carrera.ID} value={carrera.ID}>
                      {carrera.NOM_CARRERA}
                    </option>
                  )
              )}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              *Seleccione una opción
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="justificacion">
            <Form.Label>Justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="justificacion"
              value={scca.justificacion}
              onChange={handleChange}
              isInvalid={justificacionErr === true}
            />
            <Form.Control.Feedback type="invalid">
              *Campo obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-center" style={{ padding: "10px" }}>
            <Button className="btn-seccionesNoMargin" onClick={handleSubmit}>
              Enviar
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

//Renderizar Solicitud Cancelacion Excepcional

const SCancelacionExc = () => {
  const [sce, setSCE] = useState({
    justificacion: "",
    id_seccion: "",
    foto_cancelacion: null, // Cambiado a un solo archivo
  });

  const [clases, setClases] = useState([]);

  const [error, setError] = useState({
    justificacion: null,
    id_seccion: null,
    foto_cancelacion: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/matricula", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const clasesM = data.clases;
        setClases(clasesM);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setError({ ...error, id_seccion: false });
    setError({ ...error, justificacion: false });
    setError({ ...error, foto_cancelacion: false });
    const { name, value } = e.target;
    setSCE({
      ...sce,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setError({ ...error, foto_cancelacion: false });
    const archivo = e.target.files[0];

    if (!archivo) {
      setError({ ...error, foto_cancelacion: true });
      return;
    }

    const validExtensions = ["png", "jpeg"];
    const fileExtension = archivo.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError({ ...error, foto_cancelacion: true });
    } else {
      setSCE({ ...sce, foto_cancelacion: archivo });
      setError({ ...error, foto_cancelacion: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica antes de enviar al servidor
    if (sce.id_seccion === "") {
      setError({ ...error, id_seccion: true });
      console.log("si paso 2");
    }
    if (sce.justificacion === "") {
      setError({ ...error, justificacion: true });
      console.log("si paso 1");
    }

    if (!sce.foto_cancelacion) {
      setError({ ...error, foto_cancelacion: true });
    }
    console.log(error);
    if (
      sce.id_seccion === "" ||
      sce.justificacion === "" ||
      !sce.foto_cancelacion
    ) {
      return;
    } else {
      const formData = new FormData();
      formData.append("justificacion", sce.justificacion);
      formData.append("id_seccion", sce.id_seccion);
      formData.append("foto_cancelacion", sce.foto_cancelacion);

      fetch(apiurl + "/api/v1/estudiante/cancelacion-ex", {
        method: "POST",
        body: formData,
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.mensaje);
          window.location.href = "/estudiantes/solicitudes";
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });

      console.log("Cambio de Carrera", sce);
    }
  };

  return (
    <>
      <div className="headerSolicitud">
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
      <div className="slideBar">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clase">
            <Form.Label>Clase a Cancelar</Form.Label>
            <Form.Control
              as="select"
              name="id_seccion"
              value={sce.id_seccion}
              onChange={handleChange}
              isInvalid={sce.id_seccion === ""}
            >
              <option value="" disabled={sce.id_seccion !== ""}>
                Seleccione una clase
              </option>
              {clases.map((clase) => (
                <option key={clase.ID} value={clase.ID}>
                  {clase.ASIGNATURA}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              *Seleccione una Opción
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="justificacion">
            <Form.Label>Justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="justificacion"
              isInvalid={sce.justificacion === ""}
              value={sce.justificacion}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              *Campo Onbligatorio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="archivo">
            <Form.Label>Comprobante</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              ref={fileInputRef}
              isInvalid={error.foto_cancelacion === true}
            />
            <Form.Control.Feedback type="invalid">
              *Archivo Obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-center" style={{ padding: "10px" }}>
            <Button className="btn-seccionesNoMargin" type="submit">
              Enviar
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

//Renderizar Solicitud Cambio de Centro
const SCambioCentro = ({ carreraAct, centroAct }) => {
  const [scce, setSCCE] = useState({
    justificacion: "",
    id_centro: "",
  });

  const [centros, setCentros] = useState([]);
  const [centroErr, setCentroErr] = useState(false);
  const [justificacionErr, setJustificacionErr] = useState(false);

  useEffect(() => {
    fetch(apiurl + "/api/v1/centros")
      .then((response) => response.json())
      .then((data) => {
        setCentros(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setCentroErr(false);
    setJustificacionErr(false);
    const { name, value } = e.target;
    setSCCE({
      ...scce,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCentroErr(false);
    setJustificacionErr(false);

    if (scce.justificacion === "") {
      setJustificacionErr(true);
    }
    if (scce.id_centro === "") {
      setCentroErr(true);
    }
    if (justificacionErr === true || centroErr === true) {
      return;
    }
    fetch(apiurl + "/api/v1/estudiante/cambio-centro", {
      method: "POST",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scce),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        //window.location.href = "/estudiantes/solicitudes";
      })
      .catch((err) => {
        console.error(err);
        alert("Formulario no enviado. Error: " + err.message);
      });

    console.log("Cambio de Carrera");
  };
  return (
    <>
      <div className="headerSolicitud">
        <Row>
          <Col>
            <Row>
              <strong>Centro Actual: {centroAct}</strong>
            </Row>
            <Row>
              <strong>Carrera Actual:{carreraAct}</strong>
            </Row>
          </Col>

          <Col></Col>
        </Row>
      </div>
      <div className="slideBar">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clase">
            <Form.Label>Centro Deseado</Form.Label>
            <Form.Control
              as="select"
              name="id_centro"
              value={scce.id_centro}
              onChange={handleChange}
              isInvalid={centroErr === true}
            >
              <option value="" disabled={scce.id_centro !== ""}>
                Seleccione un centro
              </option>
              {centros.map(
                (centro) =>
                  centro.NOMBRE !== centroAct && (
                    <option key={centro.ID} value={centro.ID}>
                      {centro.NOMBRE}
                    </option>
                  )
              )}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              *Seleccione una Opción
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="justificacion">
            <Form.Label>Justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="justificacion"
              value={scce.justificacion}
              onChange={handleChange}
              isInvalid={justificacionErr === true}
            />
            <Form.Control.Feedback type="invalid">
              *Campo obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-center" style={{ padding: "10px" }}>
            <Button className="btn-seccionesNoMargin" onClick={handleSubmit}>
              Enviar
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

//Renderizar Solicitud Pago de Reposición
const SPagoR = () => {
  const [spr, setSPR] = useState({
    justificacion: "",
  });

  const [justificacionErr, setJustificacionErr] = useState(false);

  const handleChange = (e) => {
    justificacionErr(false);
    const { name, value } = e.target;
    setSPR({
      ...spr,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    justificacionErr(false);
    if (spr.justificacion === "") {
      justificacionErr(true);
      return;
    }
    fetch(apiurl + "/api/v1/estudiante/repo", {
      method: "POST",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spr),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensaje);
        window.location.href = "/estudiantes/solicitudes";
      })
      .catch((err) => {
        console.error(err);
        alert("Formulario no enviado. Error: " + err.message);
      });
  };
  return (
    <>
      <div className="headerSolicitud">
        <Row>
          <Col>
            <Row></Row>
            <Row></Row>
          </Col>

          <Col>
            <Row></Row>
          </Col>
        </Row>
      </div>
      <div className="slideBar">
        <Form>
          <Form.Group controlId="justificacion">
            <Form.Label>Justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="justificacion"
              value={spr.justificacion}
              onChange={handleChange}
              isInvalid={justificacionErr === true}
            />
            <Form.Control.Feedback type="invalid">
              *Campo obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-center" style={{ padding: "10px" }}>
            <Button
              className="btn-seccionesNoMargin"
              type="submit"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

//Renderizar Solicitudes
const STodo = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/obtener-solicitudes", {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSolicitudes(data.infoSolicitud);
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
        {solicitudes.map((solicitud) => (
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
        <div>
          <Row></Row>
        </div>
      </div>
    </>
  );
};

//---------------------------------------------Componente Principal-------------------------------------
const EstudiantesSolicitudes = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/historial-academico", {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDatos(data.estudiante[0]);

        console.log(datos);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOpcionSChange = (os) => {
    setOpcionSeleccionada(os);
  };
  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
      <Container className="containerP" style={{ overflow: "hidden" }}>
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
                onClick={() => handleOpcionSChange("PR")}
                className={`${
                  opcionSeleccionada === "PR"
                    ? "opcion-seleccionadaSol"
                    : "opciones-solicitudes"
                } cursor-pointer`}
              >
                Pago de Reposición
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

          <Col md={8} className="scroll-solicitud">
            {opcionSeleccionada === "CCA" && (
              <SCambioCarrera
                carreraAct={datos.CARRERA}
                centroAct={datos.CENTRO}
                indiceAct={datos.INDICE}
              />
            )}
            {opcionSeleccionada === "CE" && <SCancelacionExc />}
            {opcionSeleccionada === "CCE" && (
              <SCambioCentro
                carreraAct={datos.CARRERA}
                centroAct={datos.CENTRO}
              />
            )}
            {opcionSeleccionada === "PR" && <SPagoR />}
            {opcionSeleccionada === "Todo" && <STodo />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EstudiantesSolicitudes;
