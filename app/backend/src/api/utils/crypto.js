const crypto = require('crypto');
const CONFIG = require('../../config/config');

const ALGORITHM = 'aes-256-cbc';
const { IV, KEY } = CONFIG.crypto;
const IVB = Buffer.from(IV, 'hex'); 
const KEYB = Buffer.from(KEY, 'hex');

const encrypt = (value) => {
    const cipher = crypto.createCipheriv(ALGORITHM, KEYB, IVB);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
};

const decrypt = (value) => {
    const encryptedText = Buffer.from(value, 'base64');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEYB, IVB);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString(); 
}

const verify = (value, encryptedValue) => value === decrypt(encryptedValue);

module.exports = {
    decrypt,
    encrypt,
    verify
};