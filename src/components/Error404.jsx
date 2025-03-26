import React from "react";
import "../styles/Error404.css"; 

const Error404 = () => {
  return (
    <div className="error-container bg-secondary">
      <div className="error-content bg-primary">
        <h1>404</h1>
        <h2>Pelicula no encontrada</h2>
        <p>Lo sentimos, la pelicula que estás buscando no existe.</p>
      </div>
    </div>
  );
};

export default Error404;