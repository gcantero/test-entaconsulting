import { SET_UPDATE_DATA } from '../constants/action-types';

export const updateContract = (state = {}, action) => {
    switch (action.type) {
        case SET_UPDATE_DATA:
            
            const { update } = action.payload;

            return {...state, update: update}
    
        default:
           return state;
    }
}