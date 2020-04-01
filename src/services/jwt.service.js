const jwt = require('jsonwebtoken');
const config = require('./../../../config/env.config');

exports.generateToken = (data, exp = config.jwt.expiresIn) => {
    let user = Object.assign({}, data);
    delete user.password;
    delete user.sector;
    delete user.role;
    delete user.telephone;
    delete user.extension;
    delete user.recoveryToken;
    delete user.tel_mobile;
    delete user.createdAt;
    delete user.updatedAt;
    return jwt.sign(user, config.jwt.secret, {expiresIn: exp});
};

exports.refreshToken = (data) => {
    let user = Object.assign({}, data);
    return jwt.sign({id: user.id}, config.jwt.secret_refresh, {expiresIn: config.jwt.expiresIn * 2});
};

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret, {expiresIn: config.jwt.expiresIn}, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                delete decoded.iat;
                delete decoded.exp;
                resolve(decoded);
            }
        });
    });
};

exports.verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret_refresh, {expiresIn: (config.jwt.expiresIn * 2)}, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                delete decoded.iat;
                delete decoded.exp;
                resolve(decoded);
            }
        });
    });
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
};
