import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { ProductCard } from "../components/product_card";
import { Registerform } from "../components/register_form";
import { Carousel } from "../components/carousel";
import { Spinners } from "../components/spinners";

export const Home = () => {

  const { store, actions } = useContext(Context);
  const [file, setFile] = useState("");
  const [fileSelected, setFileSelected] = useState("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileSelected(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <div id="home" className="container-fluid">
    {/* <h1 className="text-center">I Roll You</h1> */}
    <div className="row justify-content-center">
      <div className="col-auto">
    <img src="http://127.0.0.1:8000/media/rolls/Logo_iru.png" style={{borderRadius: "50%"}} alt="Logo IRU"></img>

      </div>

    </div>
    <div className="row justify-content-center mb-2">
      {!!fileSelected &&
        <img style={{ width: "600px", height: "480px" }} src={fileSelected} />
      }
    </div>
    <hr></hr>
    <div className="row row-cols-2 justify-content-center">
      {store?.carousels ?
       <Carousel />
        : <Spinners />
      }
    </div>
    <hr id="products"></hr>
    <h1 className="text-center">Rolls</h1>
    <div className="row row-cols-4">
      {store.rolls ?
        store.rolls.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard id={item.id} title={item.name} description={item.description} image={item.image} price={item.price} />
            </div>
          );
        })
        : <Spinners />
      }
    </div>
    <hr></hr>
    <h1 className="text-center">Combos</h1>
    <div className="row row-cols-4">
      {store.combos ? 
        store.combos.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard title={item.name} description={item.description} price={item.price} />
            </div>
          );
        })
        : <Spinners />
      }
    </div>
    <hr id="register"></hr>
    <h1 className="text-center">Registrate y Disfruta</h1>
    <div className="d-flex justify-content-center">
      <ul className="list-group-numbered">
        <li className="list-group-item">Haz tus pedidos de forma rápida</li>
        <li className="list-group-item">Puedes repetir el último pedido</li>
        <li className="list-group-item">Disfrutar de beneficios</li>
      </ul>
    </div>
    <Registerform />
  </div>
  );
};

