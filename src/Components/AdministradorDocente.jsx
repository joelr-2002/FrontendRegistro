import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import "../Styles/index.css";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

const CreacionDocente = () => {
  const [dni, setDNI] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correoE, setCorreoE] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [vContrasenia, setVContrasenia] = useState("");
  const [fotoEmpleado, setFotoEmpleado] = useState(null);
  const [rolID, setRolID] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [carrera, setCarrera] = useState("");
  const [telefono, setTelefono] = useState("");

  const [dniError, setDNIError] = useState(null);
  const [primerNombreError, setPrimerNombreError] = useState(null);
  const [segundoNombreError, setSegundoNombreError] = useState(null);
  const [primerApellidoError, setPrimerApellidoError] = useState(null);
  const [segundoApellidoError, setSegundoApellidoError] = useState(null);
  const [direccionError, setDireccionError] = useState(null);
  const [correoError, setCorreoError] = useState(null);
  const [contraseniaError, setContraseniaError] = useState(null);
  const [vContraseniaError, setVContraseniaError] = useState(null);
  const [fotoPerfilError, setFotoPerfilError] = useState(null);
  const [rolIDError, setRolIDError] = useState(null);
  const [centroRegionalError, setCentroRegionalError] = useState(null);
  const [carreraError, setCarreraError] = useState(null);
  const [telefonoError, setTelefonoError] = useState(null);

  const [crearDocenteError, setCrearDocenteError] = useState(true);
  const [contraseniaPatternError, setContraseniaPatternError] = useState(false);

  //Validaciones

  const validarContrasenia = (contrasenia) => {
    const pattern = /^[a-zA-Z0-9]{8,40}$/;
    return pattern.test(contrasenia);
  };

  const validateForm = () => {
    if (!dni || dni.length !== 13) {
      setDNIError(true);
    }
    if (!primerNombre) {
      setPrimerNombreError(true);
    }
    if (!primerApellido) {
      setPrimerApellidoError(true);
    }
    if (!segundoApellido) {
      setSegundoApellidoError(true);
    }
    if (!direccion) {
      setDireccionError(true);
    }
    if (!correoE) {
      setCorreoError(true);
    }
    if (!contrasenia) {
      setContraseniaError(true);
    }
    if (!vContrasenia) {
      setVContraseniaError(true);
    }
    if (!fotoEmpleado) {
      setFotoPerfilError(true);
    }
    if (!rolID) {
      setRolIDError(true);
    }
    if (!centroRegional) {
      setCentroRegionalError(true);
    }
    if (!carrera) {
      setCarreraError(true);
    }
    if (!telefono) {
      setTelefonoError(true);
    }

    setCrearDocenteError(
      !dni ||
        dni.length !== 13 ||
        !primerNombre ||
        !primerApellido ||
        !segundoApellido ||
        !direccion ||
        !correoE ||
        !contrasenia ||
        !vContrasenia ||
        !fotoEmpleado ||
        !rolID ||
        !centroRegional ||
        !carrera ||
        !telefono
    );
    if(crearDocenteError===true){
      alert("Hay campos vacíos en el formulario");
      return;

    }
    if (!validarContrasenia(contrasenia)) {
      setContraseniaPatternError(true);
      setVContrasenia("");
      alert("La contraseña debe contener minusculas, mayusculas, un numero y con un minimo de 8 caracteres");
      return;
    } else {
      setContraseniaPatternError(false);
    }
    if (contrasenia !== vContrasenia) {
      setCrearDocenteError(true);
      alert("Las contraseñas deben ser iguales");
      setVContrasenia("");
      return;
    }
  };

  const resetearErrores = () => {
    setDNIError(false);
    setPrimerNombreError(false);
    setSegundoNombreError(false);
    setPrimerApellidoError(false);
    setSegundoApellidoError(false);
    setDireccionError(false);
    setCorreoError(false);
    setContraseniaError(false);
    setVContraseniaError(false);
    setFotoPerfilError(false);
    setRolIDError(false);
    setCentroRegionalError(false);
    setCarreraError(false);
    setTelefonoError(false);
  };

  //fetch para obtener los centros regionales
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

  //fetch para obtener las carreras segun centro regional
  const [carreras, setCarreras] = useState([]);

  const obtenerCarrerasCentro = (e) => {
    const ID = e.target.value;
    setCentroRegional(ID);
    fetch(apiurl + "/api/v1/carreras/?idCentro=" + ID)
      .then((response) => response.json())
      .then((data) => {
        setCarreras(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm();

    if (!crearDocenteError&&contraseniaPatternError!==true) {
      const formData = new FormData();
      formData.append("dni", dni);
      formData.append("primer_nombre", primerNombre);
      formData.append("segundo_nombre", segundoNombre);
      formData.append("primer_apellido", primerApellido);
      formData.append("segundo_apellido", segundoApellido);
      formData.append("direccion", direccion);
      formData.append("correo_electronico", correoE);
      formData.append("rol_id", rolID);
      formData.append("carrera", carrera);
      formData.append("telefono", telefono);
      formData.append("contrasenia", contrasenia);
      formData.append("foto_empleado", fotoEmpleado);

      fetch(apiurl + "/api/v1/docentes", {
        method: "POST",
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          alert(data.mensaje);
          resetearErrores();
          window.location.href = "/administrador/creacion-docente";
        })
        .catch((err) => {
          console.error(err);
          alert("Formulario no enviado ");
        });
    }
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
        <Atras />
        <h2 className="titulos">Datos del Docente</h2>
        <Form onSubmit={handleSubmit}>
          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formDNI">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="DNI"
                  value={dni}
                  onChange={(e) => setDNI(e.target.value)}
                  isValid={dni !== "" && dni.length === 13}
                  isInvalid={dniError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio y debe de ser un DNI válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formRolID">
                <Form.Label>Rol del Empleado</Form.Label>
                <Form.Control
                  as="select"
                  value={rolID}
                  onChange={(e) => setRolID(e.target.value)}
                  isValid={rolID !== ""}
                  isInvalid={rolIDError === true}
                >
                  <option value="">Seleccione un rol</option>
                  <option value={"1"}>Docente</option>
                  <option value={"2"}>Jefe de Departamento</option>
                  <option value={"3"}>Coordinador Académico</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formPrimerNombre">
                <Form.Label>Primer Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Primer nombre del Docente"
                  value={primerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  isValid={primerNombre !== ""}
                  isInvalid={primerNombreError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSegundoNombre">
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Segundo nombre del Docente"
                  value={segundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                  isValid={segundoNombre !== ""}
                  isInvalid={segundoNombreError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formPrimerApellido">
                <Form.Label>Primer Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Primer apellido del Docente"
                  value={primerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  isValid={primerApellido !== ""}
                  isInvalid={primerApellidoError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSegundoApellido">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Segundo apellido del Docente"
                  value={segundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                  isValid={segundoApellido !== ""}
                  isInvalid={segundoApellidoError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  isValid={direccion !== ""}
                  isInvalid={direccionError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Correo Electrónico"
                  value={correoE}
                  onChange={(e) => setCorreoE(e.target.value)}
                  isValid={correoE !== ""}
                  isInvalid={correoError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formContrasenia">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  isValid={contrasenia !== "" && !contraseniaPatternError}
                  isInvalid={
                    contraseniaError === true || contraseniaPatternError
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {contraseniaPatternError
                    ? "La contraseña debe tener un formato válido."
                    : "*Este campo es obligatorio"}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formVContrasenia">
                <Form.Label>Verificar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Validar Contraseña"
                  value={vContrasenia}
                  onChange={(e) => setVContrasenia(e.target.value)}
                  isValid={vContraseniaError === false}
                  isInvalid={contraseniaError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ margin: "20px" }}>
            <Col>
              <Form.Group controlId="formFotoCertificado">
                <Form.Label>Foto de Perfil</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg"
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
                    setFotoEmpleado(file);
                    console.log(file);
                  }}
                  isValid={fotoEmpleado !== null}
                  isInvalid={fotoPerfilError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6">
              <Form.Group controlId="formCentroRegional">
                <Form.Label>Centro Regional</Form.Label>
                <Form.Control
                  as="select"
                  value={centroRegional}
                  onChange={(e) => {
                    setCentroRegional(e.target.value);
                    obtenerCarrerasCentro(e);
                  }}
                  isValid={centroRegional !== ""}
                  isInvalid={centroRegionalError === true}
                >
                  <option value="">Seleccione un centro regional</option>
                  {centros.map((centro) => (
                    <option key={centro.ID} value={centro.ID}>
                      {centro.NOMBRE}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ margin: "20px" }}>
            <Col className="col-6">
              <Form.Group controlId="formCarrera">
                <Form.Label>Carrera</Form.Label>
                <Form.Control
                  as="select"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  isValid={carrera !== ""}
                  isInvalid={carreraError === true}
                >
                  <option value="">Seleccione una carrera</option>
                  {carreras.map((carrera) => (
                    <option key={carrera.ID} value={carrera.ID}>
                      {carrera.NOM_CARRERA}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  isValid={telefono !== ""}
                  isInvalid={telefonoError === true}
                />
                <Form.Control.Feedback type="invalid">
                  *Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="btn-seccionesNoMargin"
            type="submit"
            style={{ width: "200px" }}
            onClick={handleSubmit}
            
          >
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreacionDocente;
