import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../styles/ordercard.css";

export const OrderCard = (props) => {
    const { actions } = useContext(Context);
    const [amount, setAmount] = useState(props.amount);

    const changeAmount = (value) => {
        if (value > 0 && value < 10) {
            // Falta cambiar el valor del store cuando cambia acá 
            actions.editOrder(props.product, props.id, value);
            return setAmount(value);
        }
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={props.image} className="img-card" alt="..." />

                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div className="card-body justify-content-around align-items-center align-items-md-stretch d-flex flex-column">
                        <h5 className="card-title">{props.title}</h5>
                        <div className="d-flex flex-column justify-content-lg-around align-items-baseline">
                            <p className="card-text"><strong className="text-danger">Valor: </strong> {actions.valueToPrice(1, props.price)}</p>
                            <p className="card-text text-center"><button className="btn btn-outline-danger" onClick={() => changeAmount(amount - 1)}>-</button><span className="counter">{amount}</span><button className="btn btn-outline-primary" onClick={() => changeAmount(amount + 1)}>+</button></p>
                            <p className="card-text"><strong className="text-danger">Total: </strong> {actions.valueToPrice(amount, props.price)}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger" onClick={() => actions.deleteOrder(props.product, props.id)}>Quitar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderCard.propsTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
};