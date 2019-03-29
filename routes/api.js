var express = require('express')
var router = express.Router()
const db = require('../tool.js');

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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
