require("dotenv").config();

module.exports = {
  database: process.env.MONGO_URL_WITH_DB_NAME,
  secret: process.env.SECRET || "68d82579fb59ba7617080baa8199df188971da6e",
  JWT_SECRET: process.env.JWT_SECRET,
  SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },

}