import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from './productReducer'

const rootReducer = combineReducers({authReducer, cartReducer, productReducer})

export default rootReducer