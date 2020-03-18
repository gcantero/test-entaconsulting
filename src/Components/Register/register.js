import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from 'material-table';
import Modal from '../Modal/modal';
import { setContractors } from '../../actions/index';

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

class Register extends PureComponent {

    constructor() {
        super();
        this.state = {
            prov: [],
            show: false,
            value: '',
            mod: 1,
            columns: [ { title: 'Contratista', field: 'razonSocial' } ],
        };


    }

    componentDidMount() {
        this.props.setContractors();
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

    notify = (type, info) => toast(info, { type: type});

    render() {

        return (
            <div>  

            <Modal onClose={this.hideModal} show={this.state.show} prov={this.state.prov} value={this.state.value} mod={this.state.mod}></Modal>
            <ToastContainer />

                <div className="card">
                    <div className="card-header">
                        <h5>Lista de contratistas</h5>

                    </div>
                    <div className="card-body">
                        <MaterialTable
                            title="Contratistas"
                            columns={this.state.columns}
                            data={this.props.contractors}
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

Register.propTypes = {
   setContractors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        contractors: state.contractors.contractors
    }
}

const mapDispatchToPropsActions = dispatch => {
    return {
        setContractors: value => dispatch(setContractors(value))
    }
}

export default connect(mapStateToProps, mapDispatchToPropsActions)(Register);
