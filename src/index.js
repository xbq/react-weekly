import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom'
import App from './App';
import Navi from './components/Navi/Navi'
ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/manage" component={Navi}/>
        </div>
    </HashRouter>
), document.getElementById('root'));


