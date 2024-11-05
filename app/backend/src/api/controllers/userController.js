const { findUserById, findUsersByRole, createClient, createAdmin, updateUser, dropUser, findUserByEmail } = require("../services/userService");
const { resOk, resCreated } = require("../utils/resHandler");

const getUserById = async ({ params }, res, next) => {
    try {
        const user = await findUserById(params.id);
        resOk(res, { user });
    } catch (error) {
        next(error);
    }
};

const getUsersByRole = async ({ params }, res, next) => {
    try {
        const users = await findUsersByRole(params.role);
        resOk(res, { users });
    } catch (error) {
        next(error);
    }
};

const getUserByEmail = async ({ params }, res, next) => {
    try {
        const user = await findUserByEmail(params.email);
        resOk(res, { user });
    } catch (error) {
        next(error);
    }
}

const postClient = async ({ body }, res, next) => {
    try {
        await createClient(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const postAdmin = async ({ body }, res, next) => {
    try {
        await createAdmin(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const patchUser = async ({ params, body }, res, next) => {
    try {
        const user = await updateUser(params.id, body);
        resOk(res, { user });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async ({ params }, res, next) => {
    try {
        await dropUser(params.id);
        resOk(res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsersByRole,
    getUserByEmail,
    getUserById,
    postClient,
    deleteUser,
    postAdmin,
    patchUser
};