import React, { PureComponent }                     from "react";
import { connect }                                  from 'react-redux';
import "./modal.css";
import moment                                       from 'moment';
import Grid                                         from '@material-ui/core/Grid';
import DateFnsUtils                                 from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel                                   from '@material-ui/core/InputLabel';
import MenuItem                                     from '@material-ui/core/MenuItem';
import FormControl                                  from '@material-ui/core/FormControl';
import Select                                       from '@material-ui/core/Select';
import { ToastContainer, toast }                    from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidatorForm, TextValidator }             from 'react-material-ui-form-validator';
import { insert, clearNotify }                      from '../../actions/contract';

class Modal extends PureComponent {
    
    constructor (props) {

        super(props)

        this.state = {
            button: false,
            icon: 'fa fa-save',
            nrocontrato: '',
            fechainicio: moment(this.props.value.fechaInicio).format(),
            estado: '',
            montobase: '',
            contratistaid: '',
            provinciaid: ''
        };

        this.newRegisters = this.newRegisters.bind(this);
   
    }

    componentDidMount() { }

    onInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onInputChangeDate = date => {
        this.setState({
            fechainicio : moment(date).format(),
        })
    }
 
    onClose = e => { 
        this.props.onClose && this.props.onClose (e); 
    }; 

    newRegisters() {

        const params = {
            nroContrato:    this.state.nrocontrato,
            fechaInicio:    moment(this.state.fechainicio).format(),
            estado:         Number(this.state.estado),
            montoBase:      Number(this.state.montobase),
            contratistaId:  Number(this.props.value.id),
            provinciaId:    Number(this.state.provinciaid)
        }

        this.props.insert(params);

    }


    newContractors = (e) => {

        if(e === null || e === undefined) {

        } else {
            this.setState({
                contratistaId: e.id
            });
        }
    }
    
    start = (type, info) => {
        
        this.notify(type, info);
        this.props.clearNotify();
    }

    notify = (type, info) => toast(info, { type: type});

    render() {

        if(!this.props.show) { return null; }

        if(this.props.mod === 1) {

            return (

                <div className="conteModal"> 

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

                    <div className="conteBody">
                    <div className="scroll"> 
                    <div className="modal-headers">
                    <ToastContainer />
                        <strong>Contratista: <small>{this.props.value.razonSocial}</small></strong>
                    </div>
    
                    <ValidatorForm ref="form" onSubmit={this.newRegisters}>
    
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                            
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="dd/MM/yyyy"
                                value={this.state.fechainicio}
                                onChange={this.onInputChangeDate}
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}/>
    
                            </Grid>
    
                        </MuiPickersUtilsProvider>
    
                       <div className="input-group mb-3">
    
                            <TextValidator className="formControl"
                            name="nrocontrato"
                            label="N° contrato"
                            type="text"
                            onChange={this.onInputChange}
                            value={this.state.nrocontrato}
                            validators={["required"]}
                            errorMessages={["El compo es requerido"]}/>
                           
                       </div>
    
                       <div className="input-group mb-3">
                       
                            <TextValidator className="formControl"
                            name="montobase"
                            label="Monto Base"
                            type="text"
                            onChange={this.onInputChange}
                            value={this.state.montobase}
                            validators={["required"]}
                            errorMessages={["El compo es requerido"]}/>
                       
                       </div>
    
                        <div className="input-group mb-3">
                            <FormControl className="formControl">
                            <InputLabel>Estado</InputLabel>
                            <Select 
                                name="estado"
                                value={this.state.estado}
                                onChange={this.onInputChange}>
                                <MenuItem>
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value="0">Zero</MenuItem>
                                <MenuItem value="1">One</MenuItem>
                                <MenuItem value="2">Two</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
    
                        <div className="input-group mb-3">
                            <FormControl className="formControl">
                            <InputLabel>Provincia</InputLabel>
                            <Select 
                                name="provinciaid" 
                                value={this.state.provinciaid}
                                onChange={this.onInputChange}>
                                <MenuItem>
                                <em>None</em>
                                </MenuItem>
                                {
                                    this.props.prov.map((prov) => 
                                        <MenuItem key={prov.id} value={prov.id}>{prov.nombre}</MenuItem>
                                    )               
                                }
                                
                            </Select>
                            </FormControl>
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
}

const mapStateToProps = state => {
    return {
        notifyStatus: state.notifyStatus
    }
}

const mapDispatchToPropsActions = dispatch => {
    return {
        insert: value => dispatch(insert(value)),
        clearNotify: value => dispatch(clearNotify(value))
    }
}

export default connect(mapStateToProps, mapDispatchToPropsActions)(Modal);