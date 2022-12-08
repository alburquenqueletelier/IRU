import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ToastProduct = () => {
    const { store } = useContext(Context);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{zIndex: 9}}>
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header bg-light">
                    <strong>{store?.toast}</strong>
                    <img src={store.toast == "Añadido con éxito" ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" : "https://cdn-icons-png.flaticon.com/512/190/190406.png"} className="rounded me-auto" alt="..." style={{ width: "2rem" }} />
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    );
};