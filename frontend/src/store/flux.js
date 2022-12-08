const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			offers: [],
			combos: [],
			rolls: [],
			carousels: [],
			order: {
				rolls: [],
				combos: []
			},
			detail: {
				id: undefined,
				product: undefined
			},
			toast: ""
		},
		actions: {
			/////////////////////////////////////
			// Onload from storage //
			/////////////////////////////////////
			loadAllRolls: ()=>{
				setStore({rolls: JSON.parse(sessionStorage.getItem('rolls'))});
			},
			loadAllCombos: ()=>{
				setStore({combos: JSON.parse(sessionStorage.getItem('combos'))});
			},
			loadAllCarousels: ()=>{
				setStore({carousels: JSON.parse(sessionStorage.getItem('carousels'))});
			},
			loadAllOrder: ()=>{
				const {order} = getStore();
				let saveOrder = JSON.parse(sessionStorage.getItem("order"));
				if (saveOrder.rolls) order.rolls = saveOrder.rolls;
				if (saveOrder.combos) order.combos = saveOrder.combos;
				setStore({
					order: order
				});
				return "Carro cargado completamente";
			},
			/////////////////////////////////////
			// GET action functions (Consume API) //
			/////////////////////////////////////
			getAllUsers: ()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/users/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('user', JSON.stringify(data));
					setStore({users:data});
				});
			},
			getAllRolls: ()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/rolls/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('rolls', JSON.stringify(data));
					setStore({rolls:data});
				});
			},
			getAllBases:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/bases/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('bases', JSON.stringify(data));
					setStore({bases:data});
				});
			},
			getAllToppings:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/salsas/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('toppings', JSON.stringify(data));
					setStore({toppings:data});
				});
			},
			getAllAggregates:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/agregados/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('aggregates', JSON.stringify(data));
					setStore({aggregates:data});
				});
			},
			getAllCombos:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/combos/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('combos', JSON.stringify(data));
					setStore({combos:data});
				});
			},
			getAllOffers:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/offers/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('offers', JSON.stringify(data));
					setStore({offers:data});
				});
			},
			getAllCarousels:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+"/carousels/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					sessionStorage.setItem('carousels', JSON.stringify(data));
					setStore({carousels:data});
				});
			},
			/////////////////////////////////////
			// POST action (Consume API) //
			/////////////////////////////////////
			login: (username, password) => {
				// Esta funcion debiese estar general en el flux ! 
				function getCookie(name) {
					let cookieValue = null;
					if (document.cookie && document.cookie !== '') {
						const cookies = document.cookie.split(';');
						for (let i = 0; i < cookies.length; i++) {
							const cookie = cookies[i].trim();
							// Does this cookie string begin with the name we want?
							if (cookie.substring(0, name.length + 1) === (name + '=')) {
								cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
								break;
							}
						}
					}
					return cookieValue;
				}
				var csrftoken = getCookie('csrftoken');
				fetch(process.env.REACT_APP_BACKEND_URL+"/api"+'/views/login_token', {
					method: 'POST',
					headers: {
						"Content-type": "application/json",
						'X-CSRFToken': csrftoken
					},
					body: JSON.stringify({
						email: username,
						password: password
					})
				})
				.then(resp=>{
					if (resp.status == 200) return resp.json();
					else throw new Error(resp);
				})
				.then(data=>{
					// console.log(data);
					setStore({user: data});
				})
				.catch(error=>console.log(error));
				// console.log(data, e, "token: ", token);
				return true;
			},
			/////////////////////////////////////
			// Only Front Functions //
			/////////////////////////////////////
			valueToPrice: (amount=1, price) => {
				let value = amount*price;
				let response = Number(Number(value).toFixed()).toLocaleString('en');
				return '$'+response.replace(',','.');
			},
			postAddOrder:(product, id, amount)=>{
				if (amount==0){
					return false;
				} 
				const { rolls, combos, order } = getStore();
				let add = {
					id: id,
					amount: amount
				};
				if (product == 'rolls'){
					order.rolls.filter(prod=>prod.id == id).length <= 0 
					? order.rolls.push(add) 
					: order.rolls.map(prod=>{
						if(prod.id === id)
							return {...prod, amount: amount};
						else return prod;
					});
				} else {
					order.combos.push(add);
				}
				sessionStorage.setItem("order",JSON.stringify(order));
				setStore({order:order, toast: "Añadido con éxito"});
				// Toastshow
				const toastLiveExample = document.getElementById('liveToast');
				const toast = new bootstrap.Toast(toastLiveExample, {delay: 2000}); // eslint-disable-line
				toast.show();
				// Toastshow
				return "Agregado con éxito al carro";
			},
			editOrder: (product, id, amount) => {
				const { rolls, combos, order } = getStore();
				// console.log('product',product, 'id', id, 'amount', amount);
				if (product == 'rolls'){
					order.rolls.map(prod=>{
						if (prod.id == id) prod.amount = amount;
						return prod;
					});
				} else {
					order.combos.map(prod=>{
						if (prod.id == id) prod.amount = amount;
						return prod;
					});
				}
				sessionStorage.setItem("order",JSON.stringify(order));
				setStore({order:order});
				return "Orden editada";
			},
			// DELETE action (Consume API)
			deleteOrder: (product, id) => {
				const {order} = getStore();
				if (product == 'rolls') order.rolls = order.rolls.filter(prodID => prodID.id !== id);
				else order.combos = order.combos.filter(prodID => prodID.id !== id);
				setStore({order:order, toast:"Producto retirado"});
				sessionStorage.setItem("order", JSON.stringify(order));
				const toastLiveExample = document.getElementById('liveToast');
				const toast = new bootstrap.Toast(toastLiveExample, {delay: 2000}); // eslint-disable-line
				toast.show();
				return `${product.slice(0,-1)} eliminado del carro`;
			},
			deleteAllOrder: () => {
				sessionStorage.removeItem("order");
				setStore({
					order: {
						rolls: [],
						combos: []
					}
				});
				return "Se vacio el carro";
			},
			displayDetail: async (id, product) =>{
				await setStore({detail: {
					id: id,
					product: product
				}});
				const {showDetailModal} = getActions();
				showDetailModal();
			},
			showDetailModal: () => {
				const myModal = new bootstrap.Modal("#modalDetail", { // eslint-disable-line
					keyboard: false, // eslint-disable-line
				}); // eslint-disable-line
				// console.log(myModal);
				myModal.show();
			},
		}
	};
};

export default getState;