const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();
const authMiddleware = require('./auth.middleware');

const route = ({db}) => {
    const authController = require('./auth.controller')({db});

    router.post('/login', [
        authMiddleware.verifyLogin , async (req, res) => {
            try {
                const tokens = await authController.login(req);
                res.status(HttpStatus.CREATED).send(tokens);
            } catch (err) {
                let code = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
                res.status(code).send({message: err.message});
            }
        }]);
    router.post('/refresh', [
        authMiddleware.verifyRefreshToken, authMiddleware.verifyUserFromTokens, async (req, res) => {
            try {
                const tokens = await authController.refreshToken(req);
                res.status(HttpStatus.CREATED).send(tokens);
            } catch (err) {
                let code = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
                res.status(code).send({message: err.message});
            }
        }]);
    router.post('/recoveryPassword', [
        authMiddleware.verifyRecoveryPass, async (req, res) => {
            try {
                await authController.recoveryPassword(req);
                res.status(HttpStatus.NO_CONTENT).send();
            } catch (err) {
                let code = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
                res.status(code).send({message: err.message});
            }
        }]);
    router.post('/changePassword', [
        authMiddleware.verifyChangePass, async (req, res) => {
        try {
            await authController.changePassword(req);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            let code = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(code).send({message: err.message});
        }
    }]);
    return router;
};

module.exports = route;
