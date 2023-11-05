import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../Styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavbarComponente from './NavbarComponente';
 

var carreras = [{
  "id": 1,
  "nombre": "Ingeniería en Sistemas"
},
{
  "id": 2,
  "nombre": "Ingeniería Civil"
}
];

/**
 * Componente para registrar nuevos aspirantes.
 * @returns {JSX.Element} Componente InscripcionAspirantes.
 */
const InscripcionAspirantes = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [carreraPrincipal, setCarreraPrincipal] = useState('');
  const [carreraSecundaria, setCarreraSecundaria] = useState('');
  const [identidad, setIdentidad] = useState('');
  const [fotoCertificado, setFotoCertificado] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [centroRegional, setCentroRegional] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [apellidosError, setApellidosError] = useState(false);
  const [carreraPrincipalError, setCarreraPrincipalError] = useState(false);
  const [identidadError, setIdentidadError] = useState(false);
  const [fotoCertificadoError, setFotoCertificadoError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [centroRegionalError, setCentroRegionalError] = useState(false);

  /**
   * Función que se ejecuta al enviar el formulario.
   * Verifica si algún campo está vacío y muestra un mensaje de error si es necesario.
   * Si no hay campos vacíos, envía el formulario y redirecciona a la página de inicio.
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    if (nombre === '') {
      setNombreError(true);
    } else {
      setNombreError(false);
    }
    if (apellidos === '') {
      setApellidosError(true);
    } else {
      setApellidosError(false);
    }
    if (carreraPrincipal === '') {
      setCarreraPrincipalError(true);
    } else {
      setCarreraPrincipalError(false);
    }
    if (identidad === '') {
      setIdentidadError(true);
    } else {
      setIdentidadError(false);
    }
    if (fotoCertificado === null) {
      setFotoCertificadoError(true);
    }else {
      setFotoCertificadoError(false);
    }
    if (telefono === '') {
      setTelefonoError(true);
    } else {
      setTelefonoError(false);
    }
    if (correo === '') {
      setCorreoError(true);
    } else {
      setCorreoError(false);
    }
    if (centroRegional === '') {
      setCentroRegionalError(true);
    } else {
      setCentroRegionalError(false);
    }

    // Si hay campos vacíos no se envía el formulario
    if (nombreError || apellidosError || carreraPrincipalError || identidadError || fotoCertificadoError || telefonoError || correoError || centroRegionalError) {
      //Proceder a enviar el formulario
      alert('Formulario enviado correctamente');
      //redireccionar a la pagina de inicio
      window.location.href = '/';
    }
    else {
      //evita que se envie el formulario
      console.log('Formulario no enviado');
      e.preventDefault();
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
      <NavbarComponente />
      <div className="inscripcion-container text-center" style={{ position: 'relative' }}>
        <a href="/">
          <FontAwesomeIcon icon={faArrowLeft} id='mr-2' className="mr-2" size="2rem" style={{ position: 'absolute', top: '25px', left: '40px' }} />
        </a>
        <h2 style={{ fontFamily: 'Heebo', fontWeight: 700 }}>
            Formulario de Inscripción
        </h2>
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
                  isInvalid={nombreError} 
                />
                <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
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
                  isInvalid={apellidosError} 
                />
                <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <Form.Group controlId="formCarreraPrincipal">
                <Form.Label>Carrera Principal</Form.Label>
                <Form.Control as="select" value={carreraPrincipal} onChange={(e) => setCarreraPrincipal(e.target.value)} isInvalid={carreraPrincipalError}>
                      <option value="">Seleccione una carrera</option>
                      {carreras.map(carrera => (
                        <option key={carrera.id} value={carrera.nombre}>{carrera.nombre}</option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
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
                      isInvalid={identidadError} 
                    />
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
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
                      isInvalid={fotoCertificadoError}
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
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback>
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
                      isInvalid={telefonoError} 
                    />
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
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
                      isInvalid={correoError} 
                    />
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="col-12">
                  <Form.Group controlId="formCentroRegional">
                    <Form.Label>Centro Regional</Form.Label>
                    <Form.Control as="select" value={centroRegional} onChange={(e) => setCentroRegional(e.target.value)} isInvalid={centroRegionalError}>
                      <option value="">Seleccione un centro regional</option>
                      <option value="UNAH CU">UNAH CU</option>
                      <option value="UNAH VS">UNAH VS</option>
                      <option value="UNAH CURLA">UNAH CURLA</option>
                      <option value="UNAH CURLP">UNAH CURLP</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Enviar Inscripción
              </Button>
            </Form>
          </div>
        </>
  );
};


export default InscripcionAspirantes;
