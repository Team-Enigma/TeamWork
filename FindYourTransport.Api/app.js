"use strict";

const express = require("express");
const config = require("./server/configurations");

const app = express();

require("./server/configurations/database")(config);

app.listen(config.port);
console.log(`Server listens on ${config.port}`);