import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../styles/orderview.css";

import { Spinners } from "../components/spinners";
import { OrderCard } from "../components/order_card";
import { Detail } from "../components/order_detail";
import { ToastProduct } from "../components/toastProduct";


export const OrderView = () => {

    const { store, actions } = useContext(Context);

    const resizeObserver = new ResizeObserver((element)=>{
        // console.log(element[0].target.offsetHeight);
        if (window.innerWidth <= 767 && document.querySelector('#modal-order-button')){
            const buttonModalDetail = document.querySelector('#modal-order-button');
            buttonModalDetail.style.position = 'fixed';
            buttonModalDetail.style.top = (element[0].target.offsetHeight+5)+'px';
            buttonModalDetail.style.left = (window.innerWidth-100)+'px';
            // console.log('height navbar: ', element);
        } 
    });

    useEffect(()=>{
        const buttonModalDetail = document.querySelector('#modal-order-button');
        if (buttonModalDetail){
            resizeObserver.observe(document.querySelector('nav'));
        } else {
            resizeObserver.disconnect();
        }
    }, );

    return (
        <div className="container">
            {/* Toast */}
            <ToastProduct />
            {/* <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header bg-light">
                        <strong>{store?.toast}</strong>
                        <img src={store.toast == "Añadido con éxito" ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" : "https://cdn-icons-png.flaticon.com/512/190/190406.png"} className="rounded me-auto" alt="..." style={{ width: "2rem" }} />
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div> */}
            {/* Toast */}
            <h1 className="text-center">Tu pedido</h1>
            <div className="d-flex justify-content-evenly pb-1">


                {(store.order.combos.length > 0 || store.order.rolls.length > 0)
                    ? <div className="col-sm-8 col-10 me-1">
                        {store.order.rolls?.map((item, index) => {
                            let aux = store.rolls?.filter(product => product.id == item.id)[0];
                            return (<div key={index} className="col-auto">
                                <OrderCard

                                    id={item.id}
                                    product="rolls"
                                    title={aux?.name}
                                    price={aux?.price}
                                    amount={item.amount}
                                    image={aux?.image}
                                />
                            </div>
                            );
                        })}
                        {store.order.combos?.map((item, index) => {
                            let aux = store.combos?.filter(product => product.id == item.id)[0];
                            return (<div key={index} className="col-auto">
                                <OrderCard

                                    id={item.id}
                                    product="combos"
                                    title={aux?.name}
                                    price={aux?.price}
                                    amount={item.amount}
                                    image={aux?.image}
                                />
                            </div>
                            );
                        })}
                    </div>
                    : (store.order.rolls.length == 0 && store.order.combos.length == 0)
                        ? <h2>No hay productos. <Link to="/products">Agregalos...</Link></h2>
                        : <Spinners />
                }

                {(store.order.rolls.length > 0 || store.order.combos.length > 0) &&
                    <Detail displayMode=" d-md-flex d-none" deliveryTag="deliveryTag" retiroTag="retiroTag" />
                }
            </div>

            {/* <!-- Button trigger modal --> */}
            {(store.order.rolls.length > 0 || store.order.combos.length > 0) &&
                <button id="modal-order-button" type="button" className="btn btn-info rounded-circle d-md-none" data-bs-toggle="modal" data-bs-target="#orderDetailModal">
                    <img src="https://cdn-icons-png.flaticon.com/512/6737/6737602.png" alt="Pedido" />
                </button>

            }

            {/* <!-- Modal --> */}
            <div className="modal fade" id="orderDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Detail displayMode="d-flex" deliveryTag="deliveryModalTag" retiroTag="retiroModalTag" />
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
};

