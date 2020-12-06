const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny', { stream: require("./startup/logging").stream }));
require("./startup/db")();

app.get("/", (req, res) => res.send("Welcome"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is listening at PORT : " + port);
})