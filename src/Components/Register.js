import React, { Component } from "react";
import axios from 'axios';
import NetworkAddress from '../Networks/NetworkAddress';
import { Redirect } from 'react-router-dom';

export default class Register extends Component{

    state = {};

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name                            :               this.name,
            email                           :               this.email,
            password                        :               this.password,
            password_confirmation           :               this.confirmPassword
        }

        axios.post(NetworkAddress.SignUp, data).then(
            res => {
                console.log(res.data.message);
                if(res.data.message){
                    this.setState({
                        signup : true
                    });
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )

    }

    render(){

        if (this.state.signup) {
            return(
                <h3>Verify your Email Account to login In</h3>
            )
        }

        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>
                        Name:
                    </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter Name"
                           onChange={e => this.name = e.target.value} /> 
                </div>
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
                <div className="form-group">
                    <label>
                        Confirm Password:
                    </label>
                    <input type="password"
                           className="form-control"
                           placeholder="Confirm Password"
                           onChange={e => this.confirmPassword = e.target.value} /> 
                </div>

                <button className="btn btn-primary btn-block">
                    Sign Up
                </button>
            </form>
        )
    }
}