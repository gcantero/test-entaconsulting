import { SET_CONTRACTORS_DATA } from '../constants/action-types';

export const contractors = (state = {}, action) => {
    switch (action.type) {
        case SET_CONTRACTORS_DATA:
            
            const { contractors } = action.payload;

            return {...state, contractors: contractors}
    
        default:
           return state;
    }
}