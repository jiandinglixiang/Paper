var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var history = require('connect-history-api-fallback')

var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')
var apiRouter2 = require('./routes/order')
var apiRouter3 = require('./routes/leaveWord')
var bodyParser = require('body-parser')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  //这段仅仅为了方便返回json而已
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use('/api/', apiRouter, apiRouter2, apiRouter3)
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))
app.use('/', indexRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
