import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { ProductCard } from "../components/product_card";

export const ProductsView = () => {

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

  return <div id="home" className="container-fluid">
    {/* <button onClick={() => actions.getAllUsers()}>Users</button>
    <button onClick={() => actions.getAllBases()}>Bases</button>
    <button onClick={() => actions.getAllToppings()}>Salsas</button>
    <button onClick={() => actions.getAllAggregates()}>Agregados</button>
    <button onClick={() => actions.getAllRolls()}>Rolls</button>
    <button onClick={() => actions.getAllCombos()}>Combos</button>
    <button onClick={() => actions.getAllTest()}>Test</button> */}
    {/* <form onSubmit={(e) => actions.postTest(e, file)}>
      <input
        type="file"
        id="fileUp"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form> */}
    <h1 className="text-center">Rollitos</h1>
    <div className="row justify-content-center mb-2">
      {!!fileSelected &&
        <img style={{ width: "600px", height: "480px" }} src={fileSelected} />
      }
    </div>
    <hr></hr>
    <div className="row row-cols-4">
      {store.rolls ?
        store.rolls.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard title={item.name} description={item.description} image={item.image} price={item.price} />
            </div>
          );
        })
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
    <hr></hr>
    <div className="row row-cols-4">
      {!!store.combos &&
        store.combos.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard title={item.name} description={item.description} price={item.price} />
            </div>
          );
        })
      }
    </div>
    {/* <div>
      {!!store.test &&
        store.test.map((item, index) => {
          return (
            <div key={index}>
              <img style={{width: "300px", height: "300px"}} src={item.imagen} />
            </div>
          );
        })
      }
    </div> */}
  </div>;
};

