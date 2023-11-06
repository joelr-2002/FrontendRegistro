import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NavbarLoggedInComponent from './NavbarLoggedComponente';

const CancelacionExcepcional = () => {
  const [cancelacion, setCancelacion] = useState({
    clase: '',
    justificacion: '',
    archivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCancelacion({
      ...cancelacion,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Evita que se suban archivos que no sean PDF
    if (!file.name.endsWith('.pdf')) {
      alert('Solo se permiten archivos PDF');
      e.target.value = null;
    }else{
      setCancelacion({
        ...cancelacion,
        archivo: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con la cancelación, como enviarla a un servidor.
    console.log('Cancelación:', cancelacion);
  };

  return (
    <>
    <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png"> </NavbarLoggedInComponent>
    <Container className="containerP">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="clase">
          <Form.Label>Clase a Cancelar</Form.Label>
          <Form.Control
            as="select"
            name="clase"
            value={cancelacion.clase}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="archivo">
          <Form.Label>Comprobante</Form.Label>
          <Form.Control
            type="file"
            name="archivo"
            accept=".pdf"
            onChange={handleFileUpload}
          />
        </Form.Group>

        <div className="row">
          <div className='col-md-6'>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
          <div className='col-md-6'>
            <Button href='/estudiantes' variant="secondary" type="submit">
              Regresar
            </Button>
          </div>
        </div>
        
      </Form>
    </Container>
    </>
  );
};

export default CancelacionExcepcional;
