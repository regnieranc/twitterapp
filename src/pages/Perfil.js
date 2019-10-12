import React from 'react'

export default class Perfil extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}

	componentDidMount(){
		console.log(this.props.match.params.nick)
	}

	render(){
		return(
			<div>
			</div>
		)
	}
}