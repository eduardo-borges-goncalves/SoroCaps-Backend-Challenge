const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("SoroCap", "root", "12345678",
  {
    host: "localhost",
    dialect: "mysql",
  })

sequelize.sync();

// sequelize.authenticate()
//   .then(() => console.log("Connect to database"))
//   .catch(() => console.log("Error to connect with database"))

module.exports = sequelize;



