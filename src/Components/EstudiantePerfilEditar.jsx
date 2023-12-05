import React, { useState, useEffect, useRef } from "react";
import NavbarLoggedComponente from "./NavbarLoggedComponente";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../Styles/index.css";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";
import { Link } from "react-router-dom";

const EstudiantePerfilEditar = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [nCuenta, setNCuenta] = useState("");
  const [centro, setCentro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState([]);
  const fileInputRef = useRef(null);
  const [cambios, setCambios] = useState(false);

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    if(descripcion===""){
      setCambios(false);
    }else{
      setCambios(true);
    }
    validarCambios();
  };

  const validarCambios = () => {
    
    if(descripcion===null){
      setCambios(false);
    }else{
      setCambios(true);
    }

    if(fotos===null){
      setCambios(false);
    }else{
      setCambios(true)
    }
    
    
    
  };

  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);

  const ImagenesSeleccionadas = ({ imagenes, onOrdenar, onEliminar }) => {
    return (
      <Col md={6}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            padding: "20px",
          }}
        >
          {imagenes.map((imagen, index) => (
            <div key={index} style={{ marginRight: "10px" }}>
              <img
                src={URL.createObjectURL(imagen)}
                alt={`Imagen ${index + 1}`}
                style={{ width: "100px", height: "100px" }}
              />

              <Button
                onClick={() => onEliminar(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      </Col>
    );
  };

  const handleFotoChange = (e) => {
    setCambios(true);
    const files = e.target.files;

    if (files.length >= 3 || fotos.length >= 3) {
      alert("Solo se permiten hasta 3 fotos");
      return;
    }

    const fotosActuales = [...fotos];

    const nuevasFotos = Array.from(files);
    setFotos([...fotosActuales, ...nuevasFotos]);
    setArchivosSeleccionados(files.length + fotos.length);
  };

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/perfil", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.perfil[0].NOMBRE_ALUMNO);
        setCarrera(data.perfil[0].CARRERA);
        setNCuenta(data.perfil[0].N_CUENTA);
        setCentro(data.perfil[0].CENTRO);
        /*
        if(data.fotos!==null){
          setFotos(data.fotos)
        }
*/
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fotos) {
      const formData = new FormData();
      fotos.forEach((imagen, index) => {
        formData.append("foto_perfil", imagen);
      });

      fetch(apiurl + "/api/v1/estudiante/subir-foto-perfil", {
        method: "POST",
        body: formData,
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         alert(data.mensaje)
         window.location.href = "/estudiantes/perfil";
        })
        .catch((error) => {
          console.error("Error de red:", error);
          window.location.href = "/estudiantes/perfil";
        });
    }

    if (descripcion) {
      fetch(
        apiurl +
          "/api/v1/estudiante/agregar-descripcion?descripcion=" +
          descripcion,
        {
          method: "POST",
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensaje);
        })
        .catch((err) => {
          console.error(err);
          alert("Formulario no enviado. Error: " + err.message);
          
        });
    }

    
  };

  const handleOrdenar = (index) => {
    console.log(`Ordenar imagen ${index}`);
  };

  const handleEliminar = (index) => {
    
    const nuevasFotos = [...fotos];
    nuevasFotos.splice(index, 1);
    setFotos(nuevasFotos);
    setArchivosSeleccionados(nuevasFotos.length);

    const fileInput = document.getElementById("formFotos");
    if (fileInput) {
      fileInput.value = "";
    }
    validarCambios();
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
      <NavbarLoggedComponente urlLogo="../../assets/unah_logo.png"></NavbarLoggedComponente>
      <Container className="containerP">
        <Link to="/estudiantes/menu" style={{textDecoration: "none"}}>  <Atras /></Link>
       
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Perfil{" "}
            </h2>
          </Col>
        </Row>

        <Form>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={nombre} disabled />
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formNumeroCuenta">
                <Form.Label>Número de Cuenta</Form.Label>
                <Form.Control type="text" value={nCuenta} readOnly disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formCorreo">
                <Form.Label>Centro</Form.Label>
                <Form.Control type="text" value={centro} disabled />
              </Form.Group>
            </Col>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formNumeroCuenta">
                <Form.Label>Carrera</Form.Label>
                <Form.Control type="text" value={carrera} readOnly disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  placeholder="Escribe algo sobre ti"
                  value={descripcion}
                  onChange={handleDescripcionChange}
                />
              </Form.Group>
            </Col>
            <br></br>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFotos">
                <Form.Label>Foto de Perfil</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={(e) => {
                    const nuevosArchivos = Array.from(e.target.files);
                    const validExtensions = ["png", "jpeg"];

                    nuevosArchivos.forEach((file) => {
                      const fileExtension = file.name
                        .split(".")
                        .pop()
                        .toLowerCase();

                      if (!validExtensions.includes(fileExtension)) {
                        alert(
                          "Solo se permiten archivos con extensión .png o .jpeg"
                        );
                        return;
                      }
                    });

                    setArchivosSeleccionados(nuevosArchivos);
                    handleFotoChange(e);
                  }}
                  ref={fileInputRef}
                />
              </Form.Group>

              {archivosSeleccionados.length > 0 && (
                <div>
                  <p>Archivos seleccionados:</p>
                  <ul>
                    {archivosSeleccionados.map((file) => (
                      <li key={file.name}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Col>

            <ImagenesSeleccionadas
              imagenes={fotos}
              onEliminar={handleEliminar}
            />
          </Row>
        </Form>
        <Row className="mt-3 jcc">
          <Button className="btn-seccionesNoMargin" onClick={handleSubmit} disabled={cambios===false}>
            Guardar Cambios
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default EstudiantePerfilEditar;
