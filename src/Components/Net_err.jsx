import "../styles/Net_err.css";
import "../styles/custom-bootstrap-colors.scss"
import logo from '../assets/imgs/error.png';


function Net_err() {
    return (
      <>
      {/* <div className="mainContainer container-fluid d-flex justify-content-center align-items-center" > */}
        <div className="row">
          <div className="col">
            <img src={logo} className="img-fluid" alt="..."></img>
          </div>

          <div className="conten_msj col">
            <div className="container text-center">
              
              <div className="col">
                <h1 className="text-white">Opps...</h1>
              </div>

              <div className="col">
                <h1 className="text-white">Parece que no tienes internet</h1>
              </div>
            
            </div>
            
          </div>
        </div>
      {/* </div> */}
      </>
    )
  }
  
  export default Net_err;