import React from "react";
import PropTypes from "prop-types";

export const OrderCard = (props) => {
    // title={item.name} description={item.description} image={item.image} price={item.price}
    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.image} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text"><strong className="text-danger">Valor: </strong> {props.price}</p>
                        <p className="card-text"><strong className="text-danger">Cantidad: </strong> {props.amount} <button className="btn btn-outline-primary">+</button> <button className="btn btn-outline-danger">-</button></p>
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