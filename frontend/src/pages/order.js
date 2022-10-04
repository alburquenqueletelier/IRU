import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/home.css";

import { Spinners } from "../components/spinners";
import { OrderCard } from "../components/order_card";

export const Order = () => {

  const { store, actions } = useContext(Context);


  return (
    <div className="container-fluid">
        <h1>Tu pedido</h1>
        {(store.order.combo.length > 0 || store.order.roll.length > 0)
        ? <div>
            {store.order.roll.map((item, index)=>{
                let aux = store.rolls?.filter(product=>product.id == item.id)[0];
                return (
                    <OrderCard
                        key={index} 
                        title={aux?.name}
                        price={aux?.price}
                        amount={item.amount}
                        image={aux?.image}
                    />
                );
            })}
            {store.order.combo.map((combo, index)=>{
                return (
                    <div key={index}>Combo</div>
                );
            })}
        </div>
        : store.order.length == 0
         ? <h2>No hay productos. Agregalos...</h2>
         : <Spinners />
        }
        
    </div>
  );
};

