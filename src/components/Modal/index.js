import React, {Component} from 'react'
import { Button, Header, Image, Modal, Input } from 'semantic-ui-react'

export default class index extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
	}

	render(){
		return(
			<Modal open={this.props.open}>
    			<Modal.Header>{this.props.header}</Modal.Header>
    			<Modal.Content image>
	    			<Modal.Description>
	    				{
	    					this.props.login?
	    					<>
	    						<Input size='large' placeholder='' />
	    					</>
	    					  : null
	    				}
	    			</Modal.Description>
	    		</Modal.Content>
    		</Modal>
		);
	}
}