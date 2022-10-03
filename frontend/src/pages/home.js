import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { ProductCard } from "../components/product_card";
import { Registerform } from "../components/register_form";
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
      {store.rolls ?
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="http://127.0.0.1:8000/media/rolls/rolls_veganos_nutella_IEvFv3G.jpeg" className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="http://127.0.0.1:8000/media/rolls/rolls_clasicos_AxCGut6.jpeg" className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="http://127.0.0.1:8000/media/rolls/cinnamon_bittes_4k2tioM.jpeg" className="d-block w-100" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
        : <div>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
    <hr id="productos"></hr>
    <h1 className="text-center">Rolls</h1>
    <div className="row row-cols-4">
      {store.rolls ?
        store.rolls.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard title={item.name} description={item.description} image={item.image} price={item.price} />
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
    <Registerform />
  </div>
  );
};

