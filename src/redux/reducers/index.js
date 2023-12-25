import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import favorReducer from './favorReducer';
import productReducer from './productReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    authReducer,
    cartReducer,
    favorReducer,
    productReducer,
    notifications: notificationReducer,
});

export default rootReducer;
