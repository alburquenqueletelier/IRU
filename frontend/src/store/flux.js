const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null
		},
		actions: {
			getMessage: async () => {
				try{
					// fetching data from the backend
					// Cambiar ruta por porecess.env.BACKEND_URL cuando termine la pagina
					const resp = await fetch("http://127.0.0.1:8000/api/hello");
					const data = await resp.json();
					setStore({ message: data.mssg });
					// don't forget to return something, that is how the async resolves
					return console.log(data);
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},
			
		}
	};
};

export default getState;