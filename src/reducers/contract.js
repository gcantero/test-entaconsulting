import { SET_CONTRACT_DATA } from '../constants/action-types';

export const contract = (state = {}, action) => {
    switch (action.type) {
        case SET_CONTRACT_DATA:
            
            const { contract } = action.payload;

            return {...state, contract: contract}
    
        default:
           return state;
    }
}