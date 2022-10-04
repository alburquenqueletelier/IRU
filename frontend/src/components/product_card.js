import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../styles/productcard.css";

export const ProductCard = (props) => {
    // const { store, actions } = useContext(Context);
    const [amount, setAmount] = useState(1);
    const [id, setID] = useState(props.id);

    const changeAmount = (value) => {
        if (value > 0 && value < 10) return setAmount(value);
    };

    return (
        <div className="card">
            <img src={props.image} className="card-img-top size-image" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text text-success">${props.price}</p>
                <p className="card-text text-center"><button className="btn btn-outline-danger" onClick={()=>changeAmount(amount-1)}>-</button><span>{amount}</span><button className="btn btn-outline-primary" onClick={()=>changeAmount(amount+1)}>+</button></p>
                <button className="btn btn-primary" onClick={props.addOrRemove}>Añadir</button>
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