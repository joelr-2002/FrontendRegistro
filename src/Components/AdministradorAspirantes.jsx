import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

const AdmAspirantes = () => {
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

    const fileName = "notas_aspirantes.csv";
    const csvString = csvData.map((row) => row.join(",")).join("\n");

    const formData = new FormData();
    formData.append(
      "notas_aspirantes",
      new Blob([csvString], { type: "text/csv" }),
      fileName
    );

    fetch(apiurl + "/api/v1/admisiones/cargar-notas", {
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
        fileInputRef.current.value = ""; // Limpiar el nombre del archivo después de enviarlo
        setFileSelected(false);
        alert("Archivo enviado correctamente");
        
      })
      .catch((err) => {
        console.error(err);
      });

    resetearErrores();

   
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      
      <div className="containerP text-center">
      <Atras />
        <h2>Aspirantes</h2>
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

        <Button className={"btn-seccionesNoMargin"} onClick={handleUpload}>
          Subir Notas de Aspirantes
        </Button>
      </div>
    </>
  );
};

export default AdmAspirantes;
