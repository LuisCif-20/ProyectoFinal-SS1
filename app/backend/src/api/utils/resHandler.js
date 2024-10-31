const resOk = (res, data = undefined) => {
    res.status(200).json({
        success: true,
        ...data
    });
};

const resCreated = (res, data = undefined) => {
    res.status(201).json({
        success: true,
        ...data
    });
};

const resError = (res, { message, statusCode, details }) => {
    res.status(statusCode || 500).json({
        success: false,
        message,
        details
    });
};

module.exports = {
    resOk,
    resCreated,
    resError
};