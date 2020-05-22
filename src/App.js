import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Material from './pages/Material/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';
import passwordChanging from './pages/passwordChanging';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
                <Route path='/Material' exact component={Material}></Route>
                <Route path='/passwordChanging' exact component={passwordChanging}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
