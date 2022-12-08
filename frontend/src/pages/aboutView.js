import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Spinners } from "../components/spinners";


export const AboutUs = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center">
            <h1>Nosotros</h1>
            <h3 style={{ color: "brown" }}>🧡IRU🧡</h3>
            <div className="col-10 m-auto">
                <p>
                    Somos una pareja 👩‍❤️‍👨 de la V región que nos encantan los rollitos de canela 🍥.
                    Teníamos nuestros <strong>Cinnamon Rolls</strong> favoritos, sin embargo en nuestra ciudad es difícil
                    poder conseguirlos 🙅‍♀️. Hicimos una búsqueda 🕵 para encontrar unos parecidos pero no logramos
                    dar con alguno que cumplieran con nuestro ideal 🥺. Al no encontrar lo que buscábamos, decidimos hacer nuestros propios
                    Rollitos de canela.
                    Investigamos 🤓 muchas recetas y tomamos lo mejor de cada una de ellas hasta lograr el sabor y textura que deseamos 👌.
                    Con el tiempo fuimos perfeccionando nuestra preparación 👩‍🍳, y nos dimos cuenta que disfrutamos del proceso 😲.
                    fué entonces cuando se nos ocurrió la idea 💡 de hacer llegar nuestra pasión y amor por los <strong>Cinnamon Rolls</strong> a
                    todas las personas 🌎 amantes de estos deliciosos pasteles 🤤. Así nació <strong style={{ color: "brown", whiteSpace: "nowrap" }}>I Roll U - Cinnamon</strong> a fin de expresar
                    nuestro cariño 🧡 por estas delicias y poder transmitirselo a ustedes para que disfruten al igual que nosotros 🙌.

                </p>
            </div>


        </div>
    );
};

