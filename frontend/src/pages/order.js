import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

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

                <div className="row row-cols-1">
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
                <div className="bg-white d-flex flex-column text-center align-items-stretch sticky-md-top" style={{height: "fit-content"}}>
                    <h2>Detalles compra</h2>
                    <ul className="list-group list-group-flush">
                        {store.order.rolls && store.order.rolls.map((item, index) => {
                            { total = total + item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price; }
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.rolls.filter(roll => roll.id == item.id)[0]?.name} x {item.amount} <span className="ms-1">${item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price}</span>
                            </li>;
                        })}
                        {store.order.combos && store.order.combos.map((item, index) => {
                            return <li className="list-group-item d-flex justify-content-between" key={index}>
                                {store.combos.filter(combo => combo.id == item.id)[0]?.name} x {item.amount} <span className="ms-1"> ${item.amount * store.combos.filter(combo => combo.id == item.id)[0]?.price}</span>
                            </li>;
                        })}
                    </ul>
                    <div>
                        Delivery = {
                            total >= 15000
                                ? "Gratis!"
                                : !!delivery && "$" + delivery
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
                    <p>TOTAL = ${total >= 15000 ? total : total + delivery}</p>
                </div>
            </div>

        </div>

    );
};

