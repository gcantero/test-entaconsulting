import { SET_DELETE_DATA } from '../constants/action-types';

export const deleteContract = (state = {}, action) => {
    switch (action.type) {
        case SET_DELETE_DATA:

            const { infoDelete } = action.payload;

            return {...state, infoDelete: infoDelete }
    
        default:
           return state;
    }
}