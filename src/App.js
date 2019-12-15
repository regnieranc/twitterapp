import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './pages/index'
import Perfil from './pages/Perfil'
import 'semantic-ui-css/semantic.min.css'


function App(){
    return(
        <BrowserRouter>
            <Switch>
            	<Route path='/perfil/:nick' component={Perfil} />
                <Route path='/' component={Index} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
