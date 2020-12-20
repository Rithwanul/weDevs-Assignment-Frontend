import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NetworkAddress from "../Networks/NetworkAddress";

export default class Nav extends Component{


    handleChange = () => {

        const config = {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }

        axios.get(NetworkAddress.Logout, config).then(
            res =>  {
                        if(res.status == 200){
                            localStorage.clear();
                            this.props.setUser(null);
                        }
            },
            err => {
                console.log(err);
            }
            )
    } 

    render(){

        let buttons;

        if (this.props.user) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">Products List</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products/add" className="nav-link">Add Products</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="/" onClick={this.handleChange} className="nav-link">Logout</Link>
                    </li>
                </ul>
            )
        }else{
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Sign up</Link>
                    </li>
                </ul>
            )
        }

        return(
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link to="/"  className="navbar-brand">Home</Link> 
                    <div className="collapse navbar-collapse">
                        {buttons}
                    </div>
                </div>
            </nav>
        )
    }
}