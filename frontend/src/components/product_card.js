import React from "react";
import PropTypes from "prop-types";

import "../styles/productcard.css";

export const ProductCard = (props) => {

    return (
        <div className="card">
            <img src={props.image} className="card-img-top size-card" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text text-danger">{props.price}</p>
                <button className="btn btn-primary">Añadir</button>
            </div>
        </div>
    );
};

ProductCard.propsTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
    price: PropTypes.number
};