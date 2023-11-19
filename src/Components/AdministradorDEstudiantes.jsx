import React from "react";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";

const AdmDEstudiantes = () => {
  const handleDownload = () => {
   

   
    fetch(apiurl+"/api/v1/admisiones/estudiantes-admitidos", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
      })
      .then((blob) => {
        
        const url = window.URL.createObjectURL(blob);

        window.open(url, "_blank");

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo CSV", error);
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
        <h2>Estudiantes</h2>
        <br />

        <button onClick={handleDownload}>Descargar CSV</button>
      </div>
      
    </div>
  );
};

export default AdmDEstudiantes;
