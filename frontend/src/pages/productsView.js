import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
window.bootstrap = require("bootstrap");
import { ProductCard } from "../components/product_card";
import { Spinners } from "../components/spinners";
import { ProductDetail } from "../components/product_detail";

export const ProductsView = () => {

  const { store, actions } = useContext(Context);
  var data = {};
  if (store.detail.product == "rolls") {
    data = store.rolls.filter(roll => roll.id == store.detail.id);
  } else {
    data = store.combos.filter(combo => combo.id == store.detail.id);
  }


  return (
    <div className="container-fluid">
      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header bg-light">
            <strong>{store?.toast}</strong>
            <img src={store.toast == "Añadido con éxito" ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" : "https://cdn-icons-png.flaticon.com/512/190/190406.png"} className="rounded me-auto" alt="..." style={{width:"2rem"}}/>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
      {/* Toast */}
      <ProductDetail />
      <div className="container-sm">
        <h1 className="text-center">Rolls</h1>
        <div className="row row-cols-md-4 row-cols-1 justify-content-md-start justify-content-center">
          {store.rolls ?
            store.rolls.map((item, index) => {
              return (
                <div className="col-md-3 col-10 d-flex align-items-stretch mb-1" key={index}>
                  <ProductCard
                    id={item.id}
                    title={item.name}
                    product="rolls"
                    description={item.description}
                    image={item.image} price={item.price}
                    amount={store.order.rolls.filter(roll => roll.id == item.id)?.length > 0 ? store.order.rolls.filter(roll => roll.id == item.id)[0]?.amount : 0}
                    addOrRemove={
                      store?.order.rolls.filter(roll => roll.id == item.id).length == 1 ? actions.deleteOrder : actions.postAddOrder
                    }
                    buttonMessage={store?.order.rolls.filter(roll => roll.id == item.id).length == 1 ? "Quitar" : "Añadir"}
                  />
                </div>
              );
            })
            : <Spinners />
          }
        </div>
        <hr></hr>
        <h1 className="text-center">Combos</h1>
        <div className="row row-cols-md-4 row-cols-1 justify-content-md-start justify-content-center">
          {store.combos ?
            store.combos.map((item, index) => {
              return (
                <div className="col-md-3 col-10 d-flex align-items-stretch mb-1" key={index}>
                  <ProductCard
                    id={item.id}
                    title={item.name}
                    product="combos"
                    description={item.description}
                    image={item.image} price={item.price}
                    amount={store.order.combos.filter(combo => combo.id == item.id)?.length > 0 ? store.order.combos.filter(combo => combo.id == item.id)[0]?.amount : 0}
                    addOrRemove={
                      store?.order.combos.filter(combo => combo.id == item.id).length == 1 ? actions.deleteOrder : actions.postAddOrder
                    }
                    buttonMessage={store?.order.combos.filter(combo => combo.id == item.id).length == 1 ? "Quitar" : "Añadir"}
                  />
                </div>
              );
            })
            : <Spinners />
          }
        </div>
      </div>

    </div>
  );
};

