import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar"


export const SubirNotas = () => {
  const num_empleado = localStorage.getItem("id");
  const [alumnos, setAlumnos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [notasTemporales, setNotasTemporales] = useState([]);
  const [mostrarObservacion, setMostrarObservacion] = useState(true);
  const location = useLocation();
  const idSeccion = Cookies.get("idSeccion");

  useEffect(() => {
    console.log(idSeccion)
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(
          apiurl + `/api/v1/docentes/estudiantes/?seccionID=${idSeccion}`,
          {
            headers: {
              "x-token": "bearer " + Cookies.get("x-token"),
            },
          }
        );
        const jsonData = await response.json();
        setAlumnos(jsonData.data);
        
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchAlumnos();

    console.log(alumnos)
  }, [editar, idSeccion]);

  const validarNota = (valor) => {
    const numero = parseInt(valor);
    return valor === "" || (!isNaN(numero) && numero >= 0 && numero <= 100);
  };

  const numeroDeEntrada = (event, num_cuenta) => {
    const input = event.target.value;
    if (validarNota(input)) {
      const notasTemporalesActualizadas = notasTemporales.map(
        (notaTemporal) => {
          if (notaTemporal.num_cuenta === num_cuenta) {
            return { ...notaTemporal, nota: input };
          }
          return notaTemporal;
        }
      );

      setNotasTemporales(notasTemporalesActualizadas);
    }
  };

  const handleEditar = () => {
    setEditar(true);
    setMostrarObservacion(false);
    const notasTemporalesInicializadas = alumnos.map((alumno) => ({
      num_cuenta: alumno.N_CUENTA,
      nota: alumno.NOTA || "",
    }));
    setNotasTemporales(notasTemporalesInicializadas);
  };

  const handleGuardar = async () => {
    for (const { num_cuenta, nota } of notasTemporales) {
      await guardarNotasEnBaseDeDatos(num_cuenta, nota);
    }
    setEditar(false);
    setMostrarObservacion(true);
  };

  const guardarNotasEnBaseDeDatos = async (num_cuenta, nota) => {
    try {
      const url = apiurl + `/api/v1/docentes/notas`;

      const data = {
        correo_electronico: alumnos.find(
          (alumno) => alumno.N_CUENTA === num_cuenta
        )?.CORREO,
        nota: nota,
        cuenta: num_cuenta,
        seccion: idSeccion,
      };

      console.log(data);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": "bearer " + Cookies.get("x-token"),
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Nota guardada en la base de datos");
      } else {
        console.log("Error al guardar la nota en la base de datos");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const navigate = useNavigate();

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
        <Atras/>
        <div className="col">
          <div className="col">
            <div className="row">
              {/* Botones Editar y Notificar */}
              {!editar && (
                <>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn-seccionesNoMargin"
                      onClick={handleEditar}
                    >
                      Editar
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col">
            <div className="row">
              {/* Botón Guardar */}
              {editar && (
                <>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn-seccionesNoMargin"
                      onClick={handleGuardar}
                    >
                      Guardar
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row my-3">
            {/* Tabla de alumnos y notas */}
            <table className="table table-striped table-bordered ">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Número de Cuenta
                  </th>
                  <th scope="col" className="text-center">
                    Nombre
                  </th>
                  <th scope="col" className="text-center">
                    Nota
                  </th>
                  <th scope="col" className="text-center">
                    Observación
                  </th>
                </tr>
              </thead>
              <tbody>
                {alumnos?.map((alumno, index) => (
                  <tr key={index}>
                    <td scope="row" className="text-center">
                      {alumno.N_CUENTA}
                    </td>
                    <td scope="row" className="text-center">
                      {alumno.NOMBRE_COMPLETO}
                    </td>
                    <td scope="row" className="text-center">
                      {editar ? (
                        <>
                          <input
                            className="form-control "
                            type="text"
                            value={
                              notasTemporales.find(
                                (notaTemporal) =>
                                  notaTemporal.num_cuenta === alumno.N_CUENTA
                              )?.nota || ""
                            }
                            onChange={(event) =>
                              numeroDeEntrada(event, alumno.N_CUENTA)
                            }
                          />

                          {!validarNota(
                            notasTemporales.find(
                              (notaTemporal) =>
                                notaTemporal.N_CUENTA === alumno.N_CUENTA
                            )?.nota
                          ) && (
                            <p style={{ color: "red" }}>
                              Ingrese un valor válido (0-100)
                            </p>
                          )}
                        </>
                      ) : (
                        <p>{alumno.NOTA ? alumno.NOTA : "--"}</p>
                      )}
                    </td>
                    {alumno.NOTA === "" ? (
                      <td scope="row" className="text-center">
                        {" "}
                      </td>
                    ) : (
                      mostrarObservacion &&
                      (alumno.NOTA >= 65 ? (
                        <td scope="row" className="text-center">
                          Aprobó
                        </td>
                      ) : (
                        <td scope="row" className="text-center">
                          Reprobó
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default SubirNotas;
