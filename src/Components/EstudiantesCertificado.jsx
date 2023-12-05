import React from "react";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import { Button } from "react-bootstrap";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

const EstudiantesCertificado = () => {
  const handleDCertificado = () => {
    fetch(apiurl + "/api/v1/estudiante/descargar-certificado-historial", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "certificado.pdf"); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("", error);
      });
  };

  return (
    <div>
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
        <Atras />
        <h2>Certificado Académico</h2>
        <br />

        <Button className="btn-seccionesNoMargin" onClick={handleDCertificado}>
          Descargar Certificado
        </Button>
      </div>
    </div>
  );
};

export default EstudiantesCertificado;
