import { 
    createStore, 
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import informationHandlerReducer from './reducers/informationHandlerReducer';
import formReducer from './reducers/formReducer';

const rootReducer = combineReducers({
    informationHandler: informationHandlerReducer,
    form: formReducer,
})
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

export default store; 