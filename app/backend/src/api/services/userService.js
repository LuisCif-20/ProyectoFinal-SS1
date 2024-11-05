const { Role, User } = require('../models');
const { encrypt } = require('../utils/crypto');
const { notFound } = require('../utils/customErrors');

const findRoleByName = async (name) => {
    const role = await Role.findOne({
        where: { name }
    });
    if (!role) throw notFound('role');
    return role;
};

const createUser = async (user_data, role_name) => {
    const role = await findRoleByName(role_name);
    user_data['role_id'] = role.id;
    user_data.pin = encrypt(user_data.pin);
    await User.create(user_data);
};

const findUserById = async (id) => {
    const user = await User.findByPk(id, {
        include: {
            model: Role,
            as: 'role'
        }
    });
    if (!user) throw notFound('user');
    return user;
};

const findUsersByRole = async (name) => {
    const role = await findRoleByName(name);
    const users = await User.findAll({
        where: { role_id: role.id }
    });
    return users;
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) throw notFound('user');
    return user;
};

const createClient = async (user_data) => await createUser(user_data, 'CLIENT');

const createAdmin = async (user_data) =>  await createUser(user_data, 'ADMIN');

const updateUser = async (id, user_data) => {
    const [affectedRows, users] = await User.update(user_data, {
        where: { id },
        returning: true
    });
    if (affectedRows === 0) throw notFound('user');
    return users[0];
}

const dropUser = async (id) => {
    const affectedRows = await User.destroy({
        where: { id }
    });
    if (affectedRows === 0) throw notFound('user');
}

module.exports = {
    findUsersByRole,
    findUserByEmail,
    findUserById,
    createClient,
    createAdmin,
    updateUser,
    dropUser
};