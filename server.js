require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

require(`${__dirname}/server/routes`)(app);

app.get("/", (req, res) => {
  res.json({ message: "Server working fine :D" });
});

app.listen(process.env.PORT || 2000);
