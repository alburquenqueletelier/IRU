import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, NavLink } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/navbar.css";

export const Navbar = () => {

  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image] = useState(process.env.REACT_APP_BACKEND_URL + '/media/rolls/logo/logo_timbre.png');

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
    console.log(username, password);
    return actions.login(username, password);
  };

  const handleToggle = () => {
    if (window.innerWidth <= 767){
      const bsCollapse = new bootstrap.Collapse('#navbarSupportedContent', { // eslint-disable-line
        toggle: false
      });
      bsCollapse.toggle();
    }

  };

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top">
        <div className="container justify-content-center text-center">
          <div className="row justify-content-center">
            <div className="col-auto">
              <a className="navbar-brand" href="/">
                <div className="container-logo-home">
                  <img src={image} alt="logo-home" />
                </div>
              </a>
            </div>
            <div className="col-auto pt-2">
              {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={(e)=>handleToggle(e)}> */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" onClick={(e) => handleToggle(e)}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-md-auto col-12 pt-md-2 pt-0">

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item ">
                    <Link to="/products" className="nav-link" onClick={handleToggle}>
                      Menú
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/order" className="nav-link" onClick={handleToggle}>
                      Carrito
                      {(store.order.rolls?.length > 0 || store.order.combos?.length > 0) &&
                        <span className="badge text-bg-secondary">{store.order.rolls.length + store.order.combos.length}</span>
                      }
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link" onClick={handleToggle}>Contacto</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about-us" className="nav-link" onClick={handleToggle}>Sobre Nosotros</Link>
                  </li>
                </ul>
                {/* <form className="d-md-flex d-inline-block text-center" onSubmit={handlelogin}>
                <input className="form-control me-2" type="text" placeholder="Usuario" aria-label="Text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="form-control me-2" type="password" placeholder="Constraseña" aria-label="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-outline-primary" type="submit">Login</button>
              </form>
              <a className="btn btn-outline-primary ms-1" href="#register">Registrate</a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};