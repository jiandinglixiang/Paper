var express = require('express');
var path = require('path')
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(__dirname)
  console.log(__filename)
  console.log(process.cwd())
  console.log(path.join('app', 'ss'))
  res.sendFile('index.html', { root: process.cwd() + '/App/build/' }, function (err) {
    if (err) {
      console.log(err, '失败')
    } else {
      console.log('成功')
    }
  })
});

module.exports = router;
