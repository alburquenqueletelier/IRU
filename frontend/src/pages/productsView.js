import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { ProductCard } from "../components/product_card";
import { Spinners } from "../components/spinners";

export const ProductsView = () => {

  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      {/* <h1 className="text-center">I Roll You</h1> */}
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

