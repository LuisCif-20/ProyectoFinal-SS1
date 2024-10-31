const { capitalizeFirstWord } = require("./stringUtils");

const { ValidationError } = require("sequelize");

class CustomError extends Error {

    constructor(message = 'Internal server error.', statusCode = 500, details = undefined) {
        super(capitalizeFirstWord(message));
        this.statusCode = statusCode;
        this.details = details;
    }

};

const badRequest = (message, details = undefined) => new CustomError(message, 400, details);

const unAuthorization = (message) => new CustomError(message, 401);

const forbidden = () => {
    const message = 'You are not allowed to do this';
    return new CustomError(message, 403);
}

const notFound = (entity) => {
    const message = `${entity} not found`;
    return new CustomError(message, 404);
};

const tokenExpired = () => {
    const message = 'ATE';
    return new CustomError(message, 401);
}

const classifyError = (error) => {
    if (error instanceof ValidationError) {
        return badRequest(error.cause, error.errors);
    }
    return error;
};

module.exports = {
    unAuthorization,
    classifyError,
    tokenExpired,
    badRequest,
    forbidden,
    notFound
};