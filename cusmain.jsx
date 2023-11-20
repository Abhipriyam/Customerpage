import React, {Component} from "react";
import { Route,Switch, Redirect } from "react-router-dom";
import Customers from "./customers";
import Customer from "./customer";
import AddCustomer from "./addcustomer";
import DeleteCustomer from "./deletecustomer";
import NavBar from "./navbar";
class MainComponent extends Component{ 
    render() {
        return (
            <div className="container">
                <NavBar />
                <Switch>
                <Route path="/customers/add" component={AddCustomer}   />
                <Route path="/customers/:id/delete" component={DeleteCustomer}/>
            <Route path="/customers/:id/edit" component={AddCustomer}/>
           
            <Route path="/customers/:id" component={Customers}/>
                <Route path="/customers" component={Customer}   />
                <Redirect from="/" to="/"   />    
                </Switch>
            </div>
        );
    }
}
export default MainComponent;