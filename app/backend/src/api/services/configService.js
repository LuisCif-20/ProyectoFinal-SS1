// const { Config } = require('../models');
// const { notFound } = require('../utils/errorHandler');

// class ConfigService {

//     constructor() {
//         this.config = Config;
//     }

//     async findConfig() {
//         const config = (await this.config.findAll())[0];
//         if (!config) throw notFound('config');
//         return config;
//     }

//     async updateConfig(id, data) {
//         const [affectedRows, config] = await this.config.update(data, {
//             where: {
//                 id
//             },
//             returning: true
//         });
//         if (affectedRows === 0) throw notFound('config');
//         return config[0];
//     }

// };