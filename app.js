require("dotenv").config();
require("./src/server/database").connect();
const express = require('express');

const Routes = require('./src/server/routes/route');
const app = express();
const port = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

app.use('/api', Routes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Api not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})