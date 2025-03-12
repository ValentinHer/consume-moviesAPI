import { useState } from "react";
//import "./styles/app.css";
import {} from "bootstrap";

function App() {
  const [valueBuscador, setValueBuscador] = useState("");

  const handleChange = (event) => {
    setValueBuscador(event.target.value);
    console.log(event.target.value);
  }

  return (
    <>
      <div className="mainContainer bg-primary p-5 container-fluid d-flex justify-content-center align-items-center flex-column ">
        <div class="mb-3 w-50 ">
          <input
            type="email"
            class="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Buscar Película"
            value={valueBuscador}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default App;
