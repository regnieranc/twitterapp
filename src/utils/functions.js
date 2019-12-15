export const ComprobarUsuario = async (url, headers) => {
	//debugger
	try{
		let bearer = await localStorage.getItem('Bearer')
		if(bearer){
			let response = await fetch(url, {method:'post', headers:headers})
			let data = await response.json()
			if(data.id){
				return true
			}else{
				return false
			}
		}else{
			return false;
		}
	}catch(e){
		return false
	}
}