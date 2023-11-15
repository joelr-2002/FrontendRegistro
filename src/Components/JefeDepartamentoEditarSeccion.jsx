import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";

export const JefeDepartamentoEditarSeccion = () => {
  const location = useLocation();
  const clase = location.state;
  const [secciones, setSecciones] = useState([]);
  const [editarCupos, setEditarCupos] = useState({});
  const [cuposActuales, setCuposActuales] = useState({});

  const mostrarSecciones = () => {
    fetch(`http://localhost:8081/seccionesDisponibles/${clase.id_clase}`)
      .then((response) => response.json())
      .then((data) => {
        setSecciones(data);
        const cuposIniciales = {};
        data.forEach((seccion) => {
          cuposIniciales[seccion.id_seccion] = seccion.numero_cupos;
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
    try {
      const url = `http://localhost:8081/actualizar-cupos/${id}`;

      const data = {
        cupos: cuposActuales[id],
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP">
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
                    <th scope="col">Matricula</th>
                    <th scope="col">Lista de espera</th>
                    <th scope="col">Editar Cupos</th>
                  </tr>
                </thead>
                <tbody>
                  {secciones?.map((seccion) => (
                    <tr key={seccion.id_seccion}>
                      <td scope="row">{seccion.id_seccion}</td>
                      <td scope="row">
                        {seccion.nombres} {seccion.apellidos}
                      </td>
                      <td scope="row">{seccion.nombre_edificio}</td>
                      <td scope="row">{seccion.num_aula}</td>
                      <td scope="row">{seccion.horainicio}</td>
                      <td scope="row">{seccion.horafin}</td>
                      <td scope="row">
                        {editarCupos[seccion.id_seccion] ? (
                          <input
                            type="number"
                            value={cuposActuales[seccion.id_seccion]}
                            onChange={(e) =>
                              setCuposActuales((prev) => ({
                                ...prev,
                                [seccion.id_seccion]: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          `${seccion.numero_estudiantes_matriculados}/${seccion.numero_cupos}`
                        )}
                      </td>
                      <td scope="row">
                        {seccion.numero_estudiantes_lista_espera}
                      </td>
                      <td scope="row">
                        {!editarCupos[seccion.id_seccion] ? (
                          <button
                            className="btn btn-success btn-w"
                            onClick={() =>
                              handleEditarCupos(
                                seccion.id_seccion,
                                seccion.numero_cupos
                              )
                            }
                          >
                            Editar cupos
                          </button>
                        ) : (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <button
                                  className="btn btn-success "
                                  onClick={() =>
                                    acualizarCupos(seccion.id_seccion)
                                  }
                                >
                                  Guardar
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  className="btn btn-success "
                                  onClick={() =>
                                    setEditarCupos((prev) => ({
                                      ...prev,
                                      [seccion.id_seccion]: false,
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
                    </tr>
                  ))}
                </tbody>
              </table>
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
