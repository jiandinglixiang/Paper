const express = require('express')
const { setToken, getToken } = require('../state/token')
const router = express.Router()
var pathLib = require('path')
const db = require('../tool.js')
const Sequelize = require('sequelize')
var multer = require('multer') // v1.0.5
var md5 = require('js-md5') // v1.0.5
var upload = multer() // for parsing multipart/form-data
var fs = require('fs')
const Op = Sequelize.Op

const User = db.define('users', {
  password: Sequelize.STRING,
  portrait: Sequelize.STRING,
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.STRING,
  balance: Sequelize.STRING,
  identity: Sequelize.STRING
}, {
  timestamps: false
})

router.post('/register', upload.array(), function (req, res, next) {
  //注册
  const { identity, phone, password } = req.body
  if (identity && phone && password) {
    User.findAll({
      where: {
        [Op.or]: [{ phone }, { identity }]
      }
    }).then(function (result) {
      if (!result.length) {
        User.create({
          password,
          portrait: 'http://iph.href.lu/100x100?text=头像',
          name: phone,
          phone,
          location: '',
          balance: '0',
          identity
        }).then(function (result) {
          const tokens = setToken(md5(`${phone}${password}`), JSON.parse(JSON.stringify(result.dataValues)))
          res.json({
            code: 0,
            msg: '成功',
            data: {
              token: tokens.key
            }
          })
        }).catch(function (err) {
          console.log(err)
          res.json({
            code: 1,
            msg: '注册失败3',
            data: {}
          })
        })
      } else {
        res.json({
          code: 1,
          msg: '已存在用户1',
          data: {}
        })
      }
    }).catch(val => {
      res.json({
        code: 1,
        msg: '已存在用户2',
        data: {}
      })
    })
  } else {
    res.json({
      code: 1,
      msg: '参数错误',
      data: {}
    })
  }
})
router.post('/login', upload.array(), function (req, res, next) {
  //登陆
  const { phone, password } = req.body
  if (phone && password) {
    User.findAll({
      where: {
        phone
      }
    }).then(function (result) {
      if (result && result[0] && result[0].dataValues.password === password) {
        const tokens = setToken(md5(`${phone}${password}`), JSON.parse(JSON.stringify(result[0].dataValues)))
        res.json({
          code: 0,
          msg: '成功',
          data: {
            token: tokens.key
          }
        })
      } else {
        res.json({
          code: 1,
          msg: '密码或账号错误',
          data: {}
        })
      }
    }).catch(val => {
      res.json({
        code: 1,
        msg: '没有注册用户',
        data: {}
      })
    })
  } else {
    res.json({
      code: 1,
      msg: '参数错误',
      data: {}
    })
  }
})
router.get('/info', function (req, res, next) {
  // 获取个人信息
  const { token } = req.query
  console.log(req.query)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  const value = getToken(token)
  if (!value) {
    res.send({
      code: 911,
      msg: 'token2',
      data: {}
    })
    return
  }
  User.findAll({
    where: {
      phone: value.phone,
      password: value.password
    }
  }).then(result => {
    if (result.length) {
      res.json({
        code: 0,
        msg: '成功',
        data: {
          id: result[0].dataValues.id,
          portrait: result[0].dataValues.portrait,
          name: result[0].dataValues.name,
          phone: result[0].dataValues.phone,
          location: result[0].dataValues.location,
          balance: result[0].dataValues.balance,
          identity: result[0].dataValues.identity
        }
      })
      return
    }
    return Promise.reject('密码或账号错误')
  }).catch(value => {
    res.json({
      code: 1,
      msg: '密码或账号错误',
      data: {}
    })
  })
})
router.post('/addBalance', upload.array(), function (req, res) {
  // 充值
  const balance = req.body.balance
  const token = req.body.token
  const tokens = getToken(token)
  if (!tokens) {
    res.send({
      code: 911,
      msg: 'token失效',
      data: {}
    })
    return
  }
  if (balance <= 0 || balance > 1000000000) {
    res.send({
      code: 1,
      msg: '金额超限',
      data: {}
    })
    return
  }
  User.findAll({
    where: {
      phone: tokens.phone,
      password: tokens.password
    }
  }).then(value => {
    if (value.length && value[0].dataValues) {
      return User.update({
        balance: (value[0].dataValues.balance * 1) + (balance * 1)
      }, {
        where: {
          phone: tokens.phone,
          password: tokens.password
        }
      })
    }
    return Promise.reject('错误')
  }).then(value => {
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(value => {
    console.log(value)
    res.send({
      code: 1,
      msg: '充值错误-',
      data: {}
    })
  })
})
router.post('/pushFile', multer({ dest: 'public/images/' }).fields([
    { name: 'file', maxCount: 5 },
    { name: 'file0', maxCount: 5 },
    { name: 'file1', maxCount: 5 },
    { name: 'file2', maxCount: 5 },
    { name: 'file3', maxCount: 5 },
    { name: 'file4', maxCount: 5 },
    { name: 'file5', maxCount: 5 },
    { name: 'file6', maxCount: 5 },
    { name: 'file7', maxCount: 5 },
    { name: 'file8', maxCount: 5 },
    { name: 'file9', maxCount: 5 }
  ]),
  function (req, res) {
    // console.log(req.files, req.body)
    let file = req.files
    if (!file) {
      res.send({
        code: 1,
        msg: '无文件',
        data: {}
      })
      return
    }
    const lest = []
    for (let i in file) {
      (function (index) {
        lest.push(new Promise((resolve) => {
          var newname = file[index][0].path + pathLib.parse(file[index][0].originalname).ext
          //为上传的文件添加后缀
          fs.rename(file[index][0].path, newname, function (err) {
            if (!err) {
              console.log(file[index][0])
              resolve('http://127.0.0.1/images/' + file[index][0].filename + pathLib.parse(file[index][0].originalname).ext)
            } else {
              resolve('http://iph.href.lu/100x100?text=错误')
            }
          })
        }))
      })(i)
    }
    Promise.all(lest).then(function (value) {
      res.send({
        code: 0,
        msg: '成功',
        data: value
      })
    }).catch(function () {
      res.send({
        code: 1,
        msg: '错误',
        data: {}
      })
    })
  })
router.post('/modifiedAmend', upload.array(), function (req, res) {
  // 修改信息
  const tokens = getToken(req.body.token)
  if (!tokens) {
    res.send({
      code: 911,
      msg: 'token失效',
      data: {}
    })
    return
  }
  let data = {}
  if (req.body.name) {
    data.name = req.body.name
  }
  if (req.body.password) {
    data.password = req.body.password
  }
  if (req.body.portrait) {
    data.portrait = req.body.portrait
  }
  if (req.body.location) {
    data.location = req.body.location
  }
  if (req.body.identity) {
    data.identity = req.body.identity
  }
  const obj = Object.keys(data)
  if (!obj.length) {
    res.send({
      code: 1,
      msg: '无内容',
      data: {}
    })
    return
  }
  User.update(data, {
    where: {
      phone: tokens.phone,
      password: tokens.password
    }
  }).then(function () {
    res.send({
      code: 0,
      msg: 'ok',
      data
    })
  }).catch(function () {
    res.send({
      code: 1,
      msg: '更新错误',
      data: {}
    })
  })
})


module.exports = router
