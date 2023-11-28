import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";
import { Modal, Button, Form } from "react-bootstrap";
import Regresar from "./utils/Regresar";

export const JefeDepartamentoEditarSeccion = () => {
  const location = useLocation();
  const clase = location.state;
  const [secciones, setSecciones] = useState([]);
  const [editarCupos, setEditarCupos] = useState({});
  const [cuposActuales, setCuposActuales] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [justificacion, setJustificacion] = useState('');
  const [seccionAEliminar, setSeccionAEliminar] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  console.log(clase);

  const mostrarSecciones = () => {
    fetch(apiurl + "/api/v1/secciones/?codAsig=" + clase,{
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
    }
  })
      .then((response) => response.json())
      .then((data) => {
        setSecciones(data.data);
        const cuposIniciales = {};
        data.data.forEach((seccion) => {
          cuposIniciales[seccion.ID] = seccion.CUPOS;
        });
        setCuposActuales(cuposIniciales);
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  };

  useEffect(() => {
    mostrarSecciones();
  }, [editarCupos]);

  const handleEditarCupos = (id, cupos) => {
    setEditarCupos((prev) => ({ ...prev, [id]: true }));
    setCuposActuales((prev) => ({ ...prev, [id]: cupos }));
  };

  const acualizarCupos = async (id) => {
    console.log("Actualizar cupos de la sección", id);
    try {
      const url = apiurl + '/api/v1/secciones/aumentar-cupos';

      const seccion = secciones.find((seccion) => seccion.ID === id);
      console.log(seccion);

      console.log(cuposActuales[id])

      if(parseInt(cuposActuales[id]) < seccion.MATRICULADOS){
        alert("No se puede disminuir más el número de cupos, ya que hay estudiantes matriculados en la sección");
        return;
      }

      const data = {
        cupos: parseInt(cuposActuales[id]),
        seccion: id,
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
        // console.log(`Cupos actualizados`);
        setEditarCupos((prev) => ({ ...prev, [id]: false }));
      } else {
        console.log("Error actualizar los cupos");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEliminarSeccion = (seccion) => {
    setSeccionAEliminar(seccion);
    setShowModal(true);
  };

const confirmarEliminarSeccion = async () => {
  if (!justificacion) {
    alert("Por favor, escriba una justificación para eliminar la sección");
    setShowPasswordModal(false);
    setShowModal(true);
    return;
  }

  if (!password) {
    alert("Por favor, escriba su contraseña para eliminar la sección");
    return;
  }

  try {
    const loginUrl = apiurl + '/api/v1/login';

    const loginData = {
      username: Cookies.get("nEmpleado"),
      contrasenia: password,
    };

    const loginResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();

    if (loginResult.mensaje === 'Se ha iniciado sesión exitosamente.') {
      const deleteUrl = apiurl + '/api/v1/secciones/cancelar-seccion';
      const deleteData = {
        idSeccion: seccionAEliminar.ID,
        justificacion: justificacion,
      };

      console.log(deleteData);

      const deleteResponse = await fetch(deleteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": "bearer " + Cookies.get("x-token"),
        },
        body: JSON.stringify(deleteData),
      });

      if (deleteResponse.ok) {
        mostrarSecciones();
      } else {
        console.log("Error al actualizar los cupos");
      }
    } else {
      alert("Contraseña incorrecta");
      return;
    }
  } catch (error) {
    console.log("Error:", error);
    alert("Error al eliminar la sección");
  }

  setShowPasswordModal(false);
  setShowModal(false);
};


  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
        <Regresar />
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Editar Sección</h2>
          </div>
          <div className="col">
            <div className="d-flex justify-content-center">
              <table className="table table-bordered table-stripted">
                <thead>
                  <tr>
                    <th scope="col">Sección</th>
                    <th scope="col">Docente</th>
                    <th scope="col">Edificio</th>
                    <th scope="col">Aula</th>
                    <th scope="col">Hi</th>
                    <th scope="col">Hf</th>
                    <th scope="col">Días</th>
                    <th scope="col">Matriculados | Cupos
                    </th>
                    <th scope="col">Lista de espera</th>
                    <th scope="col">Editar Cupos</th>
                    <th scope="col">Eliminar Sección</th>
                  </tr>
                </thead>
                <tbody>
                  {secciones?.map((seccion) => (
                    <tr key={seccion.ID}>
                      <td scope="row">{seccion.SECCION}</td>
                      <td scope="row">
                        {seccion.DOCENTE}
                      </td>
                      <td scope="row">{seccion.EDIFICIO}</td>
                      <td scope="row">{seccion.AULA}</td>
                      <td scope="row">{seccion.HORA_INICIO}</td>
                      <td scope="row">{seccion.HORA_FINAL}</td>
                      <td scope="row">
                        {seccion.LU === 1 ? 'Lu' : ' '}
                        {seccion.MA === 1 ? 'Ma' : ' '}
                        {seccion.MI === 1 ? 'Mi' : ' '}
                        {seccion.JU === 1 ? 'Ju' : ' '}
                        {seccion.VI === 1 ? 'Vi' : ' '}
                        {seccion.SA === 1 ? 'Sa' : ' '}
                        {seccion.DO === 1 ? 'Do' : ' '}
                        </td>
                      <td scope="row">
                        {editarCupos[seccion.ID] ? (
                          <input
                            type="number"
                            value={cuposActuales[seccion.ID]}
                            onChange={(e) =>
                              setCuposActuales((prev) => ({
                                ...prev,
                                [seccion.ID]: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          `${seccion.MATRICULADOS}/${seccion.CUPOS}`
                        )}
                      </td>
                      <td scope="row">
                        {seccion.LISTA_ESPERA}
                      </td>
                      <td scope="row">
                        {!editarCupos[seccion.ID] ? (
                          <button
                            className="btn btn-secciones"
                            onClick={() =>
                              handleEditarCupos(
                                seccion.ID,
                                seccion.CUPOS
                              )
                            }
                          >
                            Editar
                          </button>
                        ) : (
                          <>
                            <div className="row">
                              <div className="col-12">
                                <button
                                  className="btn btn-secciones "
                                  onClick={() =>
                                    acualizarCupos(seccion.ID)
                                  }
                                >
                                  Guardar
                                </button>
                              </div>
                              <div className="col-12">
                                <button
                                  className="btn btn-secciones-danger btn-w "
                                  onClick={() =>
                                    setEditarCupos((prev) => ({
                                      ...prev,
                                      [seccion.ID]: false,
                                    }))
                                  }
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                      <td scope="row">
                        <button
                          className="btn btn-secciones-danger btn-w"
                          onClick={() => handleEliminarSeccion(seccion)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Modal para confirmar la eliminación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Por favor, escribe una justificación para eliminar la sección:</p>
          <Form.Control
            as="textarea"
            rows="4"
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE1" onClick={() => {setShowPasswordModal(true); setShowModal(false)}}>
            Siguiente
          </Button>
          <Button className="btnE2" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ingresar la contraseña */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar con contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ingresa tu contraseña para confirmar la eliminación:</p>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmarEliminarSeccion}>
            Confirmar Eliminación
          </Button>
          <Button className="btnE2" onClick={() => setShowPasswordModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>


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

export default JefeDepartamentoEditarSeccion;
