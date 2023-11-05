import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdministradorNotas = () => {
  const [habilitadoNotas, setHabilitadoNotas] = useState(false);
  //La variable hanilitadoNotas indicará si está habilitado o no la subida de notas para los docentes
  return (
    <>
      <style>
        {`
                    body {
                        background-color: #99d8dd;
                    }
                `}
      </style>

      <div className="containerP">
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Notas
            </h2>
          </Col>
        </Row>
        <div>Habilitar subida de notas para los docentes</div>
        <Button
          className="btn-habilitar"
          value={true}
          onClick={(e) => setHabilitadoNotas(e.target.value)}
        >
          Habilitar
        </Button>
        <Button
          className="btn-deshabilitar"
          value={false}
          onClick={(e) => setHabilitadoNotas(e.target.value)}
        >
          Deshabilitar
        </Button>
      </div>
    </>
  );
};

export default AdministradorNotas;
