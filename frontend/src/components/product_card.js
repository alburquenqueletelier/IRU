import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../styles/productcard.css";

export const ProductCard = (props) => {
    // const { store, actions } = useContext(Context);
    const [amount, setAmount] = useState(props.amount ? props.amount : 1);

    const changeAmount = (value) => {
        if (value > 0 && value < 10) return setAmount(value);
    };

    return (
        <div className="card">
            <div className="img-container">
                <img src={props.image} className="card-img-top size-image" alt="..." />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text text-success">${props.price}</p>
                {props.buttonMessage !== 'Remover' 
                ? <p className="card-text text-center"><button className="btn btn-outline-danger" onClick={()=>changeAmount(amount-1)}>-</button><span>{amount}</span><button className="btn btn-outline-primary" onClick={()=>changeAmount(amount+1)}>+</button></p>
                :  <p className="card-text">Cantidad: <span>{amount}</span></p>
                }
                <button className={"btn btn-" + (props.buttonMessage === 'Remover' ? 'danger' : 'primary')} onClick={()=>props.addOrRemove("rolls", props.id, props.buttonMessage == "Añadir" && amount)}>{props.buttonMessage}</button>
            </div>
        </div>
    );
};

ProductCard.propsTypes = {
    id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
    price: PropTypes.number
};