const { Sequelize } = require('sequelize');

export const database = new Sequelize(
  "SoroCap", 
  "root", 
  "12345678",
  {
    host: "localhost",
    dialect: "mysql",
  })



// database.authenticate()
//   .then(() => console.log("Connect to database"))
//   .catch(() => console.log("Error to connect with database"))

