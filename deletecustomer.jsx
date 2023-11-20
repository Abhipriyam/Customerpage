import React, { Component } from "react";
import http from "./httpServices.js";
class DeleteCustomer extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    let response = await http.deleteApi(`/customers/${id}`);
    console.log("del", response);
    this.props.history.push("/customers");
  }
  render() {
    return "";
  }
}
export default DeleteCustomer;
