import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../styles/orderview.css";

import { Spinners } from "../components/spinners";
import { OrderCard } from "../components/order_card";
import { Detail } from "../components/order_detail";


export const OrderView = () => {

    const { store, actions } = useContext(Context);
    // const [delivery, setDelivery] = useState(null);
    // var total = 0;

    // const locationDelivery = [
    //     { name: "Quilpué", price: 2000 },
    //     { name: "Villa Alemana", price: 2000 },
    //     { name: "Viña del Mar", price: 3000 }
    // ];

    // const handleDelivery = (e) => {
    //     let value = e.target.value;
    //     console.log(value);
    //     if (locationDelivery.map(loc => loc.name).includes(value)) {
    //         setDelivery(locationDelivery.filter(loc => loc.name == value)[0].price);
    //     } else {
    //         setDelivery(null);
    //     }
    // };


    return (
        <div className="container">
            <h1>Tu pedido</h1>
            <div className="d-flex justify-content-evenly">

                <div className="row row-cols-1 me-1 justify-content-center">
                    {(store.order.combos.length > 0 || store.order.rolls.length > 0)
                        ? <div className="col-10 col-md-auto">
                            {store.order.rolls?.map((item, index) => {
                                let aux = store.rolls?.filter(product => product.id == item.id)[0];
                                return (
                                    <OrderCard
                                        key={index}
                                        id={item.id}
                                        product="rolls"
                                        title={aux?.name}
                                        price={aux?.price}
                                        amount={item.amount}
                                        image={aux?.image}
                                    />
                                );
                            })}
                            {store.order.combos?.map((item, index) => {
                                let aux = store.combos?.filter(product => product.id == item.id)[0];
                                return (
                                    <OrderCard
                                        key={index}
                                        id={item.id}
                                        product="combos"
                                        title={aux?.name}
                                        price={aux?.price}
                                        amount={item.amount}
                                        image={aux?.image}
                                    />
                                );
                            })}
                        </div>
                        : (store.order.rolls.length == 0 && store.order.combos.length == 0)
                            ? <h2>No hay productos. <Link to="/products">Agregalos...</Link></h2>
                            : <Spinners />
                    }
                </div>
                {(store.order.rolls.length > 0 || store.order.combos.length > 0) &&
                    <Detail displayMode="d-none" />
                }
            </div>

            {/* <!-- Button trigger modal --> */}
            {(store.order.rolls.length > 0 || store.order.combos.length > 0) &&
                <button id="modal-order-button" type="button" className="btn btn-info rounded-circle d-md-none" data-bs-toggle="modal" data-bs-target="#orderDetailModal">
                    <img src="https://cdn-icons-png.flaticon.com/512/6957/6957439.png" alt="Pedido" />
                </button>

            }

            {/* <!-- Modal --> */}
            <div className="modal fade" id="orderDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Detalles compra</h1> */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Detail />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
};

