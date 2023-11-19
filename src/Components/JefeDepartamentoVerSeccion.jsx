import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";

export const JefeDepartamentoVerSeccion = () => {
  const [docenteData, setDocenteData] = useState([]);
  const [clases, setClases] = useState([]);
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

  

  var clasesx = clases
  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
        
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Secciones de Asignaturas</h2>
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col">
              <table className="table table-bordered table-stripted">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Nombre de la Clase
                    </th>
                    <th scope="col" className="text-center">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clasesx
                    .slice((paginas - 1) * itemsPaginas, paginas * itemsPaginas)
                    .map((clasesx) => (
                      <tr key={clasesx.COD}>
                        <td scope="row" className="text-center align-middle">
                          {clasesx.COD + " " + clasesx.NOMBRE}
                        </td>
                        <td
                          scope="row"
                          className="d-flex justify-content-center"
                        >
                          <button
                            className="btn btn-secciones btn-outline-success btn-w"
                            onClick={() => mostrarSecciones(clasesx.COD)}
                          >
                            Ver secciones
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${paginas === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link btn-disabled btn-secciones"
                      onClick={() => setPaginas(paginas - 1)}
                      disabled={paginas === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {Array.from(
                    {
                      length: Math.ceil(clasesx.length / itemsPaginas),
                    },
                    (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          paginas === i + 1 ? "active" : ""
                        }`}
                        onClick={() => setPaginas(i + 1)}
                      >
                        <span className="page-link">{i + 1}</span>
                      </li>
                    )
                  )}
                  <li
                    className={`page-item ${
                      paginas === Math.ceil(clasesx.length / itemsPaginas)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link btn-info btn-secciones"
                      style={
                        {
                          marginLeft: "8px",
                        }
                      }
                      onClick={() => setPaginas(paginas + 1)}
                      disabled={
                        paginas === Math.ceil(clasesx.length / itemsPaginas)
                      }
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-danger btn-w" onClick={regresar}>
          Regresar
        </button>
      </div>
      </div>
    </>
  );
};

export default JefeDepartamentoVerSeccion;