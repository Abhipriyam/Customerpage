import React, { Component } from "react";
import http from "./httpServices.js";
class AddCustomer extends Component {
  state = {
    customers: { id: "", name: "", age: "", city: "", gender: "", payment: "" },
    cities: ["Noida", "Delhi", "Gurgaon", "Jaipur"],
    payments: ["Credit Card", "Debit Card", "Wallet"],
    genders: ["Male", "Female"],
    edit: false,
  };
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps, prevStates) {
    if (this.props !== prevProps) this.fetchData();
  }
  async fetchData() {
    let { id } = this.props.match.params;
    if (id) {
      let response = await http.get(`/customers/${id}`);
      let { data } = response;
      this.setState({ customers: data, edit: true });
    } else {
      let customers = { name: "", age: "", city: "", gender: "" };
      this.setState({ customers: customers, edit: false });
    }
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.customers[input.name] = input.value;
    this.setState(s1);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { customers, edit } = this.state;
    console.log(customers);
    edit
      ? this.putData(`/customers/${customers.id}`, customers)
      : this.postData("/customers", customers);
  };

  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/customers");
  }

  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/customers");
  }

  makeRadio = (arr, name, value, label) => {
    return (
      <div className="row">
        {arr.map((ar) => (
          <React.Fragment>
            <div className="col-12">
              <input
                type="radio"
                value={ar}
                checked={value === ar}
                name={name}
                className="check-input"
                onChange={this.handleChange}
              />
              <label className="form-check-label">{ar}</label>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  render() {
    let { id, name, age, city, gender, payment } = this.state.customers;
    const { cities, payments, genders } = this.state;
    return (
      <div className="container">
        <div className="form-group mb-2">
          <label>Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={id}
            placeholder="Enter Customer Id"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter Customer Name"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={age}
            placeholder="Enter Customer Age"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label>Gender</label>
          {this.makeRadio(genders, "gender", gender, "")}
        </div>
        <div className="form-groupmb-2">
          <label>City</label>
          <select
            id="city"
            name="city"
            value={city}
            className="form-control"
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select City
            </option>
            {cities.map((cat) => (
              <option>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label>Payment</label>
          {this.makeRadio(payments, "payment", payment, "Select Payment")}
        </div>
        <button className="btn btn-primary m-2" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddCustomer;
