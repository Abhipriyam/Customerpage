import React, { Component } from "react";

class CustLeft extends Component {
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let queryParams = { ...this.props.queryParams };
    queryParams[input.name] = input.value;
    console.log(queryParams);
    this.props.onOptionChange(queryParams);
  };

  makeRadio = (arr, label, name, value) => {
    return (
      <div className="row">
        <label>
          <strong>{label}</strong>
        </label>
        {arr.map((ar, index) => (
          <div key={index} className="form-check">
            <input
              type="radio"
              name={name}
              id={name}
              value={ar}
              className="form-check-input"
              checked={value === ar}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ar}</label>
          </div>
        ))}
      </div>
    );
  };

  render() {
    let { cities, genders, payments, queryParams } = this.props;
    let { city = "", gender = "", payment = "" } = queryParams;

    return (
      <div className="m-3">
        {this.makeRadio(cities, "Select City", "city", city)}
        {this.makeRadio(genders, "Select Gender", "gender", gender)}
        {this.makeRadio(payments, "Select Payment", "payment", payment)}
      </div>
    );
  }
}

export default CustLeft;
