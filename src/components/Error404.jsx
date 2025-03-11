import React from "react";
import "../styles/Error404.css"; // Importa los estilos CSS

const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <a href="/" className="home-link">Volver al inicio</a>
      </div>
    </div>
  );
};

export default Error404;