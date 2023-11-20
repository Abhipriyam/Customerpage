let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type,Accept"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let { customersData } = require("./customersData.js");

app.get("/customers", function (req, res) {
  console.log("/customers", req.query);
  let cityStr = req.query.city;
  let gender = req.query.gender;
  let payment = req.query.payment;
  let sort = req.query.sort;
  let arr1 = customersData;
  if (cityStr) {
    let cityArr = cityStr.split(",");
    arr1 = arr1.filter((st) => cityArr.find((c1) => c1 === st.city));
  }
  if (gender) {
    arr1 = arr1.filter((st) => st.gender === gender);
    console.log("gen2", arr1);
  }
  if (payment) {
    arr1 = arr1.filter((st1) => st1.payment === payment);
    console.log("pay2", arr1);
  }
  if (sort === "city")
    arr1.sort((st1, st2) => st1.city.localeCompare(st2.city));
  if (sort === "gender")
    arr1.sort((st1, st2) => st1.gender.localeCompare(st2.gender));
  if (sort === "payment")
    arr1.sort((st1, st2) => st1.payment.localeCompare(st2.payment));

  res.send(arr1);
});

app.get("/customers/:id", function (req, res) {
  let id = req.params.id;
  let customer = customersData.find((st) => st.id === id);
  if (customer) res.send(customer);
  else res.status(404).send("No Customer found");
});

app.get("/customers/city/:name", function (req, res) {
  let name = req.params.name;
  const arr1 = customersData.filter((st) => st.city === name);
  res.send(arr1);
});

app.post("/customers", function (req, res) {
  let body = req.body;
  console.log(body);

  let maxid = customersData.reduce(
    (acc, curr) => (curr.id >= acc ? curr.id : acc),
    0
  );
  let newid = maxid + 1;
  let newCustomer = { id: newid, ...body };
  customersData.push(newCustomer);
  res.send(newCustomer);
});

app.put("/customers/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = customersData.findIndex((st) => st.id === id);
  let updatedCustomer = { id: id, ...body };
  customersData[index] = updatedCustomer;
  res.send(updatedCustomer);
});

app.delete("/customers/:id", function (req, res) {
  let id = req.params.id;
  let index = customersData.findIndex((st) => st.id === id);
  if (index >= 0) {
    let deleteCustomer = customersData.splice(index, 1);
    res.send(deleteCustomer);
  } else res.status(404).send("NO Customer Found");
});
