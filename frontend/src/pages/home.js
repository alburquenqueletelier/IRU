import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { Registerform } from "../components/register_form";
import { Carousel } from "../components/carousel";
import { Spinners } from "../components/spinners";
import HomeMap from "../components/map_iru_loc";


export const Home = () => {

  const { store, actions } = useContext(Context);
  // const [image] = useState('http:127.0.0.1:8000\rolls\logo\logo_color.png');
  const [image] = useState(process.env.REACT_APP_BACKEND_URL + '/media/rolls/logo/logo_color.png');

  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-8">
          <h1 className="text-center">I Roll You - Cinnamon</h1>
          <p className="text-center">
            Somos un emprendimiento que busca deleitar a los amantes de los Cinnamon Rolls.
            Utilizamos productos de calidad y ponemos nuestra pasión para poder entregar una experiencia única,
            buscando el sabor perfecto para que puedas disfrutar de estas delicias.
          </p>
        </div>
      </div>
      <div className="row row-cols-2 justify-content-center my-3">
        <div className="col">
          {/* <h2 className="text-center">Destacados</h2> */}
          {store?.carousels ?
            <Carousel />
            : <Spinners />
          }
        </div>
      </div>

      <div className="row justify-content-center my-3">
        <div className="col-auto">

          <h1 className="text-center">¿Como Pedir?</h1>
          {/* <p className="text-center">A través de Whatsapp o Instagram</p> */}
          <ol >
            <li>Dirigete a la sección <Link to="/products">Menú</Link></li>
            <li>Busca lo que desees, selecciona la cantidad y presiona añadir</li>
            <li>Dirigete al carrito y verifica tus productos</li>
            <li>Dale a comprar para enviar tu pedido por Whatsapp</li>
          </ol>
        </div>
      </div>

      <div className="row justify-content-center my-3">
        <h1 className="text-center">Reparto</h1>
        <div className="text-center ">
          <p>Puedes retirar en nuestro local, Estación El Sol o Estación Quilpué</p>
          <div className="d-flex justify-content-center my-2">
            <HomeMap />

          </div>
          <p>Delivery con costo adicional, gratis por compras sobre $15.000</p>
          <div className="table-responsive">

            <table className="table table-borderless m-auto w-auto">
              <thead>
                <tr>
                  <td>
                    Ciudad
                  </td>
                  <td>
                    Tarifa
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Quilpué
                  </td>
                  <td>
                    $2.000
                  </td>
                </tr>
                <tr>
                  <td>
                    Villa Alemana
                  </td>
                  <td>
                    $2.000
                  </td>
                </tr>
                <tr>
                  <td>
                    Viña del Mar
                  </td>
                  <td>
                    $3.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="row justify-content-center my-3">

        <h1 className="text-center">Horarios</h1>
        <h3 className="text-center">Atención pedidos</h3>
        <p className="text-center">Lunes a Domingo, de 9:00h a 22:00h</p>
        <h3 className="text-center">Entregas </h3>
        <ul className="text-center">
          <li>Viernes: 18:00h a 21:00h</li>
          <li>Sabados: 10:00h a 13:00h y 18:00h a 21:00h</li>
          <li>Domingos: 10:00h a 13:00h y 18:00h a 21:00h</li>
        </ul>
      </div>
      <div className="logo-container">
        <img src={image} className="img-fluid logo-home" alt="Logo IRU"></img>
      </div>
    </div>
  );
};

