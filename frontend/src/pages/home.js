import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";
 
export const Home = () => {
  const { store, actions } = useContext(Context);
  return <div className="home">
    <h2>I Roll You</h2>
    <button onClick={()=>actions.getMessage()}>Clicks</button>
    </div>;
}
 
