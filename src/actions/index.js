import { SET_CONTRACTORS_DATA } from '../constants/action-types';

const setContractorsData = payload => ({
    type: SET_CONTRACTORS_DATA, payload
});

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

export const setContractors = payload => {

    return dispatch => {

        return fetch(`${domain}/Contratistas`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                dispatch(setContractorsData({contractors: data}))
            }
        });
    }
};

