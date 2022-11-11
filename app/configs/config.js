const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGODB,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    refreshToken: process.env.REFRESH_TOKEN,
    expiredToken: process.env.EXPIRED_TOKEN,
    mail: process.env.MAIL,
    password: process.env.PASSWORD,
}
