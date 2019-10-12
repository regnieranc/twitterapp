import React, {Component} from 'react'
import {slide as Menu} from 'react-burger-menu'
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '26px',
    height: '18px',
    left: '20px',
    top: '20px'
  },
  bmBurgerBars: {
    background: '#ffffff'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
    
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflow: 'hidden' 
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'block',
    textDecoration: 'none',
    color: 'white',
    padding: '10px',
    width: '100%'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


export default class Movil extends Component{
	render(){
		return(
			<Menu styles = {styles} id='stack'>
				<Link to='/' className='menu-item'>Inicio</Link>
		        
				{
		          localStorage.name?
		          <Link to='/perfil' style={{position:'absolute', bottom:0, width: '200px'}}><Icon circular name='user' color='teal'/>  {localStorage.name}</Link> : null
		        }
			</Menu>
		)
	}
}