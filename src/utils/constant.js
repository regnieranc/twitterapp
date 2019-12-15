export const Server = 'https://www.apitwitter.regnierneira.com/api/'

export const Api={
	usuario:{
		register:'usuario/register',
		login:'auth/login',
		me:'auth/me'
	},
}

export var MyHeaders = {
	'Accept': 'application/json',
	'Authorization': `Bearer ${localStorage.getItem('Bearer')}`
}
