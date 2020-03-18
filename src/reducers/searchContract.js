import { SET_SEARCH_DATA } from '../constants/action-types';

export const searchContract = (state = {}, action) => {
    switch (action.type) {
        case SET_SEARCH_DATA:
            
            const { searchEdit } = action.payload;

            return {...state, searchEdit: searchEdit}
    
        default:
           return state;
    }
}