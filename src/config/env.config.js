module.exports = {
    "jwt": {
        "expiresIn": 14400,
        "secret": process.env.SECRET || '',
        "secret_refresh": process.env.SECRET_REFRESH || ''
    },
    "salt" : process.env.SALT || '',
    "sendgrip_key": process.env.SENDGRIP_KEY || ''
};
