import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom'
import App from './App';
import Manage from './components/Manange';

ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/manage" component={Manage}/>
        </div>
    </HashRouter>
), document.getElementById('root'));


