import React, {Component} from 'react'
import {Container, Row, Col} from 'react-grid-system'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import TimeAgo from 'timeago-react'


export default class ListaSeguidores extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}


	render(){
		console.log(this.props)
		return(
			<Container>
				<Row>
					{
						this.props.seguidores && this.props.opcion==0?
						<>
							{
								this.props.seguidores.map(ele => {
									return <Col key={ele.id} md={6} style={{marginBottom: 20, marginTop: 20}}>
												<Card>
												    <Image src={'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'} wrapped ui={false} />
												    <Card.Content>
												        <Card.Header>{ele.name}</Card.Header>
												        <Card.Meta>
												        	<TimeAgo
														  		datetime={ele.created_at} 
														  		locale='cl'
														  		className={'timeago'}
															/>
														</Card.Meta>
												        <Card.Description>{ele.descripcion}</Card.Description>
												    </Card.Content>
												    <Card.Content extra>
												        <Link to={`/perfil/${ele.nick}`}>@{ele.nick}</Link>
												    </Card.Content>
												</Card>
											</Col>
								})
							}
						</> : <Col></Col>
					}
				
					
				</Row>

				<Row>
					{
						this.props.siguiendo && this.props.opcion==1?
						<>
							{
								this.props.siguiendo.map(ele => {
									return <Col key={ele.id} md={6} style={{marginBottom: 20, marginTop: 20}}>
												<Card>
												    <Image src={'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'} wrapped ui={false} />
												    <Card.Content>
												        <Card.Header>{ele.name}</Card.Header>
												        <Card.Meta>
												        	<TimeAgo
														  		datetime={ele.created_at} 
														  		locale='cl'
														  		className={'timeago'}
															/>
														</Card.Meta>
												        <Card.Description>{ele.descripcion}</Card.Description>
												    </Card.Content>
												    <Card.Content extra>
												        <Link to={`/perfil/${ele.nick}`}>@{ele.nick}</Link>
												    </Card.Content>
												</Card>
											</Col>
								})
							}
						</> : <Col></Col>
					}
				
					
				</Row>
			</Container>
		)

	}
}