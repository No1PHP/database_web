import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Material from './pages/Material/loadable.js';
import Login from './pages/login';
import store from './store';
import passwordChanging from './pages/passwordChanging';
import OperationRecord from './pages/OperationRecord';
import Staff from './pages/Staffinfo';
import Stall from './pages/Stall';
import Recipe from './pages/Recipe';
import Transaction from "./pages/TransactionRecord";

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
                <Route path='/Material' exact component={Material}></Route>
                <Route path='/passwordChanging' exact component={passwordChanging}></Route>
                <Route path='/OperationRecord' exact component={OperationRecord}></Route>
                <Route path='/Staff' exact component={Staff}></Route>
                <Route path='/Stall' exact component={Stall}></Route>
                <Route path='/Recipe' exact component={Recipe}></Route>
                <Route path='/Transaction' exact component={Transaction}></Route>

      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
