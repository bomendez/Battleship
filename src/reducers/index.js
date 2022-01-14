import { combineReducers } from 'redux';
import { BoardReducer } from './board';
import { PlayerReducer } from './player';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['BoardReducer'],
}

const rootReducer = combineReducers({
    BoardReducer
});

export default persistReducer(persistConfig, rootReducer);