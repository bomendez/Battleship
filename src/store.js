import {createStore} from 'redux';
import reducers from './reducers';
import { persistStore } from 'redux-persist';

export const store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const myPersistor = persistStore(store);

export default {store, myPersistor };