import React, { Component } from 'react';
import axios from 'axios';
import NetworkAddress from '../Networks/NetworkAddress';
import { Redirect } from 'react-router-dom';

export default class AddProduct extends Component{

    state = {};

    handleSubmit = (e)  => {

        e.preventDefault();

        const config = {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }

        const fromData = new FormData();
        fromData.append('title',        this.title);
        fromData.append('description',  this.description);
        fromData.append('price',        this.price);
        fromData.append('image', this.image, this.image.name);
        
        axios.post(NetworkAddress.AddProduct, fromData).then(
            res => {
                if (res.status == 200) {
                    this.setState({
                        data : true
                    });
                }
            }
        )
    }

    render(){

        if (this.state.data) {
            return <Redirect to = {'/added'} />
        }

        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Add product</h3>
                <div className="form-group">
                    <label>
                        Title:
                    </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter Title"
                           onChange={e => this.title = e.target.value} /> 
                </div>
                <div className="form-group">
                    <label>
                        Description:
                    </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter Description"
                           onChange={e => this.description = e.target.value} /> 
                </div>
                <div className="form-group">
                    <label>
                        Price:
                    </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter Price" 
                           onChange={e => this.price = e.target.value} /> 
                </div>
                <div className="form-group">
                    <label>
                        Upload Image:
                    </label>
                    <input type="file"
                           onChange={e => this.image = e.target.files[0]} /> 
                </div>

                <button className="btn btn-primary btn-block">
                    Sign Up
                </button>
            </form>
        )
    }
}