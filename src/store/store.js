import { createStore } from 'redux';
import { asyncStorage } from 'react-native';
import dataReducer from './reducers/dataReducer';

const store = createStore(dataReducer);

export default store; 