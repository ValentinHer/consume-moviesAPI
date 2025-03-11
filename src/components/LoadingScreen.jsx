import React from "react";
import "../styles/LoadingScreen.css"; // Importa los estilos CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa FontAwesome
import { faHourglass } from "@fortawesome/free-solid-svg-icons"; // Importa el ícono de reloj de arena

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loader">
        <FontAwesomeIcon icon={faHourglass} /> {/* Ícono de reloj de arena */}
      </div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingScreen;