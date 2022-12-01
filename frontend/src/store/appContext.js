import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			if (sessionStorage.getItem('rolls')){
				state.actions.loadAllRolls();
			} else {
				state.actions.getAllRolls();
			}
			if (sessionStorage.getItem('combos')){
				state.actions.loadAllCombos();
			} else {
				state.actions.getAllCombos();
			}
			if (sessionStorage.getItem('carousels')){
				state.actions.loadAllCarousels();
			} else {
				state.actions.getAllCarousels();
			}
			if (sessionStorage.getItem("order")) state.actions.loadAllOrder();
			state.actions.getAllToppings();
			state.actions.getAllAggregates();
		}, []);

		
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;