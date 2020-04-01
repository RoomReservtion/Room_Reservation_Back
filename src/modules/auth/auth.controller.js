const sha256 = require('js-sha256');
const sgMail = require('@sendgrid/mail');
const uuid = require('uuid');
const jwtService = require('../common/jwt.service');
const config = require('../../config/env.config');
const common = require('../../config/common');
const HttpStatus = require('http-status-codes');

module.exports = ({db}) => {
    const userController = require('../users/users.controller')({db});
    const profileController = require('../profiles/profiles.controller')({db});

    const authController = {
        login(req) {
            return new Promise(async (resolve, reject) => {
                let data = await userController.getUserByEmail(req.body.email);
                if (data) {
                const profile = await profileController.get(data.profileId);
                data.permissionLevel = profile.name;
                    let pass = sha256(req.body.password + config.salt);
                    if (data.password === pass) {
                        resolve({
                            token: jwtService.generateToken(data),
                            refreshToken: jwtService.refreshToken(data)
                        });
                    }
                }
                reject({code: HttpStatus.UNAUTHORIZED, message: 'Invalid email or password'});
            });
        },
        refreshToken(req) {
            delete req.user.iat;
            delete req.user.exp;
            return Promise.resolve({
                token: jwtService.generateToken(req.user),
                refreshToken: jwtService.refreshToken(req.user)
            });
        },
        async recoveryPassword(req) {
            let token = jwtService.generateToken({id: uuid()}, 1800);
            const user = await userController.getUserByEmail(req.body.email);
            await userController.updateToRecoveryPass(token, req.body.email, db);
            sgMail.setApiKey(config.sendgrip_key);
            const msg = {
                to: req.body.email,
                from: 'contato@plicksolucoes.com.br',
                subject: 'PLICK: Recuperação de senha',
                dynamic_template_data: {
                    name: user.name,
                    email: req.body.email
                },
                text: 'Redefinir senha',
                template_id: 'd-b621138880aa416ca5676ca33641aa9a'
            };
            return sgMail.send(msg);
        },
        changePassword(req) {
            return jwtService.verifyToken(req.body.token).then(() => {
                let pass = sha256(req.body.password + config.salt);
                return userController.updateToChangePass(req.body.token, pass, db);
            }, (err) => {
                return Promise.reject({code: HttpStatus.FORBIDDEN, message: err.message});
            });
        }
    };

    return authController;
};
