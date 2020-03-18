import React, {PureComponent}           from 'react';
import { connect }                      from 'react-redux';
import './contratos.css'
import PropTypes                        from 'prop-types';
import MaterialTable                    from 'material-table';
import { confirmAlert }                 from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast }        from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setContract, setDelete, setSearchContract, clearNotify } from '../../actions/contract';

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

class Contratos extends PureComponent {

    constructor() {
     
        super();
        this.state = {
            data: [],
            prov: [],
            show: false,
            value: '',
            mod: 2,
            columns: [ 
                { title: 'N° contrato', field: 'nroContrato' },
                { title: 'Fecha', field: 'fechaInicio' },
                { title: 'Estado', field: 'estado' },
                { title: 'Monto Base', field: 'montoBase' }
            ],
        }

    }

    componentDidMount() {
       this.props.setContract();
    }

    notify = (type, info) => toast(info, { type: type});

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

        this.props.setDelete(id);

    }

    start = (type, info) => {

        this.notify(type, info);

        this.props.clearNotify();

    }

    provincias(info) {

        fetch(`${domain}/Contratistas/${info.id}/Provincias`)
        .then(response => {
            return response.json();
        })
        .then(prov => {
          this.setState({ 
            prov: prov,
            value: info,
            show: !this.state.show 
          })

        });     
    }

    edit = e => {

        this.props.setSearchContract(e);
        this.props.history.push('/edit')
    }

    render() {
        return (
            <div>

            <ToastContainer />
            <div className="none">
                {    
                    this.props.notifyStatus.status? 
                    ( 
                        this.start(this.props.notifyStatus.type, this.props.notifyStatus.info)
                    )
                    :
                    ( null )
                }
            </div>
            <div className="card">
                <div className="card-header">
                    <h5>Mis contratos</h5>
                </div>
            <div className="card-body">
                <MaterialTable
                    title="Contratos"
                    columns={this.state.columns}
                    data={this.props.contract}
                    actions={[
                        {
                            icon: 'delete_outline',
                            tooltip: 'Delete',
                            onClick: (e, rowData) => {this.delete(rowData.id)}
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (e, rowData) => {this.edit(rowData);}
                        }
                    ]}>
                </MaterialTable>
            </div>             
            </div>     
            </div>
        )
    }

}

Contratos.propTypes = {
    setContract: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        contract:       state.contract.contract,
        notifyStatus:   state.notifyStatus
    }
}

const mapDispatchToPropsActions = dispatch => {
    return {
        
        clearNotify:        value => dispatch(clearNotify(value)),
        setContract:        value => dispatch(setContract(value)),
        setDelete:          value => dispatch(setDelete(value)),
        setSearchContract:  value => dispatch(setSearchContract(value))
    }
}

export default connect(mapStateToProps, mapDispatchToPropsActions)(Contratos);