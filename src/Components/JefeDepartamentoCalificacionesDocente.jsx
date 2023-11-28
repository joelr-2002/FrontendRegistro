import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarLoggedInComponent from './NavbarLoggedComponente'
import apiurl from '../utils/apiurl'
import Cookies from 'js-cookie'
import Regresar from '../Components/utils/Regresar'


export const JefeDepartamentoCalificacionesDocente= () => {
  const [docentes, setDocentes] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState("");
  const [secciones, setSecciones] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [calificaciones, setCalificaciones] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch para obtener la lista de docentes
    const fetchDocentes = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/docentes", {
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setDocentes(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchDocentes();
  }, []);

  const handleSelectDocente = (docenteId) => {
    setSelectedDocente(docenteId);
    setShowModal(true);

    // Fetch para obtener las secciones del docente seleccionado
    const fetchSecciones = async () => {
      try {
        const response = await fetch(
          apiurl + `/api/v1/docentes/secciones-docente/?nEmpleado=${docenteId}`,
          {
            headers: {
              "x-token": "bearer " + Cookies.get("x-token"),
            },
          }
        );
        const responseJSON = await response.json();
        setSecciones(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchSecciones();
  };

  const handleSelectSeccion = (seccionId) => {
    setSelectedSeccion(seccionId);

    // Fetch para obtener las calificaciones de la seccion seleccionada
    const fetchCalificaciones = async () => {
      try {
        const response = await fetch(apiurl + `/api/v1/docentes/estudiantes/?seccionID=${seccionId}`, {
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setCalificaciones(responseJSON.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchCalificaciones();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocente("");
    setSelectedSeccion("");
    setSecciones([]);
    setCalificaciones([]);
  };

  const filteredDocentes = docentes.filter((docente) =>
    docente.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarLoggedInComponent urlLogo={'../../assets/unah_logo.png'} />
      {/* Lista de Docentes */}
      <div className="containerP">
        <Regresar />
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Calificaciones por Docente</h2>
          </div>
        </div>
      <div className="row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar Docente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "30%", marginBottom: "10px" }}
            />
            
            <ul className="list-group">
              {filteredDocentes.map((docente) => (
                <li
                  key={docente.ID}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {docente.NOMBRE}
                  <button
                    className="btn btn-secciones btn-outline-success"
                    onClick={() => handleSelectDocente(docente.ID)}
                  >
                    Secciones
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal para Ver Secciones y Evaluaciones */}
      <Modal scrollable show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Secciones del Docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <h4>
            Docente:
              </h4>
              <h5>
              {docentes.find((docente) => docente.ID === selectedDocente)?.NOMBRE}
              </h5>

          {/* Select de Secciones */}
          <div className="mb-3">
            <label htmlFor="secciones" className="form-label">
              Seleccione una sección:
            </label>
            <select
              id="secciones"
              className="form-select"
              value={selectedSeccion}
              onChange={(e) => handleSelectSeccion(e.target.value)}
            >
              <option value="">Selecciona una sección</option>
              {secciones.map((seccion) => (
                <option key={seccion.ID} value={seccion.ID}>
                  {seccion.NOMBRE}
                </option>
              ))}
            </select>
          </div>

          {/* lista de calificaciones */}
          {
            selectedSeccion !== "" && (
              <Table striped bordered hover>
            <thead>
              <tr>
                <th>N° Cuenta</th>
                <th>Nombre</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((calificacion) => (
                <tr key={calificacion.N_CUENTA}>
                  <td>{calificacion.N_CUENTA}</td>
                  <td>{calificacion.NOMBRE_COMPLETO}</td>
                  <td>{calificacion.NOTA === null ? 'N/D' : calificacion.NOTA}</td>
                </tr>
              ))}
            </tbody>
          </Table>
            )
          }


        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE2" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button className='btnE1'>
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JefeDepartamentoCalificacionesDocente
