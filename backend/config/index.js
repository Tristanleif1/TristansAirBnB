console.log("Environmental Variables:");
console.log('JWT_SECRET:', process.env.JWT_SECRET)
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);


module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE || "db/dev.db",
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};


