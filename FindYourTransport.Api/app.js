"use strict";

const express = require("express");
const config = require("./server/configurations");

const app = express();

require("./server/configurations/database")(config);
<<<<<<< HEAD
app.set("views", config.view);
=======
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

>>>>>>> 79ff33104631a544e32c261fc5d703d74323cf67
app.listen(config.port);
console.log(`Server listens on ${config.port}`);