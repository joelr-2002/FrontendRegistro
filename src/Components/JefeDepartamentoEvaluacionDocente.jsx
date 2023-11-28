import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarLoggedInComponent from './NavbarLoggedComponente'
import apiurl from '../utils/apiurl'
import Cookies from 'js-cookie'
import Regresar from '../Components/utils/Regresar'


export const JefeDepartamentoEvaluacionDocente = () => {
  const [docentes, setDocentes] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState("");
  const [secciones, setSecciones] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalObservacion, setShowModalObservacion] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [observaciones, setObservaciones] = useState([]);


  const [showObservaciones, setShowObservaciones] = useState([{}]);

  const [isDefinido, setIsDefinido] = useState([]);
  
  const handleOpenObservacion = (observacion, index) =>{
    setShowObservaciones((prev) => ({ ...prev, [index]: true }));
    setObservaciones((prev) => ({ ...prev, [index]: observacion }));
  }

  const handleCloseObservaciones = (index) => () => {
    setShowObservaciones((prev) => ({ ...prev, [index]: false }));
    setObservaciones((prev) => ({ ...prev, [index]: "" }));
  }

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

    // Fetch para obtener las evaluaciones de la sección seleccionada
    const fetchEvaluaciones = async () => {
      try {
        const response = await fetch(
          apiurl + `/api/v1/docentes/evaluaciones-docentes/?seccionID=${seccionId}`,
          {
            headers: {
              "x-token": "bearer " + Cookies.get("x-token"),
            },
          }
        );
        const responseJSON = await response.json();
        setEvaluaciones(responseJSON.data);

      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchEvaluaciones();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocente("");
    setSelectedSeccion("");
    setSecciones([]);
    setEvaluaciones([]);
  };

  const handleCloseModalEvaluaciones = () => {
    setSelectedSeccion("");
    setObservaciones([]);
    setShowObservaciones([{}]);
    setEvaluaciones([]);
  }

  const filteredDocentes = docentes.filter((docente) =>
    docente.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenObservacionModal = (observacion) => () => {
    setShowModalObservacion(true);
    setObservacion(observacion);
  }

  const handleCloseModalObservacion = () => {
    setShowModalObservacion(false);
    setObservacion("");
  }

  useEffect(() => {
    evaluaciones.forEach((element, i) => {
      if (element.AREA_ACADEMICA === null || element.AREA_PERSONAL === null || element.AREA_PROFESIONAL === null) {
        setIsDefinido((prev) => ({ ...prev, [i]: false }));
      } else 
        setIsDefinido((prev) => ({ ...prev, [i]: true }));
    });
  }, [evaluaciones]);

  var testTexto = "Lorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet cons ectetur adipi scing elit. Nullam ac ante mollis quam tristique convallis";

  return (
    <>
      <NavbarLoggedInComponent urlLogo={'../../assets/unah_logo.png'} />
      {/* Lista de Docentes */}
      <div className="containerP">
        <Regresar />
        <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Evaluaciones de Docentes</h2>
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE2" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal tabla de Evaluaciones */}
      <Modal centered fullscreen='xxl' scrollable show={selectedSeccion !== ""} onHide={handleCloseModalEvaluaciones}>
        <Modal.Header closeButton>
          <Modal.Title>Evaluaciones de la Sección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Sección:
          </h4>
          <h5>
            {secciones.find((seccion) => seccion.ID === selectedSeccion)?.NOMBRE}
          </h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Área Personal </th>
                <th> Área Profesional </th>
                <th> Área Acádemica </th>
                <th> Observaciones </th>
              </tr>
            </thead>
            <tbody>
              {evaluaciones.map((evaluacion, index) => (
                <tr key={index}>
                  <td>{evaluacion.AREA_PERSONAL === 1 ? 'MUY MALO' : evaluacion.AREA_PERSONAL === 2 ? 'MALO' : evaluacion.AREA_PERSONAL === 3 ? 'BUENO' : evaluacion.AREA_PERSONAL=== 4 ? 'MUY BUENO' :evaluacion.AREA_PERSONAL === 5 ? 'EXCELENTE' : 'Sin definir'}</td>
                  <td>{evaluacion.AREA_PROFESIONAL === 1 ? 'MUY MALO' : evaluacion.AREA_PROFESIONAL === 2 ? 'MALO' : evaluacion.AREA_PROFESIONAL === 3 ? 'BUENO' : evaluacion.AREA_PROFESIONAL=== 4 ? 'MUY BUENO' : evaluacion.AREA_PROFESIONAL === 5 ? 'EXCELENTE' : 'Sin definir'}</td>
                  <td>{evaluacion.AREA_ACADEMICA === 1 ? 'MUY MALO' : evaluacion.AREA_ACADEMICA === 2 ? 'MALO' : evaluacion.AREA_ACADEMICA === 3 ? 'BUENO' : evaluacion.AREA_ACADEMICA=== 4 ? 'MUY BUENO' : evaluacion.AREA_ACADEMICA === 5 ? 'EXCELENTE' : 'Sin definir'}</td>
                  {isDefinido[index] === true ? (
                    <td className='text-overflow'>
                      <span className='hover:animate-[ping_0.25s_ease-in-out_alternate-reverse_infinite] more-content' onClick={() => handleOpenObservacion(evaluacion.OBSERVACIONES, index+1)}> {showObservaciones[index+1] ? '': 'Ver Observación'} </span>
                      <span>
                        {showObservaciones[index+1] && (
                          <div>
                            <textarea
                              style={{ height: "150px" }}
                              className="form-control"
                              value={observaciones[index] !== null ? observaciones[index] : testTexto}
                              readOnly
                            ></textarea>
                            <Button className="btnE2" onClick={handleCloseObservaciones(index)}>
                              Cerrar
                            </Button>
                          </div>
                        )}
                      </span>
                    </td>
                  ) : <td className='text-overflow'>Encuesta pendiente</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE2" onClick={handleCloseModalEvaluaciones}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      

      {/* Modal Observaciones */}
      <Modal className='fixed inset-0 bg-black bg-opacity-50 z-50 hidden' show={showModalObservacion} onHide={handleCloseModalObservacion} centered>
        <Modal.Header closeButton>
          <Modal.Title>Observación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <textarea style={{ height: "150px"}} className="form-control" value={observacion !== null ? observacion : testTexto} readOnly></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE2" onClick={handleCloseModalObservacion}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
export default JefeDepartamentoEvaluacionDocente
