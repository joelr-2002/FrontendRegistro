import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import "../Styles/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Fechas = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaFinalIngreso, setFechaFinalIngreso] = useState("");

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinalChange = (e) => {
    setFechaFinal(e.target.value);
  };

  const handleFechaIngresoChange = (e) => {
    setFechaIngreso(e.target.value);
  };

  const handleFechaFinalIngresoChange = (e) => {
    setFechaFinalIngreso(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de fechas
    if (new Date(fechaFinal) <= new Date(fechaInicio)) {
      alert("La fecha final debe ser posterior a la fecha de inicio.");
    } else if (new Date(fechaFinalIngreso) <= new Date(fechaIngreso)) {
      alert(
        "La fecha de finalización de ingreso debe ser posterior a la fecha de ingreso."
      );
    } else {
      // Realizar acciones adicionales o enviar datos si es necesario
    }
  };

  return (
    <>
 
        <br></br>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Fecha de Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
            />
          </div>
    <br></br>
          <div>
            <label>Fecha Final:</label>
            <input
              type="date"
              value={fechaFinal}
              onChange={handleFechaFinalChange}
            />
          </div>
          <br></br>
          <div>
            <label>Fecha de Ingreso:</label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={handleFechaIngresoChange}
            />
          </div>
          <br></br>
          <div>
            <label>Fecha Final de Ingreso:</label>
            <input
              type="date"
              value={fechaFinalIngreso}
              onChange={handleFechaFinalIngresoChange}
            />
          </div>

          
        </form>

    </>
  );
};

//Se acortará el nombre de Administrador a Adm para mayor facilidad
const AdmNuevoPeriodo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la API
    // y manejar la respuesta (por ejemplo, mostrar un mensaje de éxito)
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState(""); // Estado para almacenar la opción seleccionada

  const handleOpcion = (e) => {
    setOpcionSeleccionada(e.target.value); // Actualiza la opción seleccionada en el estado
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
      <div className="containerP text-center">
        <h2 className="titulos">Crear Nuevo Periodo</h2>
        <div>
          <select value={opcionSeleccionada} onChange={handleOpcion}>
            <option value="">Seleccione una opción</option>
            <option value={1}> Trimestral </option>
            <option value={2}>Semestral</option>
          </select>
          {console.log(opcionSeleccionada)}
          {opcionSeleccionada === "1" && (
            <div>
              
              <Fechas/>
            </div>
          )}

          {opcionSeleccionada === "2" && (
            <div>
              <h2>Opción 2 Seleccionada</h2>
              <p>Información relacionada con la Opción 2.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdmNuevoPeriodo;
