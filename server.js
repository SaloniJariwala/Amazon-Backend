const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/db");
const port = process.env.PORT;

connectDB;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/countries", require("./Routes/CountryRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));