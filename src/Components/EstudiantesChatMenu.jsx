import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarLoggedComponente from "./NavbarLoggedComponente";
import Atras from "./utils/Regresar.jsx";
import "../Styles/index.css";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Chat from "./Chat";
import e from "cors";

const ChatMenu = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("Contactos");
  const [contactos, setContactos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [amigosEnLinea, setAmigosEnLinea] = useState([]);
  const [contacto, setContacto] = useState([]);

  //endpoint traer contactos
  useEffect(() => {
    fetch(apiurl + "/api/v1/chat/contacts/" + Cookies.get('nEmpleado'), {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContactos(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error al obtener los contactos:", error);
      });
  }, []);

  const abrirChat = () => {
    
  }

  const handleOpcionSChange = (os) => {
    setOpcionSeleccionada(os);
  };

  const agregarContacto = () => {
    // Simulación de agregar un nuevo contacto
    console.log(contacto)
    console.log(Cookies.get('nEmpleado'))

    const body = {
      usuario_id: Cookies.get('nEmpleado'),
      contacto_usuario_id: contacto,
      estado: 'pendiente'
    }

    console.log(body)

    fetch(apiurl + "/api/v1/chat/contacts/agregar/", {
      method: "POST",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error === undefined) {
          alert("Solicitud enviada");
          window.location.reload();
        }
        alert(data.error);
      })
      .catch((error) => {
        console.error("Error al agregar el contacto:", error);
      });
  };

  const crearGrupo = () => {
    // Simulación de crear un nuevo grupo
    const nuevoGrupo = {
      id: grupos.length + 1,
      nombre: `Grupo ${grupos.length + 1}`,
    };
    setGrupos([...grupos, nuevoGrupo]);
  };


  const agregarAmigoEnLinea = () => {
    // Simulación de agregar un amigo en línea
    const nuevoAmigo = {
      id: amigosEnLinea.length + 1,
      nombre: `Amigo ${amigosEnLinea.length + 1}`,
    };
    setAmigosEnLinea([...amigosEnLinea, nuevoAmigo]);
  };

  return (
    <>
      <NavbarLoggedComponente urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedComponente>
      <Container className="containerP mx-auto my-8">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 className="font-bold text-3xl text-center">Chat</h2>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="chat-cursorAll border-r border-gray-300">
            <Row>
              <div
                onClick={() => handleOpcionSChange("Contactos")}
                className={`${
                  opcionSeleccionada === "Contactos"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } chat-cursor cursor-pointer py-2 px-4 transition duration-300 ease-in-out`}
                style={{
                  backgroundColor: opcionSeleccionada === "Contactos" ? '#01587a' : '#e1e8ec'
                }}
              >
                Contactos
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("Grupos")}
                className={`${
                  opcionSeleccionada === "Grupos"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } chat-cursor cursor-pointer py-2 px-4 transition duration-300 ease-in-out`}
                style={{
                  backgroundColor: opcionSeleccionada === "Grupos" ? '#01587a' : '#e1e8ec'
                }}
              >
                Grupos
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("AgregarContacto")}
                className={`${
                  opcionSeleccionada === "AgregarContacto"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } chat-cursor cursor-pointer py-2 px-4 transition duration-300 ease-in-out`}
                style={{
                  backgroundColor: opcionSeleccionada === "AgregarContacto" ? '#01587a' : '#e1e8ec'
                }}
              >
                Agregar Contacto
              </div>
            </Row>
            <Row>
              <div
                onClick={() => handleOpcionSChange("AmigosEnLinea")}
                className={`${
                  opcionSeleccionada === "AmigosEnLinea"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } chat-cursor cursor-pointer py-2 px-4 transition duration-300 ease-in-out`}
                style={{
                  backgroundColor: opcionSeleccionada === "AmigosEnLinea" ? '#01587a' : '#e1e8ec'
                }}
              >
                Amigos en Línea
              </div>
            </Row>
          </Col>

          <Col md={8}>
            {opcionSeleccionada === "Contactos" && (
              <div className="animate__animated animate__fadeIn">
              <h3 className="font-bold text-2xl mb-4">Contactos</h3>
              {contactos.length === 0 ? (
                <p>-- Aún no tienes contactos, agrega uno en 'Agregar Contacto' más abajo --</p>
              ) : (
                <ul className="contactul divide-y divide-black-200">
                  {contactos.map((contacto) => (
                    <li key={contacto.contacto_id} className="mb-2 flex items-center border-b border-gray-200 py-2 hover:bg-#01587a hover:text-white transition duration-300 ease-in-out">
                      <div className="w-8 h-8 mr-2">
                        {contacto.estado === 'aceptado' ? (
                          <i style={{color: '#01587a', cursor: 'pointer'}} onClick={abrirChat()} className="fas fa-paper-plane"></i>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm">
                          {contacto.nombre} - Usuario ID: {contacto.contacto_usuario_id}
                        </p>
                        <p className="text-xs">
                          Estado: {contacto.estado === 'aceptado' ? 'Aceptado' : 'Pendiente'}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            )}
            {opcionSeleccionada === "Grupos" && (
              <div>
                <h3 className="font-bold text-2xl mb-4">Grupos</h3>
                <ul>
                  {grupos.map((grupo) => (
                    <li key={grupo.id} className="mb-2">
                      {grupo.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {opcionSeleccionada === "AgregarContacto" && (
              <div className="animate__animated animate__fadeInUp">
              <h3 className="font-bold text-2xl mb-4">Agregar Contacto</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Número de Cuenta:</label>
                  <input
                    onChange={(e) => setContacto(e.target.value)}
                    type="text"
                    placeholder="Ingrese el número de cuenta"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <Button onClick={agregarContacto} className="btn-seccionesNoMargin">
                  Enviar Solicitud
                </Button>
              </form>
            </div>
            )}
            {opcionSeleccionada === "AmigosEnLinea" && (
              <div>
                <h3 className="font-bold text-2xl mb-4">Contactos en línea</h3>
                <ul>
                  {amigosEnLinea.map((amigo) => (
                    <li key={amigo.id} className="mb-2">
                      {amigo.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatMenu;
