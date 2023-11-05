import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import '../Styles/index.css'

const CreacionDocente = () => {
  const [nombre, setNombre] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [centroRegional, setCentroRegional] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la API
    // y manejar la respuesta (por ejemplo, mostrar un mensaje de éxito)
  };
  <style>
        {`
                    body {
                        background-color: #99d8dd;
                    }
                `}
      </style>

  return (
    <div className="containerP text-center">
      <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
        Datos del Docente
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row style={{margin:"20px"}}>
          <Col>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Docente"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col >
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
                  setFotoUsuario(file);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={{margin:"20px"}}>
          <Col className="col-6">
            <Form.Group controlId="formCentroRegional">
              <Form.Label>Centro Regional</Form.Label>
              <Form.Control
                as="select"
                value={centroRegional}
                onChange={(e) => setCentroRegional(e.target.value)}
              >
                <option value="">Seleccione un centro regional</option>
                <option value="UNAH CU">UNAH CU</option>
                <option value="UNAH VS">UNAH VS</option>
                <option value="UNAH CURLA">UNAH CURLA</option>
                <option value="UNAH CURLP">UNAH CURLP</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{width:"200px"}}>
          Crear Usuario
        </Button>
      </Form>
    </div>
  );
};

export default CreacionDocente;
