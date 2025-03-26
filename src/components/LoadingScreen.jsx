import React from "react";
import "../styles/LoadingScreen.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => {
  return (
    <div className="loading-container bg-secondary">
      <div className="loader">
        <FontAwesomeIcon icon={faHourglass} /> 
      </div>
      <p className="text-light" >Cargando...</p>
    </div>
  );
};

export default LoadingScreen;