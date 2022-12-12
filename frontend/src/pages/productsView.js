import React, { useContext, useEffect } from "react";
import { ProductCard } from "../components/product_card";
import { Spinners } from "../components/spinners";
import { ProductDetail } from "../components/product_detail";
import { CategoryNav } from "../components/category_nav";
import { Context } from "../store/appContext";
import { ToastProduct } from "../components/toastProduct";
import { Link } from "react-router-dom";
window.bootstrap = require("bootstrap");

export const ProductsView = () => {

  const { store, actions } = useContext(Context);
  var data = {};
  if (store.detail.product == "rolls") {
    data = store.rolls.filter(roll => roll.id == store.detail.id);
  } else {
    data = store.combos.filter(combo => combo.id == store.detail.id);
  }

  // Imagenes provisorias 
  const toppingImages = [
    { salsa: "Chocolate", urlImage: "https://cdnx.jumpseller.com/supermercadorivera/image/10114499/resize/470/645?1652366109" },
    { salsa: "Frosting", urlImage: "https://i.blogs.es/c07e43/frosting_de_queso_crema/450_1000.jpeg" },
    { salsa: "Glaseado", urlImage: "https://cocinaypunto.com/wp-content/uploads/2013/10/2-1.jpg" },
    { salsa: "Crema de avellanas", urlImage: "https://jumbo.vtexassets.com/arquivos/ids/396596/Nutella-ferrero-frasco-450-g.jpg?v=637469296628100000" },
    { salsa: "Manjar", urlImage: "https://static.emol.cl/emol50/Fotos/2020/11/02/file_20201102112610.png" },
  ];
  const aggregateImages = [
    { salsa: "Costa Rama", urlImage: "https://carozziexport.com/assets/img/products/_large/210485_CHOCOLATE_RAMA_LECHE_16X115G_1.jpg" },
    { salsa: "Kitkat", urlImage: "https://www.nestleprofessional-latam.com/sites/default/files/styles/np_product_detail/public/2022-07/kitkat_nuevo.png?itok=rac77r3x" },
    { salsa: "Oreo", urlImage: "https://cdnx.jumpseller.com/supermercadorivera/image/11360204/87657865-removebg-preview.png?1656688216" },
    { salsa: "Rocklets", urlImage: "https://dojiw2m9tvv09.cloudfront.net/24510/product/rockletschocolate0152.png" },
    { salsa: "Rolls", urlImage: "https://www.confiteriasantiago.cl/1067-home_default/rolls-crocante-150gr.jpg" },
  ];
  // Imagenes provisorias 

  return (
    <div className="container-fluid">
      {/* Toast */}
      <ToastProduct />
      {/* <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header bg-light">
            <strong>{store?.toast}</strong>
            <img src={store.toast == "Añadido con éxito" ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" : "https://cdn-icons-png.flaticon.com/512/190/190406.png"} className="rounded me-auto" alt="..." style={{ width: "2rem" }} />
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div> */}
      {/* Toast */}
      <ProductDetail />
      <div className="container-sm">
        <CategoryNav />
        <h1 id="rollsHeader" className="text-center">Rolls</h1>
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
        <h1 id="combosHeader" className="text-center">Combos</h1>
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
        <hr></hr>
        <h1 id="toppingsHeader" className="text-center">Salsas</h1>
        <div className="row row-cols-md-4 row-cols-1 justify-content-md-start justify-content-center">
          {store.toppings ?
            store.toppings.map((item, index) => {
              return (
                <div className="col-md-3 col-10 d-flex align-items-stretch mb-1" key={index}>
                  <div className="card">
                    <img src={item.image ? item.image : toppingImages.filter(topping => topping.salsa == item.name)[0].urlImage} className="size-image" alt={item.name} />
                    <div className="card-body d-flex flex-column ">
                      <h6 className="card-title">{item.name}</h6>
                      <p>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
            : <Spinners />
          }
        </div>
        <hr></hr>
        <h1 id="aggregatesHeader" className="text-center">Agregados</h1>
        <div className="row row-cols-md-4 row-cols-1 justify-content-md-start justify-content-center">
          {store.aggregates ?
            store.aggregates.map((item, index) => {
              return (
                <div className="col-md-3 col-10 d-flex align-items-stretch mb-1" key={index}>
                  <div className="card">
                    <img src={item.image ? item.image : aggregateImages.filter(topping => topping.salsa == item.name)[0].urlImage} className="size-image" alt={item.name} />
                    <div className="card-body d-flex flex-column ">
                      <h6 className="card-title">{item.name}</h6>
                      <p>
                        {item.description}
                      </p>
                    </div>
                  </div>
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

