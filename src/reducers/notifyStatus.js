import { SET_NOTIFY_STATUS } from '../constants/action-types';

export const notifyStatus = (state = {}, action) => {
    switch (action.type) {
        case SET_NOTIFY_STATUS:
 
            const { type, info, status } = action.payload;

            return {...state, type: type, info: info, status: status}
    
        default:
           return state;
    }
}