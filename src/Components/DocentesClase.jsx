import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const DocentesClase = () => {
  const { ID } = useParams();
  const [clase, setClase] = useState([]);

  useEffect(() => {
    fetch(apiurl + `/api/v1/docentes/secciones`, {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const clases = data.data;
        const claseSeleccionada = clases.find(
          (clase) => clase.ID_SECCION === ID
        );

        if (claseSeleccionada) {
          setClase(claseSeleccionada);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las clases del docente:", error);
      });
  }, []);

  useEffect(() => {
    Cookies.set("idSeccion", ID);
  }, [ID]);

  const [videoInfo, setVideoInfo] = useState({
    url: "",
    fileName: "",
  });

  const [urlVid, setURLVid] = useState([]);

  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/perfil-docente/?seccion=" + ID, {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setURLVid(data.data[0].VIDEO);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDescargarLista = () => {
    fetch(apiurl + "/api/v1/docentes/descargar-estudiantes/?seccionID=" + ID, {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "Lista_" +
            clase.NOMBRE_ASIGNATURA +
            "_" +
            clase.NOMBRE_SECCION +
            ".xlsx"
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("", error);
      });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoInfo({
        url: videoURL,
        fileName: file.name,
      });
    }
  };

  const handleVideoDelete = () => {
    setVideoInfo({
      url: "",
      fileName: "",
    });

    // Limpiar el campo de entrada de archivos
    const fileInput = document.getElementById("videoUpload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("videoUpload");
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Seleccione un archivo de video antes de subirlo.");
      return;
    }

    const formData = new FormData();
    formData.append("video", fileInput.files[0]);
    fetch(apiurl + "/api/v1/docentes/subir-video/?seccion=" + ID, {
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
        window.location.href = "/docente/clase/" + ID;
      })
      .catch((err) => {
        console.error(err);
        alert("Error al subir el video.");
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP menu-container">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              {clase.NOMBRE_ASIGNATURA}-{clase.NOMBRE_SECCION}
            </h2>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              className="btn-seccionesNoMargin"
              onClick={handleDescargarLista}
            >
              Descargar Lista
            </Button>{" "}
            <Link to="/docentes/notas" style={{ textDecoration: "none" }}>
              <Button className="btn-seccionesNoMargin">Subir Notas</Button>
            </Link>
          </Col>
        </Row>

        {urlVid && (
              <Card className="mt-4">
                <Card.Title>Video Introductorio</Card.Title>
                <Card.Body>
                  <div className="centrado" style={{display:"flex", justifyContent:"center"}}>
                    <video controls width="400" height="300">
                      <source src={urlVid} type="video/mp4" />
                     
                    </video>
                  </div>
                </Card.Body>
              </Card>
            )}

        {/* Sección para subir y visualizar videos */}
        <Row className="mt-4">
          <Col>
            <Form.Group controlId="videoUpload" className="mb-3">
              <Form.Label>Agregar o Actualizar Video</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </Form.Group>
            

            {videoInfo.url && (
              <Card>
                <Card.Body>
                  <ReactPlayer
                    url={videoInfo.url}
                    controls
                    width="100%"
                    height="auto"
                    style={{ maxWidth: "400px", margin: "0 auto" }}
                  />
                  <p>Nombre del Video: {videoInfo.fileName}</p>
                  <Button
                    className="btn-secciones-danger"
                    onClick={handleVideoDelete}
                  >
                    Eliminar Video
                  </Button>
                  <Button
                    className="btn-seccionesNoMargin"
                    onClick={handleSubmit}
                  >
                    Subir Video
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DocentesClase;
