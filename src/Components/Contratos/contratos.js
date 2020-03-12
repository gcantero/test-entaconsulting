import React, {PureComponent} from 'react';
import './contratos.css'
import MaterialTable from 'material-table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

export default class Contratos extends PureComponent {

    constructor() {
        super();
        this.state = {
            data: [],
            columns: [ 
                { title: 'N° contrato', field: 'nroContrato' },
                { title: 'Fecha', field: 'fechaInicio' },
                { title: 'Estado', field: 'estado' },
                { title: 'Monto Base', field: 'montoBase' }
            ],
        }
    }

    componentDidMount() {
        this.listContratos();
    }

    notify = () => toast.success("Eliminado correctamente... :)");

    delete = (id) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Desea eliminar el contrato ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteItem(id)
            },
            {
              label: 'No',
            }
          ]
        });
    }

    update = () => {
        confirmAlert({
          title: 'Update',
          message: 'Sorry, no pude completar la funcion update.',
          buttons: [
            {
              label: 'Yes',
            
            },
            {
              label: 'No',
           
            }
          ]
        });
    }

    deleteItem = (id) => {

        fetch(`${domain}/Contratos/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.listContratos();
            this.notify();
        });

    }

    listContratos= () => {

        fetch(`${domain}/Contratos`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                this.setState({
                    data: data
                })
            }
        });
    }

    render() {
        return (
            <div>
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <h5>Mis contratos</h5>
                </div>
            <div className="card-body">
                <MaterialTable
                    title="Contratos"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'delete_outline',
                            tooltip: 'Delete',
                            onClick: (e, rowData) => {this.delete(rowData.id)}
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (e, rowData) => {this.update()}
                        }
                    ]}>
                </MaterialTable>
            </div>             
            </div>     
            </div>
        )
    }

}