import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as materialReducer } from '../pages/Material/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as operationReducer } from '../pages/OperationRecord/store';
import { reducer as staffReducer } from '../pages/Staffinfo/store';
import { reducer as stallReducer } from '../pages/Stall/store';
import { reducer as recipeReducer } from '../pages/Recipe/store';
import { reducer as transactionReducer } from '../pages/TransactionRecord/store';
import { createStore } from 'redux'
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
const persistConfig = {
	key: 'root',
	storage : storage,
	whitelist: ['login']
}


const reducer = combineReducers({
	header: headerReducer,
	home: homeReducer,
	material: materialReducer,
	login: persistReducer(persistConfig,loginReducer),
	operation: operationReducer,
	staff: staffReducer,
	stall: stallReducer,
	recipe: recipeReducer,
	//transaction: transactionReducer
});

export default reducer;
