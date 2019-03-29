const Sequelize = require('sequelize')

const config = {
  database: 'test',
  username: 'root',
  password: '321321',
  host: 'localhost',
  port: 3306
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  timestamps: false
  //最好关掉timestamps , 框架自动帮你添加时间到UpdatedAt上边
})
module.exports = sequelize
