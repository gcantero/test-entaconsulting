import React, {PureComponent} from 'react';
import './home.css'

export default class Home extends PureComponent {

    render() {
        return (
            <div className="row">

            <div className="col-md-12">

            <div className="jumbotron">
                <h1 className="display-4">Bienvenidos !</h1>
                <p className="lead">Antes que nada quiero darles las gracias por la oportunidad en esta prueba. </p>
                <hr className="my-4"/>
                <p>A continuacion les presento esta pequeña prueba, espero que sea de su agrado.</p>              
            </div>
               
            <div className="card-deck">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Contratistas</h5>
                        <i className="fa fa-wrench iconSize"></i>
                        <p className="card-text">Puede encontrar una lista de todos los contratistas disponibles, buscar, seleccionar y crear un nuevo contrato.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Mis contratos</h5>
                        <i className="fa fa-file-word-o iconSize"></i>
                        <p className="card-text">Encontrara todos los contratos desponibles, podra buscar, eliminar y editar el mismo.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">Proyectos</h5>
                    <i className="fa fa-star iconSize"></i>
                    <p className="card-text">Ejemplo de otras opciones...</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
    }

}