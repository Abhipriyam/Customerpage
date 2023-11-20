import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import CustLeft from "./custleft";
import http from "./httpServices.js";

class Customer extends Component {
  state = {
    customers: [],
    cities: ["Noida", "Delhi", "Gurgaon", "Jaipur"],
    payments: ["Credit Card", "Debit Card", "Wallet"],
    genders: ["Male", "Female"],
    sortColumn: "id", // Default sorting column
    sortOrder: "asc", // Default sorting order
  };

  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/customers?${searchStr}`);
    let { data } = response;
    this.setState({ customers: data });
  }

  async componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchData();
    }
  }

  editStudent = () => {
    let queryParams = queryString.parse(this.props.location.search);
    let { id } = queryParams;
    this.callURL("/customers/:id/edit", queryParams);
  };

  deleteStudent = (index) => {
    let updatedCustomers = [...this.state.customers];
    updatedCustomers.splice(index, 1);
    this.setState({ customers: updatedCustomers });
  };

  callURL = (url, options) => {
    let searchStr = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchStr,
    });
  };

  makeSearchString = (options) => {
    let { gender, city, payment } = options;
    let searchStr = "";
    searchStr = this.addQueryString(searchStr, "payment", payment);
    searchStr = this.addQueryString(searchStr, "gender", gender);
    searchStr = this.addQueryString(searchStr, "city", city);
    return searchStr;
  };

  addQueryString = (str, paramname, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramname}=${paramValue}`
        : `${paramname}=${paramValue}`
      : str;

  handleSort = (column) => {
    const { sortColumn, sortOrder } = this.state;
    const newSortOrder =
      column === sortColumn ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

    this.setState({
      sortColumn: column,
      sortOrder: newSortOrder,
    });
  };

  handleOptionChange = (queryParams) => {
    this.callURL("/customers", queryParams);
  };

  render() {
    const { customers, cities, genders, payments, sortColumn, sortOrder } =
      this.state;

    const sortedCustomers = [...customers].sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortColumn === "id" || sortColumn === "age") {
        return (a[sortColumn] - b[sortColumn]) * order;
      } else {
        return a[sortColumn].localeCompare(b[sortColumn]) * order;
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-2 bg-light">
            <CustLeft
              queryParams={queryString.parse(this.props.location.search)}
              cities={cities}
              genders={genders}
              payments={payments}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-10 text-center">
            <h4>Welcome to the Customers page</h4>
            <div className="row bg-dark text-white">
              <div
                className="col-2 border"
                onClick={() => this.handleSort("id")}
              >
                ID
              </div>
              <div
                className="col-2 border"
                onClick={() => this.handleSort("name")}
              >
                Name
              </div>
              <div
                className="col-2 border"
                onClick={() => this.handleSort("age")}
              >
                Age
              </div>
              <div
                className="col-2 border"
                onClick={() => this.handleSort("city")}
              >
                City
              </div>
              <div
                className="col-2 border"
                onClick={() => this.handleSort("gender")}
              >
                Gender
              </div>
              <div
                className="col-2 border"
                onClick={() => this.handleSort("payment")}
              >
                Payment
              </div>
            </div>
            <div className="row">
              {sortedCustomers.map((pr, index) => (
                <React.Fragment key={pr.id}>
                  <div className="col-2 border">
                    <Link to={`/customers/${pr.id}`}>{pr.id}</Link>
                  </div>
                  <div className="col-2 border">{pr.name}</div>
                  <div className="col-2 border">{pr.age}</div>
                  <div className="col-2 border">{pr.city}</div>
                  <div className="col-2 border">{pr.gender}</div>
                  <div className="col-2 border">{pr.payment}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customer;
