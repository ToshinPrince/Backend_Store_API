require("dotenv").config;
//async error

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Middleware
app.use(express.json());

//rootes

app.get("/", (req, res) => {
  res.send(`<h1>API Store</h1><a href="api/v1/products">Products Route</a>`);
});

//products Route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    //Connect DB

    app.listen(port, () => console.log(`Server is listning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
