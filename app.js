require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send(`<h1>API Store</h1><a href="api/v1/products">Products Route</a>`);
});

app.use("/api/v1/products", productsRouter);

//products Route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //Connect DB
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`Server is listning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
