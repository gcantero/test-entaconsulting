import { SET_INSERT_DATA } from '../constants/action-types';

export const insertContract = (state = {}, action) => {
    switch (action.type) {
        case SET_INSERT_DATA:

            const { insert } = action.payload;

            return {...state, insert: insert }
    
        default:
           return state;
    }
}