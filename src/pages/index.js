import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import {Button} from 'semantic-ui-react'
import Header from './../components/Header'
import {Link} from 'react-router-dom'
import './style.css'

export default class index extends React.Component{
	render(){
		return(
			<div>
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
								<Button big color='blue' attached style={{marginBottom: '10px'}}>Registrarse</Button>
								<Button big color='blue' attached>Ingresar</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}