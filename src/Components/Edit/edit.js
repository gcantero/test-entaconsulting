import React, { Component }                         from 'react';
import './edit.css';
import { connect }                                  from 'react-redux';
import moment                                       from 'moment';
import Grid                                         from '@material-ui/core/Grid';
import DateFnsUtils                                 from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel                                   from '@material-ui/core/InputLabel';
import MenuItem                                     from '@material-ui/core/MenuItem';
import FormControl                                  from '@material-ui/core/FormControl';
import Select                                       from '@material-ui/core/Select';
import TextField                                    from '@material-ui/core/TextField';
import Autocomplete                                 from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast }                    from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidatorForm, TextValidator }             from 'react-material-ui-form-validator';
import { searchProvContract, setUpdate, clearNotify } from '../../actions/contract';


class Edit extends Component {

    constructor() {

        super();
        this.state = { 
            button: false,
            icon: 'fa fa-save',
            id: '',
            nrocontrato: '',
            fechainicio: moment().format(),
            estado: '',
            montobase: '',
            contratistaid: '',
            provinciaid: ''
        }

        this.setUpdate = this.setUpdate.bind(this);

    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {

        if(nextProps.edit) {

            this.setState({
                id: nextProps.edit.id,
                nrocontrato: nextProps.edit.nroContrato,
                estado:  nextProps.edit.estado,
                montobase:  nextProps.edit.montoBase,
                contratistaid:  nextProps.edit.contratistaId,
                provinciaid:  nextProps.edit.provinciaId
            })

        }
      }

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

    setUpdate = () => {

        const params = {

            id: Number(this.state.id),
            nroContrato: this.state.nrocontrato,
            fechaInicio: moment(this.state.fechainicio).format(),
            estado: Number(this.state.estado),
            montoBase:  Number(this.state.montobase),
            contratistaId: Number(this.state.contratistaid),
            provinciaId: Number(this.state.provinciaid)

        }

        this.props.setUpdate(params);

    }

    newContractors = (e) => {

        if(e === null || e === undefined) {

        } else {

            this.setState({
                contratistaid: e.id
            });

            this.props.searchProvContract(e.id);
        }

    }

      
    start = (type, info) => {
        
        this.notify(type, info);

        this.props.clearNotify();

        this.setState({
            button: true
        })
    }

    notify = (type, info) => toast(info, { type: type});

    
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
                        <h5>Update contract -  
                            <span>
                            {
                                this.props.edit? 
                                (
                                    this.props.edit.nroContrato
                                ):(null)
                            }
                            </span>
                        </h5>
 
                    </div>
                    <div className="card-body">

                    <ValidatorForm ref="form" onSubmit={this.setUpdate}>

                    <div className="input-group mb-3">
                        <Autocomplete
                            id="combo-box-demo"
                            options={this.props.contractors}
                            getOptionLabel={option => option.razonSocial}
                            onChange={(event, newValue) => { this.newContractors(newValue);}}
                            renderInput={params => <TextField {...params} label="Contratistas" margin="normal" />}
                            />
                    </div>

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
                                this.props.prov? 
                                (
                                this.props.prov.map((prov) => 
                                    <MenuItem key={prov.id} value={prov.id}>{prov.nombre}</MenuItem>
                                )            
                                )
                                :
                                (null)   
                            }
                            
                        </Select>
                        </FormControl>
                    </div>

                    <button disabled={this.state.button} className="btnSave" type="submit"> 
                    <i className={this.state.icon}></i>
                        Update contract
                    </button>
               
                    </ValidatorForm>

                    </div>
                </div>

            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        contractors:    state.contractors.contractors,
        edit:           state.searchContract.searchEdit,
        prov:           state.searchProvContract.searchProv,
        notifyStatus:   state.notifyStatus
    }
}

const mapDispatchToPropsActions = dispatch => {
    return { 

        setUpdate:  value => dispatch(setUpdate(value)),
        searchProvContract: value => dispatch(searchProvContract(value)),
        clearNotify: value => dispatch(clearNotify(value))

    }
}

export default connect(mapStateToProps, mapDispatchToPropsActions)(Edit);