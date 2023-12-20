import { ADD_TO_FAVORITES } from '../actions';

const initialState = {
    favorites: [],
};

const favorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        // ... (other cases)
        default:
            return state;
    }
};

export default favorReducer;