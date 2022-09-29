import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";
 
export const Home = () => {
  const { actions } = useContext(Context);
  return <div className="home">
    <h2>I Roll You</h2>
    <button onClick={()=>actions.getAllUsers()}>Users</button>
    <button onClick={()=>actions.getAllBases()}>Bases</button>
    <button onClick={()=>actions.getAllToppings()}>Salsas</button>
    <button onClick={()=>actions.getAllAggregates()}>Agregados</button>
    </div>;
};
 
