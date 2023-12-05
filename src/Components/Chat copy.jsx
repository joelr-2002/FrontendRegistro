
import React, { useState } from "react";
import "../Styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Chat = () => {
  const [sliderAbierto, setSliderAbierto] = useState(false);

  const handleSlider = () => {
    setSliderAbierto(!sliderAbierto);
  };

  const handleCloseButton = () => {
    setSliderAbierto(false);
  };

  return (
    < >
      <div className="chat-container">
        {sliderAbierto === false && (
          <Button className="btn-seccionesNoMargin" onClick={handleSlider}>
            <FontAwesomeIcon icon={faMessage} />
          </Button>
        )}
      </div>

      <div className={`slider-container ${sliderAbierto ? "open" : "close"}`}>
        {sliderAbierto && (
          <div className="slider-content">
            <Button
              className="btn-seccionesNoMargin"
              onClick={handleCloseButton}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
            <p>Contenido del Slider</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
