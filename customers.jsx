import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpServices.js";
class Customers extends Component {
  state = { customers: {} };
  ////we will make a request to the server
  //server will compute response
  //send back to the response

  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/customers/${id}`);
    console.log(response);
    let { data } = response;
    // let s1 = {...this.state};
    // s1.products = data
    // this.setState(s1)
    this.setState({ customers: data });
  }
  render() {
    let { customers } = this.state;
    let { id } = this.props.match.params;
    return (
      <div className="container">
        <h6>Details of Persons</h6>
        Customer Id : {customers.id}
        <br />
        Customer Name : {customers.name}
        <br />
        Customer City : {customers.city}
        <br />
        Customer Gender : {customers.gender}
        <br />
        Person Age : {customers.age}
        <br />
        <Link to={`/customers/${id}/delete`}>Delete</Link> <br />
        <Link to={`/customers/${id}/edit`}>Edit</Link>
      </div>
    );
  }
}
export default Customers;
