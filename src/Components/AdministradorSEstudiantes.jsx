import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";

const AdmSEstudiantes = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [csvError, setCSVError] = useState(false);

  const fileInputRef = useRef(null);

  const handleCSV = (data, fileInfo) => {
    console.log("Data:", data);
  
  
      setCsvData(data);
      setFileSelected(true);
      setCSVError(false);
    
  };
  

  const resetearErrores = () => {
    setCSVError(false);
  };

  const handleUpload = () => {
    if (csvData.length === 0) {
      setCSVError(true);
      return;
    }
  
    const fileName = "datos-estudiantes.csv";
    const formData = new FormData();
    formData.append("datos_estudiantes", new File([csvData[0][0]], fileName));
  
    fetch(apiurl + "/api/v1/admisiones/registrar-estudiantes", {
      method: "POST",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
      body: formData,
    })
      .then((response) => {
        console.log(response.status);
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  
    resetearErrores();
  
    alert("Archivo enviado correctamente");
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
        <h2>Estudiantes</h2>
        <br />

        <CSVReader onFileLoaded={handleCSV} ref={fileInputRef} />

        <br />
        {fileSelected && (
          <p className="text-success">
            Se ha seleccionado un archivo correctamente.
          </p>
        )}

        {csvError && (
          <p className="text-danger">
            Error: Debes seleccionar un archivo antes de subirlo.
          </p>
        )}

        <Button className={"btnE1"} onClick={handleUpload}>
          Subir Estudiantes
        </Button>
      </div>
    </>
  );
};

export default AdmSEstudiantes;
