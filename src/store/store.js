import { createStore } from 'redux';
import { asyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import dataReducer from './reducers/dataReducer';

const persistConfig = {
    // all data is saved to this key, if you change the key you will not find the data
    key: 'root',
    storage: asyncStorage,
}

const store = createStore(dataReducer);

export default store; 