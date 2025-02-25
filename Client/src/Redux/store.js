import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './Reducers/studentReducer'

const store = configureStore({
    reducer: {
        student: studentReducer
    }
})
export default store
