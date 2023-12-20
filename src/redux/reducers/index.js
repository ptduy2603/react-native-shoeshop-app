import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import favorReducer from "./favorReducer";

const rootReducer = combineReducers({authReducer, cartReducer, favorReducer})

export default rootReducer