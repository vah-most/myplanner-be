const config = require("config");

module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", config.get("api.server"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};
