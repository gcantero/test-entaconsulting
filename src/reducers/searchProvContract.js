import { SET_PROV_DATA } from '../constants/action-types';

export const searchProvContract = (state = {}, action) => {
    switch (action.type) {
        case SET_PROV_DATA:
            
            const { searchProv } = action.payload;

            return {...state, searchProv: searchProv}
    
        default:
           return state;
    }
}