import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// import styles

export const Navbar = () => {

  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = (e) => {
    e.preventDefault();
    if (!username || username.length < 3) {
      console.log('debes ingresar un usuario valido');
      return false;
    }
    if (!password) {
      console.log('Debes ingresar una clave');
      return false;
    }
    return actions.login(username, password);
  };

  return (
    <>

      <nav className="navbar navbar-expand-md bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">IRU</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#productos">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
            </ul>
            <form className="d-md-flex d-inline-block text-center" onSubmit={handlelogin}>
              <input className="form-control me-2" type="text" placeholder="Usuario" aria-label="Text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="form-control me-2" type="password" placeholder="Constraseña" aria-label="Contraseña" onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-outline-primary" type="submit">Login</button>
            </form>
              <a className="btn btn-outline-primary ms-1" href="#register">Registrate</a>
          </div>
        </div>
      </nav>
    </>
  );
};