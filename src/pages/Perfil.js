import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import { Form, TextArea, Image } from 'semantic-ui-react'
import CountUp from 'react-countup';
import {ComprobarUsuario} from './../utils/functions'
import {Redirect} from 'react-router-dom'
import {Server, Api, MyHeaders} from './../utils/constant'

export default class Perfil extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nick:null,
			acceso:null
		}
	}

	componentDidMount(){debugger
		if(ComprobarUsuario(Server+Api.usuario.me, MyHeaders)){
			this.setState({nick:this.props.match.params.nick, acceso:true})
			console.log('si')
		}else{
			this.setState({acceso:false})
			console.log('no')
		}
		
		console.log(this.props.match.params.nick)
	}



	render(){
		return(
			<Container>
			{
				!this.state.acceso?
				<Redirect to = "/" /> : null
			}
				<Row style={{marginTop:'20px',marginBottom: '20px'}}>
					<Col debug>
						<Row>
							<Col md={4} debug style={{textAlign:'center'}}>
								<Row>
									<Col>
										<Image src='http://custom13.com/15702/parche-bordado-cuadrado-metallica.jpg' size='small' avatar centered />
									</Col>
								</Row>
								<Row>
									<Col>
										aqui datos de ubicacion
									</Col>
								</Row>
							</Col>
							<Col md={8} debug>
								{this.state.nick}
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col md={6}></Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>tweets</h4>
						<CountUp
						  start={0}
						  end={100}
						  duration={2}
						/>
					</Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>seguidores</h4>
						<CountUp
						  start={0}
						  end={100}
						  duration={2}
						/>
					</Col>
					<Col md={2} style={{textAlign:'center'}}>
						<h4>siguiendo</h4>
						<CountUp
						  start={0}
						  end={100}
						  duration={2}
						/>
					</Col>
				</Row>
				<Row style={{margin:'10 0'}}>
					<Col debug>	
						<Form>	
							<TextArea rows={2} placeholder='¿Qué está sucediendo?' />
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}