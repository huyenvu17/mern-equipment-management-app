const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appRoute = require("./routes/equipments");
const authRoute = require("./routes/auth");
const employeesRoute = require("./routes/employee");
const cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log("Database Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/equipments", appRoute);

app.listen(8088, () => {
  console.log("Backend server is running!");
});
