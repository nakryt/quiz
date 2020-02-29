import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {reducer as formReducer} from "redux-form";
import quiz from "./quiz"
import auth from "./auth";
import {composeWithDevTools} from 'redux-devtools-extension'

const reducers = combineReducers({quiz, auth, form: formReducer})
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

