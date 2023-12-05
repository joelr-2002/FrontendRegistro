import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavbarComponente from "./NavbarComponente";
import apiurl from "../utils/apiurl";
import Atras from "./utils/Regresar.jsx";
const InscripcionAspirantes = () => {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [carreraPrincipal, setCarreraPrincipal] = useState("");
  const [carreraSecundaria, setCarreraSecundaria] = useState("");
  const [identidad, setIdentidad] = useState("");
  const [fotoCertificado, setFotoCertificado] = useState(null);
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [direccion, setDireccion] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [isFormularioValido, setIsFormularioValido] = useState(false);

  const [centros, setCentros] = useState([]);
  useEffect(() => {
    fetch(apiurl + "/api/v1/centros")
      .then((response) => response.json())
      .then((data) => {
        setCentros(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [carreras, setCarreras] = useState([]);
  const obtenerCarrerasCentro = (e) => {
    const ID = e;
    console.log(ID)
    setCentroRegional(ID);
    fetch(apiurl + "/api/v1/carreras/?idCentro=" + ID)
      .then((response) => response.json())
      .then((data) => {
        setCarreras(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const [errores, setErrores] = useState({
    primerNombre: "",
    primerApellido: "",
    carreraPrincipal: "",
    carreraSecundaria: "",
    identidad: "",
    fotoCertificado: "",
    telefono: "",
    correo: "",
    centroRegional: "",
    direccion: "",
  });

  const validarPrimerNombre = () => {
    if (!primerNombre) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        primerNombre: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        primerNombre: "",
      }));
    }
  };

  const validarPrimerApellido = () => {
    if (!primerApellido) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        primerApellido: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        primerApellido: "",
      }));
    }
  };

  const validarCarreraPrincipal = () => {
    if (!carreraPrincipal) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        carreraPrincipal: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        carreraPrincipal: "",
      }));
    }
  };

  const validarCarreraSecundaria = () => {
    if (!carreraSecundaria) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        carreraSecundaria: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        carreraSecundaria: "",
      }));
    }
  };

  const validarIdentidad = () => {
    if (!identidad) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        identidad: "Este campo es obligatorio",
      }));
    } else {
      if (identidad.length !== 13) {
        setErrores((prevErrores) => ({
          ...prevErrores,
          identidad: "El número de identidad debe contener 13 dígitos",
        }));
      } else {
        setErrores((prevErrores) => ({
          ...prevErrores,
          identidad: "",
        }));
      }
    }
  };

  const validarFotoCertificado = () => {
    if (!fotoCertificado) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        fotoCertificado: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        fotoCertificado: "",
      }));
    }
  };

  const validarTelefono = () => {
    if (!telefono) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        telefono: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        telefono: "",
      }));
    }
  };

  const validarCorreo = () => {
    if (!correo) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        correo: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        correo: "",
      }));
    }
  };

  const validarCentroRegional = () => {
    if (!centroRegional) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        centroRegional: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        centroRegional: "",
      }));
    }
  };

  const validarDireccion = () => {
    if (!direccion) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        direccion: "Este campo es obligatorio",
      }));
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        direccion: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validarPrimerNombre();
    validarPrimerApellido();
    validarCarreraPrincipal();
    validarCarreraSecundaria();
    validarIdentidad();
    validarFotoCertificado();
    validarTelefono();
    validarCorreo();
    validarCentroRegional();
    validarDireccion();

    setFormularioEnviado(true);

    if (isFormularioValido) {
      console.log("Formulario válido");
      const formData = new FormData();
      formData.append("dni", identidad);
      formData.append("primer_nombre", primerNombre);
      formData.append("segundo_nombre", segundoNombre);
      formData.append("primer_apellido", primerApellido);
      formData.append("segundo_apellido", segundoApellido);
      formData.append("telefono", telefono);
      formData.append("direccion", direccion);
      formData.append("correo_electronico", correo);
      formData.append("carrera_principal_id", carreraPrincipal);
      formData.append("carrera_secundaria_id", carreraSecundaria);
      formData.append("centro_id", centroRegional);
      formData.append("foto_certificado", fotoCertificado);

      fetch(apiurl + "/api/v1/aspirantes", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.mensaje === "Aspirante creado con éxito!.") {
            alert("Se ha enviado su solicitud de inscripción exitosamente.");
            window.location.href = "/";
          } else {
            alert(
              "Ha ocurrido un error al enviar su solicitud de inscripción."
            );
            console.log(data.error);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (formularioEnviado) {
      if (
        errores.primerNombre === "" &&
        errores.segundoNombre === "" &&
        errores.primerApellido === "" &&
        errores.segundoApellido === "" &&
        errores.carreraPrincipal === "" &&
        errores.carreraSecundaria === "" &&
        errores.identidad === "" &&
        errores.fotoCertificado === "" &&
        errores.telefono === "" &&
        errores.correo === "" &&
        errores.centroRegional === "" &&
        errores.direccion === ""
      ) {
        setIsFormularioValido(true);
      } else {
        console.log("Formulario inválido");
        setIsFormularioValido(false);
      }
    }
  }, [formularioEnviado, errores]);

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
      <NavbarComponente />
      <div
        className="inscripcion-container text-center"
        style={{ position: "relative" }}
      >
        <Atras />
        <div className="my-3 d-flex justify-content-center">
          <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
            Formulario de Inscripción
          </h2>
        </div>

        <Form>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="forPrimerNombre">
                <Form.Label>Primer Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={primerNombre}
                  onChange={(e) => {
                    setPrimerNombre(e.target.value);
                  }}
                  isInvalid={errores.primerNombre !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.primerNombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formSegundoNombre">
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su segundo nombre"
                  value={segundoNombre}
                  onChange={(e) => {
                    setSegundoNombre(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formPrimerApellido">
                <Form.Label>Primer Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su primer apellido"
                  value={primerApellido}
                  onChange={(e) => {
                    setPrimerApellido(e.target.value);
                  }}
                  isInvalid={errores.primerApellido !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.primerApellido}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formSegundoApellido">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su segundo apellido"
                  value={segundoApellido}
                  onChange={(e) => {
                    setSegundoApellido(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Form.Group controlId="formCentroRegional">
                <Form.Label>Centro Regional</Form.Label>
                <Form.Control
                  as="select"
                  value={centroRegional}
                  onChange={(e) => {
                    setCentroRegional(e.target.value);
                    obtenerCarrerasCentro(e.target.value);
                  }}
                  isInvalid={errores.centroRegional !== ""}
                >
                  <option value="" disabled={centroRegional !== ""}>
                    Seleccione un centro regional
                  </option>
                  {centros.map((centro) => (
                    <option key={centro.ID} value={centro.ID}>
                      {centro.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *{errores.centroRegional}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row
            hidden={
              centroRegional === "" ||
              centroRegional === "Seleccione un centro regional"
            }
          >
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formCarreraPrincipal">
                <Form.Label>Carrera Principal</Form.Label>
                <Form.Control
                  as="select"
                  value={carreraPrincipal}
                  onChange={(e) => {
                    setCarreraPrincipal(e.target.value);
                  }}
                  isInvalid={errores.carreraPrincipal !== ""}
                >
                  <option value="" disabled={carreraPrincipal !== ""}>
                    Seleccione una carrera
                  </option>
                  {carreras.map((carrera) => (
                    <option key={carrera.ID} value={carrera.ID}>
                      {carrera.NOM_CARRERA}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *{errores.carreraPrincipal}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formCarreraSecundaria">
                <Form.Label>Carrera Secundaria</Form.Label>
                <Form.Control
                  as="select"
                  value={carreraSecundaria}
                  onChange={(e) => {
                    setCarreraSecundaria(e.target.value);
                  }}
                  isInvalid={errores.carreraSecundaria !== ""}
                >
                  <option value="" disabled={carreraSecundaria !== ""}>
                    Seleccione una carrera
                  </option>
                  {carreras.map((carrera) => (
                    <option key={carrera.ID} value={carrera.ID}>
                      {carrera.NOM_CARRERA}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *{errores.carreraSecundaria}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col className="col-12">
              <Form.Group controlId="formIdentidad">
                <Form.Label>Identidad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su número de identidad"
                  value={identidad}
                  onChange={(e) => {
                    setIdentidad(e.target.value);
                  }}
                  isInvalid={errores.identidad !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.identidad}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formFotoCertificado">
                <Form.Label>Foto de Certificado de Secundaria</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg"
                  isInvalid={errores.fotoCertificado !== ""}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const validExtensions = ["png", "jpeg"];
                    const fileExtension = file.name
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (!validExtensions.includes(fileExtension)) {
                      alert(
                        "Solo se permiten archivos con extensión .png o .jpeg"
                      );
                      e.target.value = null;
                      return;
                    }
                    setFotoCertificado(file);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.fotoCertificado}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su dirección"
                  value={direccion}
                  onChange={(e) => {
                    setDireccion(e.target.value);
                  }}
                  isInvalid={errores.direccion !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.direccion}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su número de teléfono"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  isInvalid={errores.telefono !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.telefono}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo Personal</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo personal"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                  }}
                  isInvalid={errores.correo !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  *{errores.correo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="btn-seccionesNoMargin"
            type="submit"
            onClick={handleSubmit}
          >
            Enviar Inscripción
          </Button>
        </Form>
      </div>
    </>
  );
};

export default InscripcionAspirantes;
