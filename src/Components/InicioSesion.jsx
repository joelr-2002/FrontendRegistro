import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

    /**
     * Función que se ejecuta al enviar el formulario de inicio de sesión.
     * Valida los campos del formulario y, si son válidos, realiza la autenticación.
     * @param {Event} e Evento del formulario.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        validateForm();
        if (emailValid && passwordValid) {
            //llamada a la api aqui
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

            <div className="login-container">
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
                                    min="0"
                                    max="99999999999"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
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
                                <Button variant="primary" type="submit">
                                    Ingresar
                                </Button>
                            </Col>
                        </Row>
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
