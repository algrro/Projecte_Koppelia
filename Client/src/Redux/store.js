import { createStore, applyMiddleware} from 'redux'
import { combineReducers } from 'redux'
import {thunk} from 'redux-thunk'
import studentReducer from './Reducers/studentReducer'

const rootReducer = combineReducers({
    student: studentReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store