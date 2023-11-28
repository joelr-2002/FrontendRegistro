import React, { useEffect, useCallback, useState } from "react";
import { Row } from "react-bootstrap";
import "../Styles/index.css";
import { HorasInicioFin } from "../utils/JefeDepartamento/convertirFecha";
import { useFetchs } from "../utils/JefeDepartamento/useFetchs";
import { useNavigate } from "react-router-dom";
import apiurl from "../utils/apiurl";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import Regresar from "./utils/Regresar";

const FormularioCrearClases = () => {
  const [centro, setCentro] = useState([]);
  const navigate = useNavigate();
  // ------------------------
  const { horas, minutos } = HorasInicioFin();

  const [checkboxValues, setCheckboxValues] = useState({
    Lunes: false,
    Martes: false,
    Miercoles: false, 
    Jueves: false,
    Viernes: false,
    Sabado: false,
    Domingo: false,
});

  const [horaInicial, setHoraInicial] = useState("00");
  const [minutosInicial, setMinutosInicial] = useState("00");
  const [horaFinal, setHoraFinal] = useState("00");
  const [docente, setDocente] = useState([]);
  const [selectedClase, setSelectedClase] = useState("");
  const [selectedEdificio, setselectedEdificio] = useState("");
  const [selectedAula, setSelectedAula] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState("");
  const [selectedDocente, setSelectedDocente] = useState("");
  const [aulas, setAulas] = useState([]);
  const [anioPeriodo, setAnioPeriodo] = useState([]);
  const [error,setError] = useState(false);
  
  const [clases, setClases] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [duracion, setDuracion] = useState("");

  const [checkboxLunes, setCheckboxLunes] = useState(false);
  const [checkboxMartes, setCheckboxMartes] = useState(false);
  const [checkboxMiercoles, setCheckboxMiercoles] = useState(false);
  const [checkboxJueves, setCheckboxJueves] = useState(false);
  const [checkboxViernes, setCheckboxViernes] = useState(false);
  const [checkboxSabado, setCheckboxSabado] = useState(false);
  const [checkboxDomingo, setCheckboxDomingo] = useState(false);

  const [lunes, setLunes] = useState("");
  const [martes, setMartes] = useState("");
  const [miercoles, setMiercoles] = useState("");
  const [jueves, setJueves] = useState("");
  const [viernes, setViernes] = useState("");
  const [sabado, setSabado] = useState("");
  const [domingo, setDomingo] = useState("");

  //fetch para asignaturas
  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/asignaturas",{
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        }
        );
        const responseJSON = await response.json();
        setClases(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchClases();
  }, []);
  
  //fetch para docentes
  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/docentes",{
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setDocente(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchDocentes();
  }, []);

  //fetch para Edificios
  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/edificios",{
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setEdificios(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchEdificios();
  }, []);

  //fetch para Aula por edificio
  const obtenerAulasEdificio = async (e) => {
    try {
      const response = await fetch(apiurl + "/api/v1/aulas/?edificio=" + e,{
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      });
      const responseJSON = await response.json();
      setAulas(responseJSON.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };


const Guardar = () => {
  const data = {
    "asignatura_cod": selectedClase,
    "docente_n_empleado": selectedDocente,
    "lunes": lunes,
    "martes": martes,
    "miercoles": miercoles,
    "jueves": jueves,
    "viernes": viernes,
    "sabado": sabado,
    "domingo": domingo,
    "hora_entrada": horaInicial,
    "hora_salida": horaFinal,
    "aula_id": selectedAula,
    "cupos": cuposDisponibles,
    "duracion": duracion,
  };

  console.log(data);

  if (error === true) {
    alert("Campos vacíos, por favor revise los datos");
    return;
  }

  if (data.hora_entrada === data.hora_salida) {
    alert("La hora de entrada y salida no pueden ser iguales");
    return;
  }

  if (data.hora_entrada > data.hora_salida) {
    alert("La hora de entrada no puede ser mayor a la hora de salida");
    return;
  }

  //fetch para crear seccion
  fetch(apiurl + "/api/v1/secciones/crear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": "bearer " + Cookies.get("x-token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      const mensaje = responseJson.mensaje;

      if (mensaje === "SECCION CREADA CORRECTAMENTE") {
        alert("Sección creada con éxito");
        
        // Limpia los campos del formulario
        setSelectedClase("");
        setSelectedDocente("");
        setselectedEdificio("");
        setSelectedAula("");
        setCuposDisponibles("");
        setHoraInicial("00");
        setHoraFinal("00");
        setDuracion("");
        setCheckboxValues({
          Lunes: false,
          Martes: false,
          Miercoles: false,
          Jueves: false,
          Viernes: false,
          Sabado: false,
          Domingo: false,
        });
        setLunes("");
        setMartes("");
        setMiercoles("");
        setJueves("");
        setViernes("");
        setSabado("");
        setDomingo("");
        
      } else {
        // Mostrar mensajes de acuerdo al contenido de `mensaje`
        if (mensaje.includes("EXISTE UN TRASLAPE DE AULA")) {
          const aula = mensaje.split("EXISTE UN TRASLAPE DE AULA: ")[1];
          alert("Existe un traslape de aula con: " + aula);
        } else if (
          mensaje ===
          "NO CORRESPONDE EL HORARIO SELECCIONADO CON LAS UNIDADES VALORATIVAS DE LA ASIGNTURA"
        ) {
          alert(
            "No corresponden las unidades valorativas seleccionadas con la asignatura"
          );
        } else if (mensaje.includes("EXISTE UN TRASLAPE DEL DOCENTE:")) {
          const docente = mensaje.split(
            "EXISTE UN TRASLAPE DEL DOCENTE: "
          )[1];
          alert("Existe un traslape del docente: " + docente);
        } else {
          // Manejar otros casos según sea necesario
          alert("Otro tipo de error: " + mensaje);
        }
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

 //useEffect para validar campos
  useEffect(() => {
    if (selectedClase === "" || selectedDocente === "" || selectedEdificio === "" || selectedAula === "" || cuposDisponibles === "" || duracion === "" || horaInicial === "" || horaFinal === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedClase, selectedDocente, selectedEdificio, selectedAula, cuposDisponibles, duracion, horaInicial, horaFinal]);


  const regresar = () => {
    window.history.back();
  };

  const handleCheckboxChange = useCallback((day) => {
    
    setCheckboxValues(prevState => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  }, []);

  useEffect(() => {
    if (checkboxValues.Lunes === true) {
      setLunes(1);
    } else if (checkboxValues.Lunes === false) {
      setLunes(0);
    }

    if (checkboxValues.Martes === true) {
      setMartes(1);
    } else if (checkboxValues.Martes === false) {
      setMartes(0);
    }

    if (checkboxValues.Miercoles === true) {
      setMiercoles(1);
    } else if (checkboxValues.Miercoles === false) {
      setMiercoles(0);
    }

    if (checkboxValues.Jueves === true) {
      setJueves(1);
    } else if (checkboxValues.Jueves === false) {
      setJueves(0);
    }

    if (checkboxValues.Viernes === true) {
      setViernes(1);
    } else if (checkboxValues.Viernes === false) {
      setViernes(0);
    }

    if (checkboxValues.Sabado === true) {
      setSabado(1);
    } else if (checkboxValues.Sabado === false) {
      setSabado(0);
    }

    if (checkboxValues.Domingo === true) {
      setDomingo(1);
    } else if (checkboxValues.Domingo === false) {
      setDomingo(0);
    }

  }, [checkboxValues]);

  const handleSelectClase = (event) => {
    setSelectedClase(event.target.value);
  };
  const handleSelectDocente = (event) => {
    setSelectedDocente(event.target.value);
  };

  const handleSelectEdificio = (event) => {
    setselectedEdificio(event.target.value);
  };

  const handleSelectAula = (event) => {
    setSelectedAula(event.target.value);
  };

  const handleSelectCupos = (event) => {
    const nuevoCupo = parseInt(event.target.value, 10);
    if (nuevoCupo >= 0 && nuevoCupo <= 40) {
      setCuposDisponibles(nuevoCupo);
    } else {
      console.log("Solo se permite un máximo de 50 cupos");
    }
  };

  // const anio =
  function obtenerAnioDesdeFecha(fecha) {
    const fechaObjeto = new Date(fecha);
    const anio = fechaObjeto.getFullYear();
    return anio;
  }

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
        <Regresar/>
        <h2 className="text-center my-4">Crear Sección</h2>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center my-3">
              <h3 className="mx-2">Período {anioPeriodo[0]?.periodo}</h3>{" "}
              <h3 className="mx-2">
                Año {obtenerAnioDesdeFecha(anioPeriodo[0]?.anio)}
              </h3>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Asignatura
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Asignatura
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedClase}
                            onChange={handleSelectClase}
                            className="w-75 form-control"
                          >
                            <option value="">Seleccione una clase</option>
                            {clases?.map((data, index) => (
                              <option key={index} value={data.COD}>
                                {data.COD + " - " + data.NOMBRE}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Docente
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedDocente}
                            onChange={handleSelectDocente}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un docente</option>
                            {docente.map((data, index) => (
                              <option key={index} value={data.ID}>
                                {data.NOMBRE}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Horario
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col d-flex justify-content-center py-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Lunes"
                              checked={checkboxValues.Lunes}
                              onChange={() => {
                                handleCheckboxChange("Lunes");
                              }}
                              value="Lunes"
                            />
                            <label className="form-check-label mx-2">
                              Lunes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Martes"
                              value="Martes"
                              checked={checkboxValues.Martes}
                              onChange={() => {
                                handleCheckboxChange("Martes");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Martes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Miercoles"
                              value="Miercoles"
                              checked={checkboxValues.Miercoles}
                              onChange={() => {
                                handleCheckboxChange("Miercoles");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Miércoles
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Jueves"
                              value="Jueves"
                              checked={
                                checkboxValues.Jueves
                              }
                              onChange={() => {
                                handleCheckboxChange("Jueves");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Jueves
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Viernes"
                              value="Viernes"
                              checked={checkboxValues.Viernes}
                              onChange={() => {
                                handleCheckboxChange("Viernes");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Viernes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Sabado"
                              value="Sabado"
                              checked={checkboxValues.Sabado}
                              onChange={() => {
                                handleCheckboxChange("Sabado");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Sábado
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Domingo"
                              value="Domingo"
                              checked={checkboxValues.Domingo}
                              onChange={() => {
                                handleCheckboxChange("Domingo");
                              }}
                            />
                            <label className="form-check-label mx-2">
                              Domingo
                            </label>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-3 d-flex justify-content-center py-2">
                          Hora Inicio:
                        </div>
                        <div className="col-3">
                          <select
                            value={horaInicial}
                            onChange={(e) => setHoraInicial(e.target.value)}
                            className="form-control"
                          >
                            <option value="">00</option>
                            {horas.map((hora) => (
                              <option key={hora} value={hora}>
                                {hora}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-3 d-flex justify-content-center py-2">
                          Hora Final:
                        </div>
                        <div className="col-3">
                          <select
                            value={horaFinal}
                            onChange={(e) => setHoraFinal(e.target.value)}
                            className="form-control"
                          >
                            <option value="">00</option>
                            {horas.map((hora) => (
                              <option key={hora} value={hora}>
                                {hora}
                              </option>
                            ))}
                          </select>
                        </div>

                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                      <div className="col-6 d-flex justify-content-center py-2">
                          Duración:
                      </div>

                      <div className="col-6">
                        <select
                          value={duracion}
                          onChange={(e) => setDuracion(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Seleccione Duración de Clase</option>
                          <option value="1">Trimestral</option>
                          <option value="2">Semestral</option>
                        </select>
                      </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Edificio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Edificio
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedEdificio}
                            onChange={(e) => {
                              handleSelectEdificio(e);
                              obtenerAulasEdificio(e.target.value);
                            }}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un edificio</option>
                            {edificios.map((dato) => (
                              <option key={dato.ID} value={dato.ID}>
                                {dato.NOMBRE}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Aula
                        </div>
                        <div className="col-6">
                          <select
                            value={selectedAula}
                            onChange={handleSelectAula}
                            className=" form-control w-75"
                          >
                            <option value="">Seleccione un aula</option>
                            {aulas.map((dato) => (
                              <option key={dato.ID} value={dato.ID}>
                                {dato.NOMBRE}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-6 d-flex justify-content-center py-2">
                          Cupos
                        </div>
                        <div className="col-6">
                          <input
                            type="number"
                            className=" form-control w-75"
                            value={cuposDisponibles}
                            min={0}
                            max={40}
                            onChange={handleSelectCupos}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <Row>
            <div className="d-flex justify-content-center col-12 col-md-12">
              <button className="btn btn-secciones my-3" onClick={Guardar}>
                Guardar Sección
              </button>
            </div>

            <div
            style={
              {
                marginTop: "-30px",
              }
            } 
            className="d-flex justify-content-center col-12 col-md-12">
            <a href="/jefe-departamento/secciones">
              <button className="btn btn-secciones mt-4"> 
                Ver Secciones
              </button>
            </a>
            </div>


            <div
            style={
              {
                marginTop: "-25px",
              }
            } 
            className="d-flex justify-content-center col-12 col-md-12">

            <button className="btn btn-outline-danger mt-4" onClick={regresar}>
                Atrás
              </button>
            </div>

            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioCrearClases;
