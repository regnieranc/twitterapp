import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import { Form, TextArea, Image, Icon, Menu,Button } from 'semantic-ui-react'
import CountUp from 'react-countup';
import {ComprobarUsuario} from './../utils/functions'
import {Redirect} from 'react-router-dom'
import {Server, Api, MyHeaders} from './../utils/constant'
import Tweets from "./../components/Tweets"

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
			foto:'http://custom13.com/15702/parche-bordado-cuadrado-metallica.jpg',
			mi_id:null,
			seguidores:null,
			siguiendo:null

		}
	}

	async componentDidMount(){
		let nickname=this.props.match.params.nick
		let response=await ComprobarUsuario(Server+Api.usuario.me, MyHeaders, nickname)
		if(response.response){
			let {data, result} = response
			console.log(result,data, 'este repsosne')
			if(result.proceso==1){
				this.setState({nick:`@${result.data.nick}`, acceso:true, nombre:result.data.nombre, 
					descripcion:result.data.descripcion, usuario_id:result.data.idurl,
					fondoImagen:result.data.fotofondo, imagen:result.data.foto,
					soyyo:result.data.soyyo, esamigo:result.data.amigo, mi_id:data.id})
				console.log(this.state)
				this.getInfoTwitter()
			}
			
		}else{
			this.setState({acceso:false})
		}
		
	}

	changeFondo = () => {
		console.log('fondo')
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
					formulario.append('id', this.state.usuario_id)
					let response =await  fetch(url, {body:formulario, method:'post', headers:MyHeaders})
					let data = await response.json()
					if(data.proceso==1){
						this.setState({tweets:data.data})

					}
				}
				console.log('tab tweet')
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
				}
				break;
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

	render(){
		return(
			<Container>
			{
				!this.state.acceso?
				<Redirect to = "/" /> : null
			}
				<Row>
					{
						this.state.fondoImagen?
						<Col debug>

						</Col> :
						<Col debug className={'fondoImagen'}>
							<Icon name='camera' onClick={this.changeFondo} />
						</Col>
					}
				</Row>
				<Row style={{marginTop:'20px',marginBottom: '20px'}} className={"contenedor"}>
					
					<Col debug>
						<Row>
							<Col md={4} debug style={{textAlign:'center'}}>
								<Row>
									<Col>
										<Image src={this.state.foto} size='small' avatar centered />
									</Col>
								</Row>
								<Row>
									<Col>
										aqui datos de ubicacion
									</Col>
								</Row>
							</Col>
							<Col md={8} debug>
								<Row>
									<Col md={4} style={{textAlign:'center'}}>
										<h4>tweets</h4>
										<CountUp
										  start={0}
										  end={100}
										  duration={2}
										/>
									</Col>
									<Col md={4} style={{textAlign:'center'}}>
										<h4>seguidores</h4>
										<CountUp
										  start={0}
										  end={100}
										  duration={2}
										/>
									</Col>
									<Col md={4} style={{textAlign:'center'}}>
										<h4>siguiendo</h4>
										<CountUp
										  start={0}
										  end={100}
										  duration={2}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
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
				        	fotoperfil={this.state.foto}
				        	usuario_id={this.state.mi_id}
				        	seguidores={this.state.seguidores}
				        	siguiendo={this.state.siguiendo}
				        />
						
					</Col>
				</Row>
			</Container>
		)
	}
}