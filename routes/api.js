var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  port: 3310
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)

  connection.end()
})
router.post('/register', function (req, res, next) {
  //注册
  res.send('respond with a')
})
router.get('/login', function (req, res, next) {
  //登陆
  res.send('respond with a')
})
router.get('/123123', function (req, res, next) {
  res.send('[{}]')
})
module.exports = router
