import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../styles/productcard.css";

export const ProductCard = (props) => {
    const { store, actions } = useContext(Context);
    const [amount, setAmount] = useState(props.amount);

    const changeAmount = (value) => {
        if (value >= 0 && value < 10) return setAmount(value);
    };

    const valueToPrice = (amount, price) => {
        let value = amount * price;
        let response = Number(Number(value).toFixed()).toLocaleString('en');
        return '$' + response.replace(',', '.');
    };

    return (
        <div className="card">
            <img src={props.image} className="size-image" alt="..." />
            <div className="card-body d-flex flex-column ">
                <h6 className="card-title">{props.title}</h6>
                {/* <p className="card-text description">{props.description}</p> */}
                <p className="card-text text-success">${props.price}</p>
                {props.buttonMessage !== 'Quitar'
                    ? <p className="mt-auto align-items-center"><button className="btn btn-outline-danger" onClick={() => changeAmount(amount - 1)}>-</button><span className="counter text-center align-middle">{amount}</span><button className="btn btn-outline-primary" onClick={() => changeAmount(amount + 1)}>+</button><span className="ms-2 align-middle total-per-product">{amount != 0 ? valueToPrice(amount, props.price) : ""}</span></p>
                    : <div className="mt-auto d-flex justify-content-around"><p className="card-text">Cantidad: <span>{amount}</span> </p> <p className="card-text">Valor: <span>{valueToPrice(amount, props.price)}</span></p></div>
                }
                <div className="mt-auto row row-cols-2">
                    <button className={"btn btn-outline-" + (props.buttonMessage === 'Quitar' ? 'danger' : 'primary')} onClick={() => props.addOrRemove(props.product, props.id, props.buttonMessage == "Añadir" && amount)}>{props.buttonMessage}</button>
                    <button className="btn btn-outline-success" onClick={()=>actions.displayDetail(props.id, props.product)}>Detalles</button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propsTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    product: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number
};