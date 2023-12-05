import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../Styles/index.css"; // Importa tu archivo de estilos CSS
import Cookies from "js-cookie";

const apiurl = "192.168.191.114";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [ownMessage, setOwnMessage] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://${apiurl}:3001`, [Cookies.get('x-token'), 'sec-websocket-protocol']);

    newSocket.onopen = () => {
      //const token = Cookies.get('x-token');
      //newSocket.send(JSON.stringify({ type: 'authenticate', token }));
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== '' && socket) {
      const message = {
        text: messageInput,
        timestamp: new Date().toISOString(),
        fromMe: true, // Nuevo campo para indicar si el mensaje es propio
      };
      socket.send(JSON.stringify(message));
      setMessages([...messages, message]); // Mostrar el mensaje propio inmediatamente
      setMessageInput('');
    }
  };

  return (
     <div className="containerP h-screen">
      <div className="row h-100">
        <div className="col-md-3 col-xl-2 chat-sidebar bg-gray-800 text-white">
          {/* Barra lateral */}
        </div>
        <div className="col-md-9 col-xl-10 chat-container d-flex flex-column">
          <div className="chat-messages flex-grow-1 overflow-auto bg-gray-100 p-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.fromMe ? "from-me bg-blue-500 text-white" : "from-others bg-gray-300 text-black"
                } p-2 rounded mb-2`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input p-3 d-flex align-items-center bg-white">
            <Form className="w-100" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <Row className="align-items-center">
                <Col xs={10} className="pr-1">
                  <Form.Control
                    type="text"
                    placeholder="Escriba algo..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-100"
                  />
                </Col>
                <Col xs={2} className="pr-1">
                  <Button type="submit" className="btn btn-seccionesNoMargin d-flex justify-content-center align-items-center w-100">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    {/* Puedes cambiar el icono según tus preferencias */}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
