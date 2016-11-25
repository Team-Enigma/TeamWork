"use strict";

const express = require("express");
const config = require("./server/configurations");
const authenticator = require("./server/utils/authenticator.js");

const moment = require("moment");

const app = express();

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

require("./server/routers")(app, authenticator);
app.use(config.favicon);
app.locals.moment = moment;
app.listen(config.port);
console.log(`Server listens on ${config.port}`);