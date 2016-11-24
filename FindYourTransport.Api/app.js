"use strict";

const express = require("express");
const config = require("./server/configurations");

const app = express();

require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

require("./server/routers")(app);
app.use(config.favicon);
app.listen(config.port);
console.log(`Server listens on ${config.port}`);