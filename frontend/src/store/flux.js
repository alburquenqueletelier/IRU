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
				fetch("http://127.0.0.1:8000/api/users/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({users:data});
				});
			},
			getAllRolls: ()=>{
				fetch("http://127.0.0.1:8000/api/rolls/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({rolls:data});
				});
			},
			getAllBases:()=>{
				fetch("http://127.0.0.1:8000/api/bases/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({bases:data});
				});
			},
			getAllToppings:()=>{
				fetch("http://127.0.0.1:8000/api/salsas/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({toppings:data});
				});
			},
			getAllAggregates:()=>{
				fetch("http://127.0.0.1:8000/api/agregados/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({aggregates:data});
				});
			},
			getAllCombos:()=>{
				fetch("http://127.0.0.1:8000/api/combos/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({combos:data});
				});
			},
			getAllOffers:()=>{
				fetch("http://127.0.0.1:8000/api/offers/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({offers:data});
				});
			},
			getAllCarousels:()=>{
				fetch("http://127.0.0.1:8000/api/carousels/")
				.then(res=>res.json())
				.then(data=>{
					// console.log(data);
					setStore({carousels:data});
				});
			},
			// getAllTest:()=>{
			// 	fetch("http://127.0.0.1:8000/api/test/")
			// 	.then(res=>res.json())
			// 	.then(data=>{
			// 		// console.log(data);
			// 		setStore({test:data});
			// 	});
			// },
			// POST action (Consume API)
			postLogin: (username, password) => {
				fetch("http://127.0.0.1:8000/api/token/", {
					method: 'POST',
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				})
				.then(resp=>resp.json())
				.then(data=>{
					// console.log(data);
					setStore({user: data});
				});
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
	
				// 	fetch("http://127.0.0.1:8000/api/test/", {
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
			// 		const resp = await fetch("http://127.0.0.1:8000/api/hello");
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