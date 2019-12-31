import React from 'react'
import InputFiles from 'react-input-files'
import {Modal, Header, Icon, Image, Button, Divider} from 'semantic-ui-react'

export default class index extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	perfil:false,
	  	fotop:null,
	  	selectedFile: null,
    	imagePreviewUrl: null
	  }
	}

	changeImage = file => {
		if(file.length!=0){
			this.setState({perfil:true, fotop:file})
		}
		console.log(file)
	}
	uploadImage = () => {

	}

	fileChangedHandler = async event => {
	    this.setState({
	      selectedFile: event.target.files[0]
	    })
	 
	    let reader = new FileReader();
	     
	     reader.onloadend = async () => {
	      await this.setState({
	        imagePreviewUrl: reader.result
	      });
	    }
	 
	    await reader.readAsDataURL(event.target.files[0])
	    console.log(this.state)
 
  }
	render(){
		let $imagePreview = null;
	    if (this.state.imagePreviewUrl) {
	      $imagePreview = (<div className="image-container" ><Image src={this.state.imagePreviewUrl} className={'circular'} size='medium' /> </div>);
	    }else{
	    	$imagePreview = (<div className="image-container" ><Image src={this.state.fotop} className={'circular'} size='medium' /> </div>);
	    }
		return(
			<div>

				<Modal onClose={this.close} trigger={<Icon name={'camera'} size='big' style={{opacity:0.5, cursor:'pointer'}}/> }>
					<Modal.Header>Sube tu foto de perfil o de biografia</Modal.Header>
					<Modal.Content>
							<Modal.Description>
				        	<Header>Foto de perfil</Header>
				        	<div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
				        		{ $imagePreview }
				        		{
				        			this.state.perfil?
				        			<div  style={{marginTop:30}}><Button onClick={this.uploadImage}>Subir Foto</Button>
				        			<Button  onClick={() => this.setState({perfil:false})}>Cancelar</Button></div>
				        			:
					        		<InputFiles onChange={this.changeImage} style={{marginTop:30}}>
										<Button>Elegir Imagen</Button>
									</InputFiles>
				        		}
								
								
								<Divider />
								<div className="App">
							         <input type="file" name="avatar" onChange={this.fileChangedHandler} />
							         <button type="button" onClick={this.submit} > Upload </button>
						      </div>
				        	</div>
			      		</Modal.Description>
		    		</Modal.Content>
		  		</Modal>
			</div>
		)
	}
}