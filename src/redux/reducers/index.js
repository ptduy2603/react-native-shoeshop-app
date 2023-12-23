import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import favorReducer from "./favorReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({authReducer, cartReducer, favorReducer, productReducer})

export default rootReducer