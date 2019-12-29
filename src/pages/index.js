import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import {Button, Transition, Input, Form, Message, Dimmer, Loader} from 'semantic-ui-react'
import Header from './../components/Header'
import {Link} from 'react-router-dom'
import Modal from './../components/Modal'
import {Server, Api} from './../utils/constant'
import './style.css'
import {Redirect} from 'react-router-dom'

export default class index extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			open:false,
			header:"",
			login:false,
			email:"",
			password:"",
			error:false,
			response:false,
			nick:''
		}
	}
	componentDidMount(){
	}


	handleLogin = () => {
		this.setState({login:!this.state.login})
	}

	login = async () => {
		this.setState({error:false, response:true})
		try{
			let formulario = new FormData()
			formulario.append('email', this.state.email)
			formulario.append('password', this.state.password)
			let res = await fetch(Server+Api.usuario.login, {method:'post', body:formulario})
			let json = await res.json()
			if(json.error){
				console.log(json.error)
				this.setState({error:true})
			}else{
				await localStorage.setItem('Bearer', json.access_token)
				await localStorage.setItem('name', json.user.name)
				await localStorage.setItem('nick', json.user.nick)
				await localStorage.setItem('role', json.user.role)
				await this.setState({nick:json.user.nick})
				console.log('login')
			}
			console.log(json)
			console.log(this.state)
			//this.setState({response:false})
		}catch(e){
			console.log(e)
			this.setState({response:false})
		}
	}

	render(){

		return(
			<div>
				{
					this.state.response?
					<Dimmer active><Loader>Loading</Loader></Dimmer> : null
				}
				{
					this.state.nick!=''?
					<Redirect to = {"/perfil/"+this.state.nick} /> : null
				}
				<Container>
					
					<Header />
					<Container style={{verticalAlign:'middle'}} className={'content'}>
						<Row>
							<Col md={6} debug>
								<div style={{display: 'flex',flexDirection:'column', justifyContent:'center' }}>
									<h5>Sigue lo que te interesa</h5>
									<h5>Enterate de lo que esta hablando la gente</h5>
									<h5>Unete a la conversacion</h5>
								</div>
							</Col>
							<Col md={6} debug>
								<div>
									<h3>Descubre de lo que se esta hablando a nivel nacional e internacional</h3>
									<h4>Unete hoy mismo</h4>
									<Button color='blue' attached style={{marginBottom: '10px'}}>Registrarse</Button>
									<Button color='blue' attached onClick={this.handleLogin}>Ingresar</Button>
								</div>
							</Col>
						</Row>
						<Row>
							<Col sm={12} md={3} debug></Col>
							<Col sm={12} md={6} debug>
								<Transition visible={this.state.login} animation='fly left' duration={500}>
									<><Form style={{textAlign:'center'}}>
										<Form.Field>
										    <label>Email o Usuario</label>
										    <input placeholder='Email o usuario' value={this.state.email} onChange={ e => this.setState({email:e.target.value})} />
										</Form.Field>
										<Form.Field>
										    <label>Password</label>
										    <input placeholder='Password' type="password" value={this.state.password} onChange={e => this.setState({password:e.target.value})}/>
										</Form.Field>
										<Button onClick={this.login}>Login</Button>
									</Form>
									<Transition visible={this.state.error} animation='swing right' duration={500}>
										<Message negative>
										    <Message.Header>Ocurrio un error</Message.Header>
										    <p style={{color:'#9f3a38'}}>Intente nuevamente</p>
										</Message>
									</Transition> </>
								</Transition> 
							</Col>
							<Col sm={12} md={3} debug></Col>
						</Row>
					</Container>
				</Container>
			</div>
		);
	}
}