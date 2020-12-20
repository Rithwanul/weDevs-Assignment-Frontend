import React, { Component } from "react";
import axios from 'axios';
import NetworkAddress from "../Networks/NetworkAddress";
import { Redirect } from 'react-router-dom';

export default class Login extends Component{

    state   =   { active : false};

    handleSubmit = (e)  =>  {
        e.preventDefault();

        const data = {
            email       :       this.email,
            password    :       this.password,
            remember    :       this.remember
        }

        axios.post(NetworkAddress.Login, data).then(
            res => {

                console.log(res.data);
                localStorage.setItem('token', res.data.access_token);

                this.setState({
                    loggedIn    :   true
                });
                this.props.setUser(res.data.user);
            }
        ).catch(
            err  => {
                this.setState({
                    active      :   true
                });
            }   
        )
    }

    render(){

        if (this.state.loggedIn) {
            return <Redirect to={'/'} />;
        }

        if (this.state.active) {
            return(
                <h3>Verify your email in order to login</h3>
            )
        }

        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>
                        Email:
                    </label>
                    <input type="email"
                           className="form-control"
                           placeholder="Enter Email"
                           onChange={e => this.email = e.target.value} /> 
                </div>
                <div className="form-group">
                    <label>
                        Password:
                    </label>
                    <input type="password"
                           className="form-control"
                           placeholder="Enter Password" 
                           onChange={e => this.password = e.target.value} /> 
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           onChange={ e => this.remember = e.target.checked} />
                    <label className="form-check-label">
                        Remember Me
                    </label>
                </div>
                <button className="btn btn-primary btn-block mt-2">
                    Sign Up
                </button>
            </form>
        )
    }
}