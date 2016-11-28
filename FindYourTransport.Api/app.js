"use strict";

const express = require("express");
const config = require("./server/configurations");
const authenticator = require("./server/utils/authenticator");
const validator = require("./server/utils/validator");

const app = express();

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

require("./server/routers")(app, authenticator, validator);

const fuelTask = require("./server/utils/scrapper/test")();

fuelTask.start();

app.listen(config.port);
console.log(`Server listens on ${config.port}`);