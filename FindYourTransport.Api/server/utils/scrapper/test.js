// just a test for node-cron remove later

module.exports = () => {
    const cron = require("node-cron");

    return cron.schedule("0 * * * * *", () => {
        console.log("code running every minute");
    }, false);
};