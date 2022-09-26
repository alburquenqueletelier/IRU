import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";

// import { Context } from "../store/appContext";
// import styles

export const Navbar = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = (e) => {
    e.preventDefault();
    if (!username || username.length < 3) {
      console.log('debes ingresar un usuario valido');
    }
    if (!password) {
      console.log('Debes ingresar una clave');
    }
    return false;
  };

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">IRU</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
              <form className="d-flex" onSubmit={handlelogin}>
              <li className="nav-item">
                <input className="form-control me-2" type="text" placeholder="Usuario" aria-label="Text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
              </li>
              <li className="nav-item">
                <input className="form-control me-2" type="password" placeholder="Constraseña" aria-label="Contraseña" onChange={(e)=>setPassword(e.target.value)}/>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary" type="submit">Login</button>
              </li>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};