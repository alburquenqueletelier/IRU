import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Detail = (props) => {

    const { store, actions } = useContext(Context);
    const [chooseCity, setChooseCity] = useState("");
    const [delivery, setDelivery] = useState(null);
    const [displayDelivery, setDisplayDelivery] = useState("d-none");
    const [displayRetiro, setDisplayRetiro] = useState("d-none");
    var total = 0;

    const locationDelivery = [
        { name: "Quilpué", price: 2000 },
        { name: "Villa Alemana", price: 2000 },
        { name: "Viña del Mar", price: 3000 }
    ];

    const handleDelivery = (e) => {
        let value = e.target.value;
        setChooseCity(value);
        // console.log(value);
        // if (value) setDelivery(parseInt(value));
        // else setDelivery(null);
        // console.log(value);
        if (locationDelivery.map(loc => loc.name).includes(value)) {
            setDelivery(locationDelivery.filter(loc => loc.name == value)[0].price);
        } else {
            setDelivery(null);
        }
    };

    const handleChoose = (src) => {
        // console.log('pase por choose', src.target.value);
        if (src.target.value == 'Delivery') {
            setDisplayDelivery("d-block");
            setDisplayRetiro("d-none");
        }
        if (src.target.value == 'Retiro') {
            // document.querySelector('[name="ciudades"]').value = null;
            setChooseCity("");
            setDelivery(null);
            setDisplayDelivery("d-none");
            setDisplayRetiro("d-block");
        }
    };

    useEffect(() => {
        const initialChoose = document.querySelector(`#${props.deliveryTag}`);
        if (initialChoose) {
            initialChoose.click();
            initialChoose.checked = true;
        }
    }, []);

    return (
        <div className={"bg-white flex-column text-center align-items-stretch rounded p-2 " + props.displayMode} style={{ height: "fit-content", position: "sticky", top: "90px" }}>
            <h2>Detalles Pedido</h2>
            <ul className="list-group list-group-flush">
                {store.order.rolls && store.order.rolls.map((item, index) => {
                    { total = total + item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price; }
                    return <li className="list-group-item d-flex justify-content-between" key={index}>
                        {store.rolls.filter(roll => roll.id == item.id)[0]?.name} x {item.amount} <span className="ms-1">{actions.valueToPrice(item.amount, store.rolls.filter(roll => roll.id == item.id)[0]?.price)}</span>
                    </li>;
                })}
                {store.order.combos && store.order.combos.map((item, index) => {
                    { total = total + item.amount * store.combos.filter(combo => combo.id == item.id)[0]?.price; }
                    return <li className="list-group-item d-flex justify-content-between" key={index}>
                        {store.combos.filter(combo => combo.id == item.id)[0]?.name} x {item.amount} <span className="ms-1"> {actions.valueToPrice(item.amount, store.combos.filter(combo => combo.id == item.id)[0]?.price)}</span>
                    </li>;
                })}
                <li className="list-group-item d-flex justify-content-between">
                    Subtotal <span className="ms-1">{actions.valueToPrice(1, total)}</span>
                </li>
            </ul>
            <div className="distribution py-2">
                <div className="mt-1">
                    <label className="btn btn-outline-dark" htmlFor={props.deliveryTag}><input type="radio" id={props.deliveryTag} name="choose" value="Delivery" onChange={(e) => handleChoose(e)}></input> Delivery</label>
                    <label className="btn btn-outline-dark" htmlFor={props.retiroTag}><input type="radio" id={props.retiroTag} name="choose" value="Retiro" onChange={(e) => handleChoose(e)}></input>Retiro</label>
                </div>
                <div>
                    <div className={displayDelivery}>
                        <p className="mt-2">
                            Delivery = {
                            total >= 15000
                                ? "Gratis!"
                                : !!delivery && actions.valueToPrice(1, delivery)
                        }
                        </p>
                        <div>
                       
                            <select value={chooseCity} name="ciudades" onChange={handleDelivery}>
                            <option value="" disabled hidden>Ciudad</option>
                                {locationDelivery.map((item,index)=>{
                                    return <option key={index} value={item.name}>{item.name}</option>;
                                })}
                            </select>
                            <input type="text" placeholder="Dirección" />
                        </div>
                    </div>
                    <div className={displayRetiro}>
                        <p>Selecciona lugar de retiro</p>
                        <input list="station" name="station" placeholder="Selecciona la estación" onChange={handleDelivery} />
                        <datalist id="station">
                            <option value={"Estación El Sol"} />
                            <option value={"Estación Quilpué"} />
                        </datalist>
                    </div>
                </div>
            </div>
            <p>TOTAL = {total >= 15000 ? actions.valueToPrice(1, total) : actions.valueToPrice(1, total + delivery)}</p>
        </div>

    );
};

Detail.propsTypes = {
    displayMode: PropTypes.string,
    deliveryTag: PropTypes.string,
    retiroTag: PropTypes.string
};