import React from 'react'
import { Visible, Container, Row } from 'react-grid-system';
import Web from './Web'
import Movil from './Movil'

const Headers = () => {
	return(
			<>
				<Container>
					<Visible lg xl md>
						<Web />
					</Visible>
				</Container>	
				<Visible xs sm>
					<Movil />
				</Visible>
			</>
		)
}

export default Headers
