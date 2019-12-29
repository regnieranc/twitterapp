export const ComprobarUsuario = async (url, headers, nickname) => {
	//debugger
	let obj={}
	obj.data=null
	obj.usuario=null
	try{
		let bearer = await localStorage.getItem('Bearer')
		if(bearer){
			let response = await fetch(url, {method:'post', headers:headers})
			let data = await response.json()
			if(data.id){
				let url="https://www.apitwitter.regnierneira.com/api/usuario/quienes"
				let formulario = new FormData()
				formulario.append('nickname', nickname)
				formulario.append('id', data.id)
				let res = await fetch(url, {method:'post', body:formulario, headers})
				let j =await res.json()
				obj.data=data
				obj.result=j
				obj.response=true
				return obj
			}else{
				obj.response=false
				return obj
			}
		}else{
			obj.response=false
			return obj;
		}
	}catch(e){
		obj.response=false
		return obj
	}
}