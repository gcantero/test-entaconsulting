import { SET_CONTRACT_DATA, SET_INSERT_DATA, SET_NOTIFY_STATUS, SET_DELETE_DATA, SET_SEARCH_DATA, SET_PROV_DATA, SET_UPDATE_DATA } from '../constants/action-types';

const setContractData = payload => ({
    type: SET_CONTRACT_DATA, payload
});

const setInsertData = payload => ({
    type: SET_INSERT_DATA, payload
});

const notify = payload => ({
    type: SET_NOTIFY_STATUS, payload
})

const setDeleteData = payload => ({
    type: SET_DELETE_DATA, payload
})

const setSearchData = payload => ({
    type: SET_SEARCH_DATA, payload
})

const setProvData = payload => ({
    type: SET_PROV_DATA, payload
})

const setUpdateData = payload => ({
    type: SET_UPDATE_DATA, payload
})

const domain = 'https://smartcost-poc-api.azurewebsites.net/api';


export const setContract = payload => {

    return dispatch => {

        return fetch(`${domain}/Contratos`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                dispatch(setContractData({contract: data}))
            }
        });
    }
};

export const insert = payload => {

    return dispatch => {

        return fetch(`${domain}/Contratos`, {
           method: 'POST',
            headers: {
               'Content-Type': 'application/json', 
               'Accept': 'application/json'
                    },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            switch (data.status) {

                case 400:

                    dispatch(notify({type: 'error', info: 'Error al guardar datos !', status: true}));
                    dispatch(setInsertData({insert: data}));

                break;
            
                default:
                         
                    dispatch(notify({type: 'success', info: 'Guardado correctamente !', status: true}));
                    dispatch(setInsertData({insert: data}));

                break;
   
            }

                       
        });

        
    }
    
};

export const setDelete = payload => { 

    return dispatch => { 

        return fetch(`${domain}/Contratos/${payload}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            switch (data.status) {

                case 400:

                    dispatch(notify({type: 'error', info: 'Error al intentar eliminar !', status: true}));
                    dispatch(setDeleteData({infoDelete: data}));

                break;
            
                default:
                       
                    dispatch(notify({type: 'success', info: 'Eliminado correctamente !', status: true}));
                    dispatch(setDeleteData({infoDelete: data}));

                    fetch(`${domain}/Contratos`, {
                        method: 'GET',
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if(data.length > 0) {
                            dispatch(setContractData({contract: data}))
                        }
                    });

                break;
   
            }

        });

    }

};

export const setSearchContract = payload => {

    return dispatch => { 

        return fetch(`${domain}/Contratos/${payload.id}`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            switch (data.status) {

                case 400:

                    dispatch(setSearchData({searchEdit: data}));

                break;
            
                default:
                       
                    dispatch(setSearchData({searchEdit: data}));

                    fetch(`${domain}/Contratistas/${payload.contratistaId}/Provincias`)
                        .then(response => {
                            return response.json();
                        })
                        .then(dataProv => {

                            dispatch(setProvData({searchProv: dataProv}));

                        });

                break;
   
            }

        });

    }

};

export const searchProvContract = payload => {

    return (dispatch) => { 

        return fetch(`${domain}/Contratistas/${payload}/Provincias`)
        .then(response => {
            return response.json();
        })
        .then(data => {

            switch (data.status) {

            case 400:

                dispatch(setProvData({searchProv: data}));

            break;

            default:
                       
                dispatch(setProvData({searchProv: data}));

            break;

            }
        
        });

    } 
};

export const setUpdate = payload => {

    return dispatch => {

        return fetch(`${domain}/Contratos/${payload.id}`, {
           method: 'PUT',
            headers: {
               'Content-Type': 'application/json', 
               'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response;
        })
        .then(data => {

            // la api no retorna mucha info como para validar estatos

            dispatch(notify({type: 'success', info: 'Actualizado correctamente !', status: true}));
            dispatch(setUpdateData({update: data}));

            // switch (data.status) {

            //     case 400:

            //         dispatch(notify({type: 'error', info: 'Error al actualizar !', status: true}));
            //         dispatch(setUpdateData({update: data}));

            //     break;
            
            //     default:
                         
            //         dispatch(notify({type: 'success', info: 'Actualizado correctamente !', status: true}));
            //         dispatch(setUpdateData({update: data}));

            //     break;
   
            // }
                 
        });
        
    }

}

export const clearNotify = payload => {

    return (dispatch) => { 
        return dispatch(notify({type: '', info: '', status: ''}));
    }

}