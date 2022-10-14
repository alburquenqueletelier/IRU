const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// order: []
			offers: [],
			combos: [],
			rolls: [],
			carousels: [],
			order: {
				rolls: [],
				combos: []
			}
		},
		actions: {
			// Onload from storage
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
			// GET action functions (Consume API)
			getAllUsers: ()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/users/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({users:data});
				});
			},
			getAllRolls: ()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/rolls/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({rolls:data});
				});
			},
			getAllBases:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/bases/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({bases:data});
				});
			},
			getAllToppings:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/salsas/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({toppings:data});
				});
			},
			getAllAggregates:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/agregados/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({aggregates:data});
				});
			},
			getAllCombos:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/combos/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({combos:data});
				});
			},
			getAllOffers:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/offers/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({offers:data});
				});
			},
			getAllCarousels:()=>{
				fetch(process.env.REACT_APP_BACKEND_URL+"/carousels/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({carousels:data});
				});
			},
			// getAllTest:()=>{
			// 	fetch(process.env.REACT_APP_BACKEND_URL+"/test/")
			// 	.then(res=>res.json())
			// 	.then(data=>{
			// 		// console.log(data);
			// 		setStore({test:data});
			// 	});
			// },
			// POST action (Consume API)
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
				fetch(process.env.REACT_APP_BACKEND_URL+'/views/login_token', {
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
					console.log(data);
					setStore({user: data});
				})
				.catch(error=>console.log(error));
				// console.log(data, e, "token: ", token);
				return true;
			},
			postAddOrder:(product, id, amount)=>{
				const { rolls, combos, order } = getStore();
				console.log('pase por addorder');
				let add = {
					id: id,
					amount: amount
				};
				if (product == 'rolls'){
					order.rolls.filter(prod=>prod.id == id).length <= 0 
					? order.rolls.push(add) 
					: order.rolls.map(prod=>{
						prod.id === id
						? {...prod, amount: amount}
						: prod;
					});
				} else {
					order.combos.push(add);
				}
				sessionStorage.setItem("order",JSON.stringify(order));
				setStore({order:order});
				return "Agregado con éxito al carro";
			},
			editOrder: (product, id, amount) => {
				const { rolls, combos, order } = getStore();
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
			// postTest: (e, image)=>{
				// 	e.preventDefault();
				// 	const formdata = new FormData();
				// 	formdata.append("imagen", image);
	
				// 	fetch(process.env.REACT_APP_BACKEND_URL+"/test/", {
				// 		method: 'POST',
				// 		// headers: {
				// 		// 	"Content-type": "multipart/form-data",
				// 		// 	// "Authentication": {"Bearer " + token} u otro metodo
				// 		// },
				// 		body: formdata
				// 	})
				// 	.then(res=>res.json())
				// 	.then(data=>{
				// 		// console.log(data);
				// 		// setStore({data:data}) si es necesrio
				// 	})
				// 	.catch(error=>console.log(error));
				// 	return false;
				// },
			// DELETE action (Consume API)
			deleteOrder: (product, id) => {
				const {order} = getStore();
				if (product == 'rolls') order.rolls = order.rolls.filter(prodID => prodID.id !== id);
				else order.combos = order.combos.filter(prodID => prodID.id !== id);
				setStore({order:order});
				sessionStorage.setItem("order", JSON.stringify(order));
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
			// PUT action (Consume API)

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		// Cambiar ruta por porecess.env.BACKEND_URL cuando termine la pagina
			// 		const resp = await fetch(process.env.REACT_APP_BACKEND_URL+"/hello");
			// 		const data = await resp.json();
			// 		setStore({ message: data.mssg });
			// 		// don't forget to return something, that is how the async resolves
			// 		return console.log(data);
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error);
			// 	}
			// },
			
		}
	};
};

export default getState;