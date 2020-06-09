import reducer from './reducer';
import {createStore} from 'redux';
import * as actionCreators from './actionCreators';
import * as constants from './constants';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler:autoMergeLevel2,
};

const myPersistReducer = persistReducer(persistConfig, reducer);
const store = createStore(myPersistReducer);
export const persistor = persistStore(store)


export { reducer, actionCreators, constants };
