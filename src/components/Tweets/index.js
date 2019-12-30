import React, {Component} from 'react'
import {Container, Row, Col} from 'react-grid-system'
import { Form, TextArea,Button  } from 'semantic-ui-react'
import ListaTweets from './ListaTweets'
import ListaSeguidores from './ListaSeguidores'
import TimeAgo from 'timeago-react'

export default class index extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tweet:""
	  };
	}

	twitter = (e) => {
		this.setState({tweet:e.target.value})
	}

	componentWillReceiveProps(){
		console.log(this.props)
	}

	render(){
		return(
			<Container>
				{
					this.props.panel=="tweets"?
					<Row>
						<Col>
							<Form>	
								{
									this.props.soyyo?
									<>
									<TextArea rows={2} placeholder='¿Qué está sucediendo?' onChange={this.twitter} value={this.state.tweet}/>
									{
										this.state.tweet?
										<div style={{display:'flex',marginTop:10, justifyContent: 'flex-end'}}>
											<Button content={'tweet'} onClick={() => {
												this.props.twitter(this.state.tweet)
												this.setState({tweet:''})
											}}/>
										</div> : null
									}</> : null
								}
								{
									this.props.soyyo || this.props.esamigo?
									<ListaTweets
										tweets={this.props.tweets}
										fotoperfil={this.props.fotoperfil}
										usuario_id={this.props.usuario_id}
										disparador={this.props.disparador}
									/> : null
								}
								
							</Form>
						</Col>
					</Row> : null
				}

				{
					this.props.panel=="seguidores"?
					<Row>
						<Col>
							{
								this.props.seguidores?
								<ListaSeguidores
									seguidores={this.props.seguidores}
									opcion={0}
								/> : null
							}
						</Col>
					</Row> : null
				}

				{
					this.props.panel=="siguiendo"?
					<Row>
						<Col>
							{
								this.props.siguiendo?
								<ListaSeguidores
									siguiendo={this.props.siguiendo}
									opcion={1}
								/> : null
							}
						</Col>
					</Row> : null
				}

				{
					this.props.panel=="reaccion"?
					<Row>
						<Col>
							reaccion
						</Col>
					</Row> : null
				}

				{
					this.props.panel=="retweets"?
					<Row>
						<Col>
							retweets
						</Col>
					</Row> : null
				}
			</Container>
		)
	}
}