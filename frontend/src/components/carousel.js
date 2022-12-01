import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../styles/carousel.css";

export const Carousel = () => {
    const {store} = useContext(Context);
    // title={item.name} description={item.description} image={item.image} price={item.price}

    // useEffect(()=>{
    //     let carousel = bootstrap.Carousel.getInstance('#carouselExampleIndicators');
    //     carousel.trigger();
    //     // console.log('caoursel active', document.querySelector('.carousel-item'));
    // },[]);

    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-interval="3000" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {store.carousels &&
                    store.carousels.map((item,index)=>{
                      return <div key={index} className={index==0 ? "carousel-item active" : "carousel-item"}>
                            {item.rolls_images 
                                ? <img src={store?.rolls?.filter(roll=>roll.name==item.rolls_images)[0]?.image} alt={item.rolls_images} />
                                : <img src={store?.combos?.filter(combo=>combo.name==item.combo_images)[0]?.image} alt={item.combo_images} />
                            }
                        </div>; 
                    })
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};