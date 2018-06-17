const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AuthCourse");
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

const port = process.env.PORT || 3000;
const server = http.createServer(app);

routes(app);
server.listen(port, function() {
  console.log("Server listening on port: " + port);
});
