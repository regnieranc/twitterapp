import React, {Component} from 'react'
import {Container, Row, Col} from 'react-grid-system'
import {Image, Button, Icon, Popup} from 'semantic-ui-react'
import './styles.css'
import TimeAgo from 'timeago-react'
import {Server, Api, MyHeaders} from './../../utils/constant'


export default class ListaTweets extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
		//console.log('listatweets', this.props.tweets)
	}

	like = async (id, reaccion) => {
		try{
			let formulario = new FormData()
			formulario.append('id', id)
			formulario.append('usuario_id', this.props.usuario_id)
			formulario.append('reaccion', reaccion)
			let response = await fetch(Server+Api.tweets.reaccion, {method:'post', headers:MyHeaders, body:formulario})
			let data = await response.json()
			if(data.proceso==1){
				this.props.disparador()
			}
			console.log(data)
		}catch(e){
			console.log(e)
		}
		
	}

	render(){
		return(
			<Container>
				{
					this.props.tweets?
					<div className={'mt-50'}>
					{
						this.props.tweets.map(ele => {
							let likes=`(${ele.likes})`, dislikes=`(${ele.dislikes})`
							if(ele.likes==0)likes=''
							if(ele.dislikes==0)dislikes=''
							let blue="blue", red='red'
							if(ele.likedislike!=null){
								if(ele.likedislike==0){
									red="green"
								}
								if(ele.likedislike==1){
									blue="green"
								}
							}
							
							return 	<div key={ele.id} className={'tweet'}>
										<Row>
											<Col sm={3} style={{textAlign:'center'}}>
												<Image src={this.props.fotoperfil}  size={'tiny'}  avatar/>
											</Col>
											<Row>
												<Col sm={12}>
														<TimeAgo
													  		datetime={ele.created_at} 
													  		locale='cl'
													  		className={'timeago'}
														/>
							 						<p style={{color: "#595959", fontSize:16, marginTop:4}}>{ele.tweet}</p>
							 					</Col>
						 					</Row>

										</Row>
										<Row>
					 						<Col sm={12} style={{textAlign:'center'}}> 
					 							<Popup inverted content={`Likes ${likes}`} trigger={
						 							<Button  onClick={() => this.like(ele.id, 1)} icon>
							 							<Icon name='thumbs up outline' color={blue}/>
							 						</Button>
					 							} />
						 						
						 						<Popup inverted content={`Dislikes ${dislikes}`} trigger={
							 						<Button onClick={() => this.like(ele.id, 0)} icon>
							 							<Icon name='thumbs down outline' color={red}/>
							 						</Button>
						 						} />
						 						
						 						<Button content="Retweet"/>
											</Col>
										</Row>
					 				</div>
					 		})
					} 
					</div>
					: 
					<div className={'mt-50'}>
					</div>
				}
			</Container>
		)
	}
}