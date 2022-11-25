import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
import "../styles/productdetail.css";

export const ProductDetail = () => {

    const { store, actions } = useContext(Context);
    const [data, setData] = useState();

    useEffect(() => {
        if (store.detail.product == 'rolls') setData(store.rolls.filter(roll => roll.id == store.detail.id)[0]);
        else setData(store.combos.filter(combo => combo.id == store.detail.id)[0]);
    }, [store.detail]);

    return (
        <div className="modal fade" id="modalDetail" tabIndex="-1" aria-labelledby="modalDetailLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src=
                            {data?.image}
                            alt="product"
                        />

                    </div>
                    <div className="modal-body">
                        <h5 className="modal-title fs-5">{data?.name}</h5>
                        <div className="row row-cols-1 row-cols-sm-2">
                            <div className="col-sm-2">
                                <p>Base:</p>
                            </div>
                            <div className="col-sm-10">
                                <p> {data?.base}</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Salsa:</p>
                            </div>
                            <div className="col-sm-10">
                                <p> {data?.topping?.length > 0 ?
                                    data?.topping.map((item, index) => {
                                        return <span key={index}>{item} {(data?.topping.length > 1 && index < data?.topping.length) && ','}</span>;
                                    })
                                    : '-'
                                }
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <p>Agregado:</p>
                            </div>
                            <div className="col-sm-10">
                                <p> {data?.aggregate ? data.aggregate : '-'} </p>
                            </div>
                            <div className="col-sm-2">
                                <p>Description:</p>
                            </div>
                            <div className="col-sm-10">
                                <p> {data?.description}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetail.propsTypes = {
    id: PropTypes.number,
    product: PropTypes.string,
};