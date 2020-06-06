import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Material from './pages/Material/loadable.js';
import Login from './pages/login';
import store from './store';
import passwordChanging from './pages/passwordChanging';
import OperationRecord from './pages/OperationRecord';
import Staff from './pages/Staffinfo';
import Stall from './pages/Stall';
import Recipe from './pages/Recipe';
import Transaction from "./pages/TransactionRecord";
import ScheduleRecord from "./pages/ScheduleRecord";
import MaterialOrder from "./pages/MaterialOrder";
import MaterialUsage from "./pages/MaterialUsage";


class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />

                <Route path='/Login' exact component={Login}></Route>
                <Route path='/Material' exact component={Material}></Route>
                <Route path='/passwordChanging' exact component={passwordChanging}></Route>
                <Route path='/OperationRecord' exact component={OperationRecord}></Route>
                <Route path='/Staff' exact component={Staff}></Route>
                <Route path='/Stall' exact component={Stall}></Route>
                <Route path='/Recipe' exact component={Recipe}></Route>
                <Route path='/Transaction' exact component={Transaction}></Route>
                <Route path='/ScheduleRecord' exact component={ScheduleRecord}></Route>
                <Route path='/MaterialOrder' exact component={MaterialOrder}></Route>
                <Route path='/MaterialUsage' exact component={MaterialUsage}></Route>
            </div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
