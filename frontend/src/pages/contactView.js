import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Spinners } from "../components/spinners";


export const Contact = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center">
            <h1>Contáctanos</h1>
            <div className="col-10 m-auto">
                <p>
                    Si quieres saber más acerca de nosotros, nuestros productos, o tienes alguna idea de negocio
                    puedes escribirnos por alguno de los canales o llenando el formulario.
                </p>

            </div>
            <div className="d-flex justify-content-center">
                <ul style={{ listStyleType: "none" }}>
                    <li >
                        Whatsapp:
                        <p>+56939011832 <br />+56979577547</p>
                    </li>
                    <li >
                        Mail: <p>iru.cinnamonrolls@gmail.com</p>
                    </li>
                </ul>
            </div>
            <div className="col-sm-6 col-10 m-auto mb-2 ps-sm-5 ps-0">
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingNameContact" placeholder="name@example.com" />
                        <label htmlFor="floatingNameContact">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <textarea style={{height: "10rem"}} className="form-control" placeholder="Mensaje" id="floatingTextarea"></textarea>
                        <label htmlFor="floatingTextarea">Mensaje</label>
                    </div>
                </form>
            </div>


        </div>
    );
};

