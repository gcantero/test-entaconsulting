import React, { PureComponent }  from "react";
import "./modal.css";
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const domain = 'https://smartcost-poc-api.azurewebsites.net/api'

export default class Modal extends PureComponent {

    constructor (props) {

        super(props)

        this.state = {
            button: false,
            icon: 'fa fa-save',
            nrocontrato: '',
            fechainicio: '',
            estado: '',
            montobase: '',
            contratistaid: '',
            provinciaid: ''
        };

        this.onNroContratoChange = this.onNroContratoChange.bind(this);
        this.onFechaInicioChange = this.onFechaInicioChange.bind(this);
        this.onEstadoChange = this.onEstadoChange.bind(this);    
        this.onMontoBaseChange = this.onMontoBaseChange.bind(this);
        this.onProvinciaIdChange = this.onProvinciaIdChange.bind(this);

        this.registers = this.registers.bind(this);
    }

    componentDidMount() { }

    onNroContratoChange (e) {
        this.setState({ nrocontrato: e.target.value });
    }
    onFechaInicioChange (e) {
        this.setState({ fechainicio: e.target.value });
    }
    onEstadoChange (e) {
        this.setState({ estado: e.target.value });   
    }
    onMontoBaseChange (e) {
        this.setState({ montobase: e.target.value });
    }
    onProvinciaIdChange (e) {
        this.setState({ provinciaid: e.target.value });
    }  
    onClose = e => { 
        this.props.onClose && this.props.onClose (e); 
    }; 

    registers() {

        const params = {
            nroContrato: this.state.nrocontrato,
            fechaInicio: moment(this.state.fechainicio).format(),
            estado: Number(this.state.estado),
            montoBase: Number(this.state.montobase),
            contratistaId: this.props.value.id,
            provinciaId: Number(this.state.provinciaid)
        }

        this.setState({
            button: true,
            icon: 'fa fa-spinner fa-spin'
        });

        fetch(`${domain}/Contratos`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json', 
               'Accept': 'application/json'
                    },
            body: JSON.stringify(params)
        })
        .then(response => {

            return response.json();

        })
        .then(data => {

            this.setState({
                nrocontrato: '',
                fechainicio: '',
                montobase: ''
            })

            this.setState({
                button: false,
                icon: 'fa fa-save'
            });

            this.notify();

        });     
    }

    notify = () => toast.success("Guardado correctamente... :)");

    render() {

        if(!this.props.show){
           
            return null;
        }

        return ( 
          
            <div className="conteModal"> 
                <div className="conteBody">
                <div className="scroll"> 
                <div className="modal-headers">
                <ToastContainer />
                    <strong>Contratista: <small>{this.props.value.razonSocial}</small></strong>
                </div>

                <ValidatorForm ref="form" onSubmit={this.registers}>
              
                    <div className="input-group mb-3">
                         
                    <TextField
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue= {this.state.fechainicio}
                        onChange={this.onFechaInicioChange}
                        className="form-control"/>  
                   </div>

                   <div className="input-group mb-3">
                        <TextValidator
                        name="nrocontrato"
                        label="N° contrato"
                        type="text"
                        onChange={this.onNroContratoChange}
                        value={this.state.nrocontrato}
                        validators={["required"]}
                        errorMessages={["El compo es requerido"]}/>
                   </div>

                   <div className="input-group mb-3">
                   
                        <TextValidator
                        name="montobase"
                        label="Monto Base"
                        type="text"
                        onChange={this.onMontoBaseChange}
                        value={this.state.montobase}
                        validators={["required"]}
                        errorMessages={["El compo es requerido"]}/>
                   
                   </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Estado</label>
                        </div>
                        <select className="form-control" onChange={this.onEstadoChange}>
                            <option>Choose...</option>
                            <option value="0">Zero</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Provincia</label>
                        </div>
                        <select className="form-control" onChange={this.onProvinciaIdChange}>
                            <option>Choose...</option>
                            {
                                this.props.prov.map((prov) => 
                                <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                                )               
                            }
                        </select>  
                    </div>

                    <button disabled={this.state.button} className="btnSave" type="submit"> 
                    <i className={this.state.icon}></i>
                        Save new contract
                    </button>
               
                </ValidatorForm>

                </div> 
                <footer className="modal-foo"> 
                    <button className="btnClose" onClick = {this.onClose}> Close </button> 
                  
                </footer> 
                </div>
            </div> 
        )
    }
}