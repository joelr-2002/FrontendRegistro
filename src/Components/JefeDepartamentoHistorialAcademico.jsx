import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarLoggedInComponent from './NavbarLoggedComponente'
import apiurl from '../utils/apiurl'
import Cookies from 'js-cookie'
import Regresar from './utils/Regresar'
import { Switch } from 'antd'


export const JefeDepartamentoHistorialAcademico = () => {
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [matriculados, setMatriculados] = useState([]);
  const [clases, setClases] = useState([]);
  const [clasesPorEstudiante, setClasesPorEstudiante] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [verEstudiantes, setVerEstudiantes] = useState(true);
  const [verMatriculados, setVerMatriculados] = useState(false);

  const handleVerEstudiantes = () => {
    setVerEstudiantes(true);
    setVerMatriculados(false);
  }

  const handleVerMatriculados = () => {
    setVerEstudiantes(false);
    setVerMatriculados(true);
  }

  const handleSwitchChange = (checked) => {
    if (checked) {
      handleVerMatriculados();
    } else {
      handleVerEstudiantes();
    }
  };


  useEffect(() => {
    // Fetch para obtener la lista de estudiantes y clases por estudiante
    const fetchEstudiantes = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/estudiante/historial-academico", {
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setEstudiantes(responseJSON.estudiante);
        setClasesPorEstudiante(responseJSON.infoestudiante);
        
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchEstudiantes();

    const fetchMatriculados = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/estudiante/matriculados", {
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        setMatriculados(responseJSON.data);
        
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchMatriculados();
  }, []);

  const handleEstudianteSeleccionado = (estudianteId) => {
    setEstudianteSeleccionado(estudiantes.find((estudiante) => estudiante.N_CUENTA === estudianteId));
    setShowModal(true);
    

    // Obtiene las clases del estudiante seleccionado
    var clasesEstudiante = clasesPorEstudiante.filter((clase) => clase.N_CUENTA === estudianteId);
    setClases(clasesEstudiante);
    
  }


  return (
    <>
      <NavbarLoggedInComponent urlLogo={'../../assets/unah_logo.png'} />
      {/* Lista de Estudiantes */}
      <div className="containerP">
        <Regresar />
        <Row>
        <Col>
        </Col>
        <Col>
        </Col>
        <Col>
        <div className="my-3 d-flex justify-content-center">
              {'Ver matriculados: ' + ' '} <Switch className='switch' onChange={handleSwitchChange} /> {verEstudiantes ? '-  No' : '-  Sí'}
          </div>
        </Col>
      </Row>
       { verEstudiantes ? (
       <>
       <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Estudiantes</h2>
          </div>
        </div>

      <div className="row">
          <div className="col">
            <ul className="list-group">
              {estudiantes.map((estudiante) => (
                <li
                  style={{ cursor: "pointer" }}
                  key={estudiante.N_CUENTA}
                  onClick={() => handleEstudianteSeleccionado(estudiante.N_CUENTA)}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {estudiante.NOMBRE_ALUMNO}
                  <span className="badge bg-primary rounded-pill">{estudiante.CARRERA}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
        ): verMatriculados ? (
          <>
          <div className="row my-3">
          <div className="my-3 d-flex justify-content-center">
            <h2>Estudiantes Matriculados</h2>
          </div>
        </div>
      

      <div className="row">
          <div className="col">
            <ul className="list-group">
              {matriculados.map((estudiante) => (
                <li
                  style={{ cursor: "pointer" }}
                  key={estudiante.CUENTA}
                  onClick={() => handleEstudianteSeleccionado(estudiante.CUENTA)}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {estudiante.NOMBRE}
                  <span className="badge bg-primary rounded-pill">{estudiante.CARRERA}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
          </>): null
        }
      </div>

      {/* Modal de Clases por Estudiante */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Historial del Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Asignaturas Cursadas</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((clase) => (
                <tr>
                  <td>{clase.NOMBRE_ASIGNATURA}</td>
                  {
                    clase.CALIFICACION === null ?
                    <td>En Curso</td>
                    :
                    <td>{clase.CALIFICACION}</td>
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnE2" onClick={()=> setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
export default JefeDepartamentoHistorialAcademico;