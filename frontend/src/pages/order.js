import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/orderview.css";

import { Spinners } from "../components/spinners";
import { OrderCard } from "../components/order_card";


export const Order = () => {

    const { store, actions } = useContext(Context);
    const [delivery, setDelivery] = useState(null);
    var total = 0;

    const locationDelivery = [
        { name: "Quilpué", price: 2000 },
        { name: "Villa Alemana", price: 2000 },
        { name: "Viña del Mar", price: 3000 }
    ];

    const handleDelivery = (e) => {
        let value = e.target.value;
        console.log(value);
        if (locationDelivery.map(loc => loc.name).includes(value)) {
            setDelivery(locationDelivery.filter(loc => loc.name == value)[0].price);
        } else {
            setDelivery(null);
        }
    };


    return (
        <div className="container">
            <h1>Tu pedido</h1>
            <div className="d-flex justify-content-evenly">

                <div className="row row-cols-1 me-1">
                    {(store.order.combos.length > 0 || store.order.rolls.length > 0)
                        ? <div className="col">
                            {store.order.rolls?.map((item, index) => {
                                let aux = store.rolls?.filter(product => product.id == item.id)[0];
                                return (
                                    <OrderCard
                                        key={index}
                                        id={item.id}
                                        type="rolls"
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
                                        type="rolls"
                                        title={aux?.name}
                                        price={aux?.price}
                                        amount={item.amount}
                                        image={aux?.image}
                                    />
                                );
                            })}
                        </div>
                        : (store.order.rolls.length == 0 && store.order.combos.length == 0)
                            ? <h2>No hay productos. Agregalos...</h2>
                            : <Spinners />
                    }
                </div>
                <div className="bg-white d-none d-md-flex flex-column text-center align-items-stretch rounded" style={{height: "fit-content", position: "sticky", top:"90px"}}>
                    <h2>Detalles compra</h2>
                    <ul className="list-group list-group-flush">
                        {store.order.rolls && store.order.rolls.map((item, index) => {
                            { total = total + item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price; }
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.rolls.filter(roll => roll.id == item.id)[0]?.name} x {item.amount} <span className="ms-1">{actions.valueToPrice(item.amount, store.rolls.filter(roll => roll.id == item.id)[0]?.price)}</span>
                            </li>;
                        })}
                        {store.order.combos && store.order.combos.map((item, index) => {
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.combos.filter(combo => combo.id == item.id)[0]?.name} x {item.amount} <span className="ms-1"> {actions.valueToPrice(item.amount, store.combos.filter(combo => combo.id == item.id)[0]?.price)}</span>
                            </li>;
                        })}
                    </ul>
                    <div>
                        Delivery = {
                            total >= 15000
                                ? "Gratis!"
                                : !!delivery && actions.valueToPrice(1, delivery)
                        }
                        <div>
                            <input list="ciudades" name="ciudades" placeholder="Selecciona tu localidad" onChange={handleDelivery} />
                            <datalist id="ciudades">
                                {locationDelivery.map((item, index) => {
                                    return <option key={index} value={item.name}>{item.price}</option>;
                                })}
                            </datalist>
                        </div>
                    </div>
                    <p>TOTAL = {total >= 15000 ? actions.valueToPrice(1,total) : actions.valueToPrice(1,total + delivery)}</p>
                </div>
            </div>
            
            {/* <!-- Button trigger modal --> */}
<button id="modal-order-button" type="button" className="btn btn-info rounded-circle d-md-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <img src="https://cdn-icons-png.flaticon.com/512/6957/6957439.png" alt="Pedido" />
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Detalles compra</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <ul className="list-group list-group-flush">
                        {store.order.rolls && store.order.rolls.map((item, index) => {
                            { total = total + item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price; }
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.rolls.filter(roll => roll.id == item.id)[0]?.name} x {item.amount} <span className="ms-1">{actions.valueToPrice(item.amount, store.rolls.filter(roll => roll.id == item.id)[0]?.price)}</span>
                            </li>;
                        })}
                        {store.order.combos && store.order.combos.map((item, index) => {
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.combos.filter(combo => combo.id == item.id)[0]?.name} x {item.amount} <span className="ms-1"> {actions.valueToPrice(item.amount, store.combos.filter(combo => combo.id == item.id)[0]?.price)}</span>
                            </li>;
                        })}
                    </ul>
                    <div>
                        Delivery = {
                            total >= 15000
                                ? "Gratis!"
                                : !!delivery && actions.valueToPrice(1, delivery)
                        }
                        <div>
                            <input list="ciudades" name="ciudades" placeholder="Selecciona tu localidad" onChange={handleDelivery} />
                            <datalist id="ciudades">
                                {locationDelivery.map((item, index) => {
                                    return <option key={index} value={item.name}>{item.price}</option>;
                                })}
                            </datalist>
                        </div>
                    </div>
                    <p>TOTAL = {total >= 15000 ? actions.valueToPrice(1,total) : actions.valueToPrice(1,total + delivery)}</p>
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

