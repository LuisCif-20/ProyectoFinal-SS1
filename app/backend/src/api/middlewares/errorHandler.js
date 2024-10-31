const { classifyError } = require("../utils/customErrors");
const { resError } = require("../utils/resHandler")

const errorHandler = (error, req, res, next) => {
    resError(res, classifyError(error));
}

module.exports = errorHandler;