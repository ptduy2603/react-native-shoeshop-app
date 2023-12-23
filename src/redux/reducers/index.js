import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import favorReducer from "./favorReducer";
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({authReducer, cartReducer, favorReducer,notificationReducer,})

export default rootReducer