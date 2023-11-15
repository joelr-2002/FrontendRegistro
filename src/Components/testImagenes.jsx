
import React, { useState, useEffect } from "react";
import apiurl from "../utils/apiurl";

function TestImagenes() {
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes")
      .then((response) => response.json())
      .then((data) => setDocentes(data.data));
  }, []);

  return (
    <div>
      {docentes.map((docente) => (
        <div key={docente.N_EMPLEADO}>
            
            <img src={apiurl +docente.FOTOEMPLEADO} alt="Foto" />
          <h2>{docente.PRIMERNOMBRE}</h2>
          <p>{docente.CORREOELECTRONICO}</p>
          <p>{docente.TELEFONO}</p>
          <p>{docente.NOM_CARRERA}</p>
        </div>
      ))}
    </div>
  );
}

export default TestImagenes;
