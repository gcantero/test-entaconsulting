import React, {PureComponent} from 'react';
import './register.css';
import MaterialTable from 'material-table';
import Modal from '../Modal/modal';

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

export default class Register extends PureComponent {

    constructor() {
        super();
        this.state = {
            prov: [],
            show: false,
            value: 1,
            columns: [ { title: 'Contratista', field: 'razonSocial' } ],
            data: [],
        };
    }

    componentDidMount() {
        this.listContractor();
    }

    listContractor= () => {

        fetch(`${domain}/Contratistas`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                this.setState({data: data})
            }
        });
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

    showModal = e => {
        this.provincias(e);
    };

    hideModal = e => {
        this.setState({ 
            show: !this.state.show 
        })
    }
  
    render() {

        return (
            <div>
                <Modal onClose={this.hideModal} show={this.state.show} prov={this.state.prov} value={this.state.value}></Modal>
                <div className="card">
                    <div className="card-header">
                        <h5>Lista de contratistas</h5>
                    </div>
                    <div className="card-body">
                        <MaterialTable
                            title="Contratistas"
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                                {
                                icon: 'fiber_new',
                                tooltip: 'new contract',
                                onClick: (e, rowData) => {this.showModal(rowData);}
                                }
                            ]}>
                        </MaterialTable>
                        <hr className="my-4"/>    
                    </div>   
                </div>
            </div>
        )
    }
}