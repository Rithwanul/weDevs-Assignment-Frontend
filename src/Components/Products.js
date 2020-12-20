import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Products extends Component{

    state   =   { data : null};

    componentDidMount = () => {

        axios.get('/api/auth/products').then(
            res  =>  {
                this.setState({
                    data : res.data
                });
            }
        )

        
    }

    
    

    deleteProduct (id) { // <-- declare id parameter

        if(window.confirm("Are you sure?")){
            axios.delete(`/api/auth/products/delete/${id}`) 
                .then(res => {
                    console.log(res)

                    if (res.data) {
                        return <Redirect to = {'/'} />
                    }
                    
                });
        }
        
    }

    render(){

        let content;

        
        const data = this.state.data;

        

        if(this.state.data == null){
            return(
                <h3>No Data</h3>
            )
        }

        return(

           
            
            <div className="mt-5">
                {
                    this.state.data.map(product => {
                        return(
                            <div className="card mt-2">
                                <div className="card-body">{product.title}</div>
                                <div className="card-body">{product.description}</div>
                                <div className="card-body">
                                    <img className="card-img-top" src={"http://127.0.0.1:8000/public/products/"+ product.image}/>
                                    <button className="btn btn-danger mt-2" 
                                    onClick={ () => this.deleteProduct(product.id) } 
                                    data-remove={product.id}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}