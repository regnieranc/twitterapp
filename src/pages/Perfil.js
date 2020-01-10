import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import { Form, TextArea, Image, Icon, Menu,Button,  } from 'semantic-ui-react'
import CountUp from 'react-countup';
import {ComprobarUsuario} from './../utils/functions'
import {Redirect} from 'react-router-dom'
import {Server, Api, MyHeaders, ServerRoot} from './../utils/constant'
import Tweets from "./../components/Tweets"
import UploadImage from './../components/UploadImage'

export default class Perfil extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nick:null,
			nombre:"",
			acceso:true,
			fondoImagen:null,//la imagen de fondo de su perfil
			descripcion:"",//la descripcion de su perfil
			activeItem:'tweets',//para el menu
			usuario_id:null,//id del usuario url
			tweets:null,//los tweets del usuario,
			soyyo:null,
			esamigo:null,
			imagen:null,
			mi_id:null,
			seguidores:null,
			siguiendo:null,
			cantidadseguidores:0,
			cantidadsiguiendo:0,
			cantidadtweets:0

		}
	}

	async componentDidMount(){
		let nickname=this.props.match.params.nick
		let bearer = await localStorage.getItem('Bearer')
		let headers={
			'Accept': 'application/json',
			'Authorization': `Bearer ${bearer}`
		}
		let response=await ComprobarUsuario(Server+Api.usuario.me, headers, nickname)
		if(response.response){
			let {data, result} = response
			if(result.proceso==1){
				let foto=result.data.foto
				let fondo=result.data.fotofondo
				if(!foto){
					foto=`${ServerRoot}storage/images/images_perfil/default.jpg`
				}
				if(!fondo){
					fondo=`${ServerRoot}storage/images/images_fondo/fondo1.jpg`
				}
				this.setState({nick:`@${result.data.nick}`, acceso:true, nombre:result.data.nombre, 
					descripcion:result.data.descripcion, usuario_id:result.data.idurl,
					fondoImagen:fondo, imagen:foto,
					soyyo:result.data.soyyo, esamigo:result.data.amigo, mi_id:data.id})
				console.log(this.state.imagen)
				this.getInfoTwitter()
			}
			
		}else{
			this.setState({acceso:false})
		}
		
	}

	changeFondo = (opcion) => {
		console.log('fondo', opcion)
	}

	handleItemClick = async (e, { name }) => {
		await this.setState({ activeItem: name })
		this.getInfoTwitter();
	}


	getInfoTwitter = async () => {
		switch(this.state.activeItem){
			case "tweets":
				if(this.state.soyyo || this.state.esamigo){
					let url = Server+Api.tweets.listar
					let formulario = new FormData()
					formulario.append('id', this.state.usuario_id)//id perfil
				    formulario.append('idlog', this.state.mi_id)//id logueado
					let response =await  fetch(url, {body:formulario, method:'post', headers:MyHeaders})
					let data = await response.json()
					if(data.proceso==1){
						this.setState({tweets:data.data})

					}
				}
				break;
			case "seguidores":
				if(this.state.soyyo || this.state.esamigo){
					let url = Server+Api.usuario.seguidores
					let formulario = new FormData()
					formulario.append('id', this.state.usuario_id)
					let response =await  fetch(url, {body:formulario, method:'post', headers:MyHeaders})
					let data = await response.json()
					if(data.proceso==1){
						this.setState({seguidores:data.data})

					}
				}else{
					this.setState({seguidores:[]})
				}
				break;
			case "siguiendo":
				if(this.state.soyyo || this.state.esamigo){
					let url = Server+Api.usuario.siguiendo
					let formulario = new FormData()
					formulario.append('id', this.state.usuario_id)
					let response =await  fetch(url, {body:formulario, method:'post', headers:MyHeaders})
					let data = await response.json()
					if(data.proceso==1){
						this.setState({siguiendo:data.data})

					}
				}else{
					this.setState({siguiendo:[]})
				}
				break;
		}
		let formulario = new FormData()
	    formulario.append('id', this.state.usuario_id)//id logueado
	    let response=await fetch(Server+Api.usuario.informacion, {body:formulario, method:'post', headers:MyHeaders})
	    let data=await response.json()
	    if(data.proceso==1){
	    	await this.setState({cantidadseguidores:data.data.seguidores, cantidadtweets:data.data.tweets, cantidadsiguiendo:data.data.siguiendo})
	    	console.log(this.state)
	    }
	}

	twittear = async (e) => {
		try{
			//this.setState({tweets:null})
			let url=Server+Api.tweets.guardar
			let formulario = new FormData();
			formulario.append('tweet', e)
			formulario.append('usuario_id', this.state.usuario_id)
			let response = await fetch(url, {method:'post', body:formulario, headers:MyHeaders})
			let data = await response.json()
			
			console.log(this.state, 'tweets')
		}catch(e){
			console.log(e)
		}
		this.getInfoTwitter()
		console.log('click', e)
	}

	opcionseguir = async (opcion) => {
		try{
			let formulario = new FormData()
			formulario.append('miid', this.state.mi_id)
			formulario.append('usuarioid', this.state.usuario_id)
			let url="";
			if(opcion==1){
				url=Server+Api.conectar.seguir
			}else{
				url=Server+Api.conectar.dejarseguir
			}
			let response=await fetch(url, {method:'post', body:formulario, headers:MyHeaders})
			let data=await response.json()
			console.log(opcion, 'ocion')
			if(data.proceso==1){
				if(opcion==0){
					await this.setState({esamigo:!this.state.esamigo})
				}else{
					await this.setState({esamigo:!this.state.esamigo})
				}
				this.getInfoTwitter()
			}
			
		}catch(e){
			console.log(e)
		}
		

	}

	disparador = () => {
		this.getInfoTwitter()
	}

	render(){
		return(
			<Container>
			{
				!this.state.acceso?
				<Redirect to = "/" /> : null
			}
				<Row>
					{
						!this.state.fondoImagen?
						<Col debug>

						</Col> :
						<Col debug className={'fondoImagen'}>
							<div>
								<UploadImage
									imagen={this.state.imagen}
								 />
							</div>
						</Col>
					}
				</Row>
				<Row style={{marginTop:'20px',marginBottom: '20px'}} className={"contenedor"}>
					<Col md={12}>
						<Row>
							<Col md={4} style={{textAlign:'center'}}>
								<Row>
									<Col>
									{
										this.state.imagen?
										<Image src={this.state.imagen} size='small' className={'circular'} centered/> : 
											<Image src={this.state.imagen} size='small' avatar centered/>
									}
										
										
									</Col>
								</Row>
								<Row>
									<Col>
										aqui datos de ubicacion
									</Col>
								</Row>
							</Col>
							<Col md={8}>
								
							</Col>
						</Row>
					</Col>
					<Col md={4}>
					</Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>tweets</h4>
						<CountUp
							start={0}
							end={this.state.cantidadtweets?this.state.cantidadtweets:0}
							duration={2}
						/>
					</Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>seguidores</h4>
						<CountUp
						  start={0}
						  end={this.state.cantidadseguidores?this.state.cantidadseguidores:0}
						  duration={2}
						/>
					</Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>siguiendo</h4>
						<CountUp
						  start={0}
						  end={this.state.cantidadsiguiendo?this.state.cantidadsiguiendo:0}
						  duration={2}
						/>
					</Col>
					<Col md={2}></Col>
				</Row>
				<Row className={'mt-50'}>
					<Col md={4} >
						<Row>
							<Col>
								<h3 style={{marginBottom:0}}>{this.state.nombre}</h3>
								<h5 style={{marginTop:0}}>{this.state.nick}</h5>
								<p>{this.state.descripcion}</p>
							</Col>
						</Row>
						<Row>
							<Col>
								{
									!this.state.soyyo?
										<div>
										{
											!this.state.esamigo?
												<Button content={'Seguir'} onClick={() => this.opcionseguir(1)}/> : 
												<Button content={'Dejar de seguir'} onClick={() => this.opcionseguir(0)}/>
										}
										
										</div>
										: null
								}
							</Col>
						</Row>
					<Row>
						<Col>
							sdfk
						</Col>	
					</Row>	
					</Col>
					<Col md={8}>
						<Menu style={{background: 'transparent'}}>
				            <Menu.Item
				                name='tweets'
				                active={this.state.activeItem === 'tweets'}
				                onClick={this.handleItemClick}
				            />
				            <Menu.Item
  				                name='seguidores'
  				                active={this.state.activeItem === 'seguidores'}
     				            onClick={this.handleItemClick}
				            />
				            <Menu.Item
				                name='siguiendo'
				                active={this.state.activeItem === 'siguiendo'}
				                onClick={this.handleItemClick}
				            />
				            <Menu.Item
				                name='reaccion'
				                active={this.state.activeItem === 'reaccion'}
				                onClick={this.handleItemClick}
				            />
				            <Menu.Item
				                name='retweets'
				                active={this.state.activeItem === 'retweets'}
				                onClick={this.handleItemClick}
				            />
				        </Menu>
				        <Tweets 
				        	panel={this.state.activeItem}
				        	twitter={this.twittear}
				        	tweets={this.state.tweets}
				        	soyyo={this.state.soyyo}
				        	esamigo={this.state.esamigo}
				        	fotoperfil={this.state.imagen}
				        	usuario_id={this.state.mi_id}
				        	seguidores={this.state.seguidores}
				        	siguiendo={this.state.siguiendo}
				        	disparador={this.disparador}
				        />
						
					</Col>
				</Row>
			</Container>
		)
	}
}