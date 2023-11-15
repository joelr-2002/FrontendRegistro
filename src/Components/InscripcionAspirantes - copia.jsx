import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavbarComponente from './NavbarComponente';
import apiurl from '../utils/apiurl';

const InscripcionAspirantes = () => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [carreraPrincipal, setCarreraPrincipal] = useState('');
  const [carreraSecundaria, setCarreraSecundaria] = useState('');
  const [identidad, setIdentidad] = useState('');
  const [fotoCertificado, setFotoCertificado] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [centroRegional, setCentroRegional] = useState('');
  const [primerNombreError, setPrimerNombreError] = useState(false);
  const [segundoNombreError, setSegundoNombreError] = useState(false);
  const [primerApellidoError, setPrimerApellidoError] = useState(false);
  const [segundoApellidoError, setSegundoApellidoError] = useState(false);
  const [carreraPrincipalError, setCarreraPrincipalError] = useState(false);
  const [carreraSecundariaError, setCarreraSecundariaError] = useState(false);
  const [identidadError, setIdentidadError] = useState(false);
  const [fotoCertificadoError, setFotoCertificadoError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [centroRegionalError, setCentroRegionalError] = useState(false);
  const [isFormularioError, setIsFormularioError] = useState(true);

  const [centros, setCentros] = useState([]);
  useEffect(() => {
    fetch(apiurl + '/api/v1/centros')
      .then(response => response.json())
      .then(data => {
        setCentros(data.data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }, []);

  const [carreras, setCarreras] = useState([]);
  const obtenerCarrerasCentro = (e) => {
    const ID = e.target.value;
    setCentroRegional(ID);
    fetch(apiurl + '/api/v1/carreras/?idCentro=' + ID)
      .then(response => response.json())
      .then(data => {
        setCarreras(data.data);
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  const validateForm = () => {
    setPrimerNombreError(primerNombre === '');
    setSegundoNombreError(segundoNombre === '');
    setPrimerApellidoError(primerApellido === '');
    setSegundoApellidoError(segundoApellido === '');
    setCarreraPrincipalError(carreraPrincipal === '');
    setCarreraSecundariaError(carreraSecundaria === '');
    setIdentidadError(identidad === '' || identidad.length !== 13);
    setFotoCertificadoError(fotoCertificado === null);
    setTelefonoError(telefono === '');
    setCorreoError(correo === '');
    setCentroRegionalError(centroRegional === '');

    setIsFormularioError(
      primerNombre === '' ||
      segundoNombre === '' ||
      primerApellido === '' ||
      segundoApellido === '' ||
      carreraPrincipal === '' ||
      carreraSecundaria === '' ||
      identidad === '' ||
      identidad.length !== 13 ||
      fotoCertificado === null ||
      telefono === '' ||
      correo === '' ||
      centroRegional === ''
    );
  };

  const renderErrorFeedback = (error, message) => {
    return error && <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>;
  };

  const resetearErrores = () => {
    setPrimerNombreError(true);
    setSegundoNombreError(true);
    setPrimerApellidoError(true);
    setSegundoApellidoError(true);
    setCarreraPrincipalError(true);
    setCarreraSecundariaError(true);
    setIdentidadError(true);
    setFotoCertificadoError(true);
    setTelefonoError(true);
    setCorreoError(true);
    setCentroRegionalError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await validateForm();

    if (!isFormularioError) {
      alert('Formulario enviado correctamente');
      // Redireccionar a la página de inicio
      // window.location.href = '/';
    } else {
      console.log('Formulario no enviado');
      resetearErrores();
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
          <Form>
            <Row>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="forPrimerNombre">
                  <Form.Label>Primer Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={primerNombre}
                    onChange={(e) => setPrimerNombre(e.target.value)}
                    isInvalid={primerNombreError} 
                  />
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                </Form.Group>
              </Col>
              <Col className='col-12 col-md-6'>
                <Form.Group controlId="formSegundoNombre">
                  <Form.Label>Segundo Nombre</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ingrese su segundo nombre'
                    value={segundoNombre}
                    onChange={(e) => setSegundoNombre(e.target.value)}
                    isInvalid={segundoNombreError}
                  />
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="formPrimerApellido">
                  <Form.Label>Primer Apellido</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ingrese su primer apellido'
                    value={primerApellido}
                    onChange={(e) => setPrimerApellido(e.target.value)}
                    isInvalid={primerApellidoError}
                  />
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="formSegundoApellido">
                  <Form.Label>Segundo Apellido</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ingrese su segundo apellido'
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)}
                    isInvalid={segundoApellidoError}
                  />
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="col-12">
                <Form.Group controlId="formCentroRegional">
                  <Form.Label>Centro Regional</Form.Label>
                  <Form.Control as="select" value={centroRegional} onChange={obtenerCarrerasCentro} isInvalid={centroRegionalError}>
                    <option value="">Seleccione un centro regional</option>
                    {centros.map(centro => (
                      <option key={centro.ID} value={centro.ID}>{centro.NOMBRE}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                </Form.Group>
              </Col>
            </Row>
            <Row hidden={centroRegional === '' || centroRegional === 'Seleccione un centro regional'}>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="formCarreraPrincipal">
                  <Form.Label>Carrera Principal</Form.Label>
                  <Form.Control as="select" value={carreraPrincipal} onChange={(e) => setCarreraPrincipal(e.target.value)} isInvalid={carreraPrincipalError}>
                    <option value="">Seleccione una carrera</option>
                    {carreras.map(carrera => (
                      <option key={carrera.ID} value={carrera.NOM_CARRERA}>{carrera.NOM_CARRERA}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                </Form.Group>
              </Col>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="formCarreraSecundaria">
                  <Form.Label>Carrera Secundaria</Form.Label>
                  <Form.Control as="select" value={carreraSecundaria} onChange={(e) => setCarreraSecundaria(e.target.value)} isInvalid={carreraSecundariaError}>
                    <option value="">Seleccione una carrera</option>
                    {carreras.map(carrera => (
                      <option key={carrera.ID} value={carrera.NOM_CARRERA}>{carrera.NOM_CARRERA}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">*Este campo es obligatorio</Form.Control.Feedback> 
                </Form.Group>
              </Col>
            </Row>
            <Row>
                  <Col className="col-12">
                    <Form.Group controlId="formIdentidad">
                      <Form.Label>Identidad</Form.Label>
                      <Form.Control
                        type="number"
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Enviar Inscripción
                </Button>
              </Form>
            </div>
          </>
    );
  };


  export default InscripcionAspirantes;
