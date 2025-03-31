import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './Reducers/globalReducer'

const store = configureStore({
    reducer: {
        global: globalReducer
    }
})
export default store
