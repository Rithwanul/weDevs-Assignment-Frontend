import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "../src/Components/Home";
import Nav from "../src/Components/Nav";
import Login from "../src/Components/Login";
import Register from "../src/Components/Register";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import NetworkAddress from "../src/Networks/NetworkAddress";
import Products from "../src/Components/Products";
import AddProductData from "../src/Components/AddProductData";
import AddProducts from "../src/Components/AddProduct";

export default class App extends Component{

  state = {};

  componentDidMount = () => {
    

    axios.get(NetworkAddress.User).then(
        res     =>      {
            this.setUser(res.data)
        },
        err     =>      {
            //console.log(err);
        }
    )
  };

  setUser = user => {
    this.setState({
      user    :   user
  });

  }

  render(){
    return ( 

      <BrowserRouter>
        <div className="App">
          <Nav user = {this.state.user} setUser = { this.setUser }/>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route path="/" exact component={ () => <Home user = {this.state.user} />} />
                  <Route path="/login" exact component={ () => <Login setUser = {this.setUser} />} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/products" exact component={Products} />
                  <Route path="/products/add" exact component={AddProducts} />
                  <Route path="/added" exact component={AddProductData} />
                </Switch>
              </div>
            </div>
        </div>
      
      </BrowserRouter>
  
      
    );
  }
}  


