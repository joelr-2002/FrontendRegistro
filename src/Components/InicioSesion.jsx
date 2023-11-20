import React, { useState } from 'react';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarComponente from './NavbarComponente';
import Cookies from 'js-cookie';
import apiurl from '../utils/apiurl.js';
import { contains } from 'jquery';

/**
 * Componente para el inicio de sesión.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario de inicio de sesión.
 */
const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordUserError, setPasswordUserError] = useState(false);

    //Revisa el rol guardado en la cookie para redirigir al usuario a la página correspondiente
    const [redirected, setRedirected] = useState(false);
    const rol = Cookies.get('user');

    if (!redirected) {
        if (rol === 'estudiante') {
            setRedirected(true);
            window.location.href = '/estudiantes';
        } else if (rol === 'docente') {
            setRedirected(true);
            window.location.href = '/docentes';
        } else if (rol === 'administrador') {
            window.location.href = '/administrador'; 
        } else if (rol === 'coordinador') {
            window.location.href = '/coordinador'; 
        } else if (rol === 'jefe') {
            window.location.href = '/jefe-departamento'; 
        }
    }

    /**
     * Función que se ejecuta al enviar el formulario de inicio de sesión.
     * Valida los campos del formulario y, si son válidos, realiza la autenticación.
     * @param {Event} e Evento del formulario.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        validateForm();
        setIsLoading(true);
        
        //Si email tiene letras o carácteres especiales, no es válido
       
        //Si email y password son válidos, se realiza la autenticación
        if (emailValid && passwordValid) {
            //Se realiza la petición
            fetch(apiurl+'/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username" : email,
                    "contrasenia" : password
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsLoading(false);
                    setPasswordUserError(false);
                    console.log(data);
                    if (data.mensaje === 'Se ha iniciado sesión exitosamente.') {
                        console.log('Usuario autenticado');
                        Cookies.set('x-token', data.token);
                        Cookies.set('user', data.data.rol);
                        Cookies.set('nEmpleado', email);
                        const rol = Cookies.get('user');
                        if (!redirected) {
                            if (rol === 'estudiante') {
                                setRedirected(true);
                                window.location.href = '/estudiantes';
                            } else if (rol === 'docente') {
                                setRedirected(true);
                                window.location.href = '/docentes';
                            } else if (rol === 'administrador') {
                                window.location.href = '/administrador'; 
                            } else if (rol === 'coordinador') {
                                window.location.href = '/coordinador'; 
                            } else if (rol === 'jefe') {
                                window.location.href = '/jefe-departamento'; 
                            }
                        }
                    }

                    if (data.mensaje === 'Usuario o contraseña incorrecto!' || data.mensaje.includes('Ocurrio un error al iniciar sesión:')) {
                        console.log('Usuario o contraseña incorrectos');
                        setPasswordUserError(true);
                    }
                    
                    console.log(data.mensaje);
                })
                .catch((err) =>{
                    console.error(err)
                    setPasswordUserError(true);
                    setIsLoading(false);});
        }
        //Si el usuario o la contraseña son incorrectos, se muestra un mensaje de error 
        else {
            setIsLoading(false);
        }
            
    };

    /**
     * Función que valida los campos del formulario.
     * Si un campo es inválido, establece el estado correspondiente y muestra un mensaje de error.
     */
    const validateForm = () => {
        if (email.trim() === '') {
            setEmailValid(false);
            setEmailError('Campo obligatorio');
        } else {
            setEmailValid(true);
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordValid(false);
            setPasswordError('Campo obligatorio');
        } else {
            setPasswordValid(true);
            setPasswordError('');
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

                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            <NavbarComponente />
            <div className="login-container" disabled={isLoading}>
                <div className="login-content">
                    <Row className="mb-3">
                        <Col>
                            <h2 style={{ fontFamily: 'Heebo', fontWeight: 700 }}>Iniciar Sesión</h2>
                        </Col>
                    </Row>
                    <Form onSubmit={handleLogin}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicNumber">
                                <Form.Label>Cuenta</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su No. Cuenta"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span style={{ color: 'red' }}>{emailError}</span>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span style={{ color: 'red' }}>{passwordError}</span>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Ingresar'}
                                </Button>
                            </Col>
                        </Row>

                        {passwordUserError && <div style={{
                            fontFamily: 'Heebo',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: 'red'
                            }}>Usuario o contraseña incorrectos</div>}
                    </Form>

                    <Row className="mt-4">
                        <Col>
                            <Link to="/formulario-aspirantes">Formulario para aspirantes</Link>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
