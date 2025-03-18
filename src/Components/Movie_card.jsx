import "../styles/Movie_card.css";
import "../styles/custom-bootstrap-colors.scss"
import logo from '../assets/imgs/error.png';



function Movie_card({img, titulo, descripcion, fecha_estreno}) {
    return (
      <>
      <div className="card text-bg-light mb-3">
        <img src={img} class="card-img-top" alt="..."></img>
        <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{descripcion}</p>
        </div>
        <div className="card-footer">
            <small className="text-body-secondary">{fecha_estreno}</small>
        </div>
      </div>
      </>
    )
  }
  
  export default Movie_card