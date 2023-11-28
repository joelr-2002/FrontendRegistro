import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";
import Regresar from "./utils/Regresar";

export const JefeDepartamentoVerSeccion = () => {
  const [docenteData, setDocenteData] = useState([]);
  const [clases, setClases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [paginas, setPaginas] = useState(1);
  const itemsPaginas = 4;

  const fetchDocenteData = (docenteId) => {
    fetch(`http://localhost:8081/docente/${docenteId}`)
      .then((response) => response.json())
      .then((data) => {
        setDocenteData(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del docente:", error);
      });
  };

  const fetchClases = () => {
    fetch(apiurl + "/api/v1/asignaturas", {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClases(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const docenteId = localStorage.getItem("id");
    if (docenteId) {
      fetchDocenteData(docenteId);
    }
  }, []);

  useEffect(() => {
    fetchClases();
  }, [docenteData]);

  const mostrarSecciones = (clase) => {
    navigate("../jefe-departamento/editar-seccion", { state: clase });
  };
  const regresar = () => {
    window.history.back();
  };

  const filteredClases = clases.filter((clase) =>
    clase.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clase.COD.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
        <Regresar ruta="/jefe-departamento" />
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Secciones de Asignaturas</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar Asignatura"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "30%", marginBottom: "10px" }}
            />
            
            <ul className="list-group">
              {filteredClases.map((clase) => (
                <li
                  key={clase.COD}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {clase.COD + " " + clase.NOMBRE}
                  <button
                    className="btn btn-secciones btn-outline-success"
                    onClick={() => mostrarSecciones(clase.COD)}
                  >
                    Ver secciones
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JefeDepartamentoVerSeccion;