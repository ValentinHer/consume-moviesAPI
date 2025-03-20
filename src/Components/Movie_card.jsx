import "../styles/Movie_card.css";
import "../styles/custom-bootstrap-colors.scss";
// import logo from '../assets/imgs/error.png';

function Movie_card({ img, titulo, descripcion, reparto }) {
  return (
    <>
      <div className="col-12">
        <div className="card text-bg-light" style={{overflow: "hidden"}} >
          <img src={img} class="card-img-top w-50 h-50 " alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{descripcion}</p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">{reparto}</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie_card;
