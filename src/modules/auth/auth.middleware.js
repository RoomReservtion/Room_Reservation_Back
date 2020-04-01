const validateJsonSchema = require('jsonschema').validate;
const HttpStatus = require('http-status-codes');
const jwtService = require('../../services/jwt.service');

const loginSchema = {
    "type": "object",
    "properties": {
        "password": {"type": "string"},
        "email": {"type": "string"}
    },
    "required": [
        "password",
        "email"
    ],
    "additionalProperties": false
};
const refreshSchema = {
    "type": "object",
    "properties": {
        "refreshToken": {"type": "string"}
    },
    "required": [
        "refreshToken"
    ],
    "refreshToken": false
};
const recoveryPassSchema = {
    "type": "object",
    "properties": {
        "email": {"type": "string"}
    },
    "required": [
        "email"
    ],
    "additionalProperties": false
};
const changePassSchema = {
    "type": "object",
    "properties": {
        "token": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": [
        "token",
        "password"
    ],
    "additionalProperties": false
};

exports.verifyLogin = (req, res, next) => {
    req.body = req.body || {};
    let result = validateJsonSchema(req.body, loginSchema);
    if (result.valid) {
        next();
    } else {
        let message = [];
        for (let err of result.errors) {
            message.push(err.message);
        }
        res.send(HttpStatus.BAD_REQUEST, {error: message.join(', ')});
    }
};

exports.verifyRefreshToken = (req,res, next) => {
    req.body = req.body || {};
    let result = validateJsonSchema(req.body, refreshSchema);
    if (result.valid) {
        return jwtService.verifyRefreshToken(req.body.refreshToken).then((data) => {
            req.userRefresh = data;
            next();
        }).catch((err) => {
            res.send(HttpStatus.FORBIDDEN, {error: err.message});
        });
    } else {
        let message = [];
        for (let err of result.errors) {
            message.push(err.message);
        }
        res.send(HttpStatus.BAD_REQUEST, {error: message.join(', ')});
    }
};

exports.verifyRecoveryPass = (req, res, next) => {
    req.body = req.body || {};
    let result = validateJsonSchema(req.body, recoveryPassSchema);
    if (result.valid) {
        next();
    } else {
        let message = [];
        for (let err of result.errors) {
            message.push(err.message);
        }
        res.send(HttpStatus.BAD_REQUEST, {error: message.join(', ')});
    }
};

exports.verifyUserFromTokens = (req, res, next) => {
    let authorization = req.headers['authorization'];
    if (authorization) {
        let token = authorization.split('Bearer ');
        if (token[1]) {
            const decoded = jwtService.decodeToken(token[1]);
            if (decoded.id === req.userRefresh.id) {
                req.user = decoded;
                next();
            } else {
                res.send(HttpStatus.FORBIDDEN, {error: 'invalid token'});
            }
        } else {
            res.send(HttpStatus.UNAUTHORIZED, {error: 'invalid authorization header'});
        }
    } else {
        res.send(HttpStatus.UNAUTHORIZED, {error: 'missing authorization header'});
    }
};

exports.verifyChangePass = (req, res, next) => {
    req.body = req.body || {};
    let result = validateJsonSchema(req.body, changePassSchema);
    if (result.valid) {
        next();
    } else {
        let message = [];
        for (let err of result.errors) {
            message.push(err.message);
        }
        res.send(HttpStatus.BAD_REQUEST, {error: message.join(', ')});
    }
};
