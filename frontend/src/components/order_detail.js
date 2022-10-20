import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

export const Detail = (props) => {

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
        <div className={"bg-white d-md-flex flex-column text-center align-items-stretch rounded p-2 " + props.displayMode} style={{ height: "fit-content", position: "sticky", top: "90px" }}>
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
            <p>TOTAL = {total >= 15000 ? actions.valueToPrice(1, total) : actions.valueToPrice(1, total + delivery)}</p>
        </div>

    );
};

Detail.propsTypes = {
    displayMode: PropTypes.string
};