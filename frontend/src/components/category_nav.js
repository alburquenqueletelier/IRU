import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CategoryNav = () => {

    const { store } = useContext(Context);

    return (
        <div className="bg-light rounded-bottom" style={{position: "sticky", top:"4rem", zIndex: 9}}>
            <ul className="nav justify-content-around">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#rollsHeader">Rolls</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#combosHeader">Combos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#toppingsHeader">Salsas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#aggregatesHeader">Agregados</a>
                </li>
            </ul>
        </div>
    );
};