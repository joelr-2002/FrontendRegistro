import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const InscripcionComponent = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [carreraPrincipal, setCarreraPrincipal] = useState('');
  const [carreraSecundaria, setCarreraSecundaria] = useState('');
  const [identidad, setIdentidad] = useState('');
  const [fotoCertificado, setFotoCertificado] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [centroRegional, setCentroRegional] = useState('');
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    // Simulando una llamada a una API para obtener las carreras disponibles
    fetch('https://api.example.com/carreras')
      .then(response => response.json())
      .then(data => {
        setCarreras(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la API
    // y manejar la respuesta (por ejemplo, mostrar un mensaje de éxito)
  };

  return (
    <div className="inscripcion-container text-center">
      <h2 style={{ fontFamily: 'Heebo', fontWeight: 700 }}>Formulario de Inscripción</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formCarreraPrincipal">
              <Form.Label>Carrera Principal</Form.Label>
              <Form.Control as="select" value={carreraSecundaria} onChange={(e) => setCarreraSecundaria(e.target.value)}>
                <option value="">Seleccione una carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.nombre}>{carrera.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formCarreraSecundaria">
              <Form.Label>Carrera Secundaria</Form.Label>
              <Form.Control as="select" value={carreraSecundaria} onChange={(e) => setCarreraSecundaria(e.target.value)}>
                <option value="">Seleccione una carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.nombre}>{carrera.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Form.Group controlId="formIdentidad">
              <Form.Label>Identidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su número de identidad"
                value={identidad}
                onChange={(e) => setIdentidad(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Form.Group controlId="formFotoCertificado">
              <Form.Label>Foto de Certificado de Secundaria</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const validExtensions = ['png', 'jpeg'];
                  const fileExtension = file.name.split('.').pop().toLowerCase();
                  if (!validExtensions.includes(fileExtension)) {
                    alert('Solo se permiten archivos con extensión .png o .jpeg');
                    e.target.value = null;
                    return;
                  }
                  setFotoCertificado(file);
                }}
              />
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
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo Personal</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo personal"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Form.Group controlId="formCentroRegional">
              <Form.Label>Centro Regional</Form.Label>
              <Form.Control as="select" value={centroRegional} onChange={(e) => setCentroRegional(e.target.value)}>
                <option value="">Seleccione un centro regional</option>
                <option value="UNAH CU">UNAH CU</option>
                <option value="UNAH VS">UNAH VS</option>
                <option value="UNAH CURLA">UNAH CURLA</option>
                <option value="UNAH CURLP">UNAH CURLP</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Enviar Inscripción
        </Button>
      </Form>
    </div>
  );
};

export default InscripcionComponent;
