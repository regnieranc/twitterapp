export const Server = 'https://www.apitwitter.regnierneira.com/api/'
//export const Server = "http://localhost:8000/api/"
//export const ServerRoot = "http://localhost:8000/"
export const ServerRoot = "https://www.apitwitter.regnierneira.com/"
export const Api={
	usuario:{
		register:'usuario/register',
		login:'auth/login',
		me:'auth/me',
		siguiendo:'usuario/siguiendo',
		seguidores:'usuario/seguidores',
		informacion:'usuario/informacion'
	},
	tweets:{
		listar:'tweets/show',
		guardar:'tweets/guardar',
		reaccion:'tweets/reaccion'
	},
	conectar:{
		seguir:'conectar/seguir',
		dejarseguir:'conectar/dejarseguir'
	}
}

export var MyHeaders = {
	'Accept': 'application/json',
	'Authorization': `Bearer ${localStorage.getItem('Bearer')}`
}
