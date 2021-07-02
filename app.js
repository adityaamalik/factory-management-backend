const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "factoryDB",
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const productsRouter = require("./routers/products");
const shopsRouter = require("./routers/shops");
const transactionsRouter = require("./routers/transactions");
const employeeRouter = require("./routers/employees");
const loginRouter = require("./routers/login");

//routes
app.use("/products", productsRouter);
app.use("/shops", shopsRouter);
app.use("/employees", employeeRouter);
app.use("/transactions", transactionsRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("API working fine !");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
