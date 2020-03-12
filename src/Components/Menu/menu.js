import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './menu.css';

export default class Menu extends PureComponent {

    render() {
        return (
            <div className="menuContainer">

            <h5 className="color">POC SmartCost</h5>

            <hr className="my-4"/>
            
                <ul className="list-menu">
                    <li>
                        <Link to={{ pathname: "/home"}} className="btn btn-secondary form-control">
                        <i className="fa fa-home"></i>
                         Home
                        </Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/register"}} type="button" className="btn btn-secondary form-control">
                        <i className="fa fa-wrench"></i>
                        Contratistas</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/contratos"}} type="button" className="btn btn-secondary form-control">
                        <i className="fa fa-file-word-o"></i>
                        Mis contratos</Link>
                    </li>
                    <hr className="my-4"/>
                    <li>
                        <Link to={{ pathname: "/config"}} type="button" className="btn btn-secondary form-control">
                        <i className="fa fa-cog"></i>
                        Setting</Link>
                    </li>
                </ul>
            
            </div>
        )
    }
}