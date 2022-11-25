import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { exportAsImage } from "../utils/exportAsImage";
// import html2canvas from "html2canvas";

// import { jsPDF } from "jspdf";

export const Detail = (props) => {

    const { store, actions } = useContext(Context);
    const [chooseCity, setChooseCity] = useState("");
    const [delivery, setDelivery] = useState(null);
    const [displayDelivery, setDisplayDelivery] = useState("d-none");
    const [displayRetiro, setDisplayRetiro] = useState("d-none");
    const [inputPhone, setInputPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [alert, setAlert] = useState(null);
    var total = 0;

    const locationDelivery = [
        { name: "Quilpué", price: 2000 },
        { name: "Villa Alemana", price: 2000 },
        { name: "Viña del Mar", price: 3000 }
    ];

    // const alert = (message, type) => {
    //     const wrapper = document.createElement('div')
    //     wrapper.innerHTML = [
    //         `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    //         `   <div>${message}</div>`,
    //         '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    //         '</div>'
    //     ].join('')

    //     document.querySelector('#alert').append(wrapper)
    // }

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
            setChooseCity("");
        }
        if (src.target.value == 'Retiro') {
            // document.querySelector('[name="ciudades"]').value = null;
            setChooseCity("");
            setDelivery(null);
            setAddress("");
            setDisplayDelivery("d-none");
            setDisplayRetiro("d-block");
        }
    };

    const handleBuy = () => {
        if (alert) setAlert(null);
        // validation
        if (!chooseCity) { // tambien alberga estaciones de metro
            //alerta ciudad
            setAlert(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div>Elige {displayDelivery == 'd-block' ? "Ciudad" : "Estación"}</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlert(null)}></button>
                </div>
            );

            // setTimeout( ()=>{
            //     const divAlert = document.querySelector('.alert.alert-danger.alert-dismissible.fade.show > button').click();
            // },3000);
            return;
        }
        if (address && address.length < 5) {
            setAlert(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div>Ingresa dirección valida</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlert(null)}></button>
                </div>
            );

            // setTimeout( ()=>{
            //     const divAlert = document.querySelector('.alert.alert-danger.alert-dismissible.fade.show > button').click();
            // },3000);
            return;
        }
        if (displayDelivery == 'd-block' && !address) {// alguna alerta
            setAlert(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div>Debes ingresar dirección de entrega</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlert(null)}></button>
                </div>
            );

            // setTimeout( ()=>{
            //     const divAlert = document.querySelector('.alert.alert-danger.alert-dismissible.fade.show > button').click();
            // },3000);
            return;
        }
        if (inputPhone.length < 8 || inputPhone.length > 9 || isNaN(parseInt(inputPhone, 10))) {
            // alguna alerta
            setAlert(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div>Ingresa número de contacto EJ: 979577547</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlert(null)}></button>
                </div>
            );

            // setTimeout( ()=>{
            //     const divAlert = document.querySelector('.alert.alert-danger.alert-dismissible.fade.show > button').click();
            // },3000);
            return;
        }
        if (!payment) {
            //alerta metodo pago
            setAlert(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div>Selecciona metodo de pago</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlert(null)}></button>
                </div>
            );

            // setTimeout( ()=>{
            //     const divAlert = document.querySelector('.alert.alert-danger.alert-dismissible.fade.show > button').click();
            // },3000);
            return;
        }
        const dateNow = new Date().toJSON().split(".")[0];

        var pedido = "";
        store.order.rolls.forEach(item=>{
            pedido+=store.rolls.filter(roll => roll.id == item.id)[0].name;
            pedido+="%20cantidad="+item.amount+",%20";
        });
        store.order.combos.forEach(item=>{
            pedido+=store.combos.filter(combo=> combo.id == item.id)[0].name;
            pedido+="%20cantidad="+item.amount+",%20";
        });
        pedido=pedido.replace(" ","%20");
        // https://wa.me/56979577547?text=Pedido:${pedido},%20Total=${actions.valueToPrice(1, total + delivery)},%20${address ? `Ciudad=${chooseCity},%20Dirección=${address}` : `Retiro=${chooseCity}`},%20Contacto=${inputPhone}
        window.location.href = `
        https://wa.me/56939011832?text=Pedido:${pedido}%20Total=${actions.valueToPrice(1, total + delivery)},%20${address ? `Ciudad=${chooseCity},%20Dirección=${address}` : `Retiro=${chooseCity}`},%20Contacto=${inputPhone},%20Pago=${payment}
        `;
        
        // console.log(inputPhone);
        // console.log(typeof delivery);
        // console.log(total + delivery);
        // exportAsImage(document.querySelector('.bg-white.flex-column.text-center.align-items-stretch.rounded.p-2'));
        // exportAsImage(document.querySelector('#detail'+props.deliveryTag), dateNow+"C"+inputPhone);
        
    };

    useEffect(() => {
        const initialChoose = document.querySelector(`#${props.deliveryTag}`);
        if (initialChoose) {
            // initialChoose.checked = true;
            initialChoose.click();
        }
    }, []);

    return (
        <div id={"detail"+props.deliveryTag} className={"bg-white flex-column text-center align-items-stretch rounded p-2 " + props.displayMode} style={{ height: "fit-content", position: "sticky", top: "90px" }}>
            {/* <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <div>Message</div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> */}
            {alert}
            <h2>Detalles Pedido</h2>
            <ul className="list-group list-group-flush">
                {store.order.rolls && store.order.rolls.map((item, index) => {
                    { total = total + item.amount * store.rolls.filter(roll => roll.id == item.id)[0]?.price; }
                    return <li className="list-group-item d-flex justify-content-between" key={index}>
                        <span>{store.rolls.filter(roll => roll.id == item.id)[0]?.name}</span> <span>x</span> <span>{item.amount}</span> <span className="ms-1">{actions.valueToPrice(item.amount, store.rolls.filter(roll => roll.id == item.id)[0]?.price)}</span>
                    </li>;
                })}
                {store.order.combos && store.order.combos.map((item, index) => {
                    { total = total + item.amount * store.combos.filter(combo => combo.id == item.id)[0]?.price; }
                    return <li className="list-group-item d-flex justify-content-between" key={index}>
                        <span>{store.combos.filter(combo => combo.id == item.id)[0]?.name}</span> <span>x</span><span>{item.amount} </span><span className="ms-1"> {actions.valueToPrice(item.amount, store.combos.filter(combo => combo.id == item.id)[0]?.price)}</span>
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
                                {locationDelivery.map((item, index) => {
                                    return <option key={index} value={item.name}>{item.name}</option>;
                                })}
                            </select>
                            <input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className={displayRetiro}>
                        <p>Selecciona lugar de retiro</p>
                        <select id="station" value={chooseCity} onChange={handleDelivery}>
                            <option value="" disabled hidden>Estación Metro</option>
                            <option value={"Estación El Sol"} >Estación El Sol</option>
                            <option value={"Estación Quilpué"} >Estación Quilpué</option>
                        </select>
                    </div>
                </div>
            </div>
            <p>TOTAL = {total >= 15000 ? actions.valueToPrice(1, total) : actions.valueToPrice(1, total + delivery)}</p>
            <div className="d-flex justify-content-around">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" onChange={(e)=>setPayment(e.target.value)}/>
                    <label className="form-check-label" htmlFor="cash">
                        Efectivo
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="paymentMethod" id="transfer" value="transfer" onChange={(e)=>setPayment(e.target.value)}/>
                    <label className="form-check-label" htmlFor="transfer">
                        Transferencia
                    </label>
                </div>
            </div>

            <div className="form-floating d-flex m-auto" style={{ maxWidth: "10rem" }}>
                <input value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} type="text" className="form-control" id="floatingtext" placeholder="Telefono" />
                <label htmlFor="floatingtext">Teléfono <small style={{ fontSize: "0.7rem" }}>Ej: 979577547</small></label>
            </div>
            <small>Al precionar comprar se emitirá una nota de compra <br />y nos pondremos en contacto contigo</small>
            <button type="button" className="btn btn-outline-primary" onClick={handleBuy}>Comprar</button>
        </div>

    );
};

Detail.propsTypes = {
    displayMode: PropTypes.string,
    deliveryTag: PropTypes.string,
    retiroTag: PropTypes.string
};