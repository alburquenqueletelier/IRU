import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { ProductCard } from "../components/product_card";
import { Spinners } from "../components/spinners";

export const ProductsView = () => {

  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
    {/* <h1 className="text-center">I Roll You</h1> */}
    <h1 className="text-center">Rolls</h1>
    <div className="row row-cols-md-4 row-cols-sm-3 row-cols-2">
      {store.rolls ?
        store.rolls.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard 
              id={item.id} 
              title={item.name} 
              description={item.description} 
              image={item.image} price={item.price} 
              amount={store.order.rolls?.length > 0 ? store.order.rolls.filter(roll=>roll.id == item.id)[0]?.amount : 1}
              addOrRemove={
                store?.order.rolls.filter(roll=>roll.id == item.id).length == 1 ? actions.deleteOrder : actions.postAddOrder
              }
              buttonMessage={store?.order.rolls.filter(roll=>roll.id == item.id).length == 1 ? "Remover" : "Añadir"} 
              />
            </div>
          );
        })
        : <Spinners />
      }
    </div>
    <hr></hr>
    <h1 className="text-center">Combos</h1>
    <div className="row row-cols-4">
      {store.combos ? 
        store.combos.map((item, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard title={item.name} description={item.description} price={item.price} />
            </div>
          );
        })
        : <Spinners />
      }
    </div>
 
  </div>
  );
};

