import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Atras = () => {
  const handleRegresar = () => {
    window.history.back();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <button style={{ border: 'none', background: 'none', color: '#01587a' }} onClick={handleRegresar}>
        <FontAwesomeIcon className='hover:animate-[pulse_0.5s_ease-in-out_infinite] active:animate-[ping_0.25s_ease-in-out_infinite]' icon={faArrowLeft} size='xl' />
      </button>
    </div>
  );
};

export default Atras;
