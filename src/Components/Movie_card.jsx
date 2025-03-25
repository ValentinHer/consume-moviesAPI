import "../styles/Movie_card.css";
import "../styles/custom-bootstrap-colors.scss";
// import logo from '../assets/imgs/error.png';

function Movie_card({ img, titulo, descripcion, reparto }) {
  const repartLimitado = reparto.slice(0, 10).join(", ") + (reparto.length > 3 ? " y más..." : "");
  const descLimitado = descripcion.length > 200 ? descripcion.slice(0, 200) + "..." : "";

  return (
    <>
      <div className="col bg-secondary pb-4" >
        <div className="d-flex flex-column text-bg-light h-100 rounded" style={{overflow: "hidden", padding: "24px"}} >
          <img src={img} class="card-img-top rounded" style={{objectFit: "cover"}} alt="..."></img>
          <div className="card-body">
            <h5 className="card-title my-3">{titulo}</h5>
            <p className="card-text mb-3">{descLimitado}</p>
          </div>
          <div className="card-footer">
            <h6 className="card-title" >Casting:</h6>
            <small className="text-body-secondary">{ repartLimitado }</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie_card;
