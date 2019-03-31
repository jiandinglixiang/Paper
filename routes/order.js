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
const User = db.define('commodity_list', {
  status: Sequelize.STRING,//0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
  imgList: Sequelize.STRING,// 图片列表
  brandNew: Sequelize.STRING,// 全新
  price: Sequelize.STRING, // 金额
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  LookNumber: Sequelize.STRING,
  info_id: Sequelize.STRING,
  info_portrait: Sequelize.STRING,
  info_name: Sequelize.STRING,
  logistics_id: Sequelize.STRING,
  logistics_odd: Sequelize.STRING,
  logistics_oddName: Sequelize.STRING,
  logistics_name: Sequelize.STRING,
  logistics_phone: Sequelize.STRING,
  logistics_location: Sequelize.STRING,
  logistics_portrait: Sequelize.STRING
}, {
  timestamps: false
})
const Users = db.define('users', {
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
router.get('/swipeList', function (req, res) {
  // 获取个人信息
  const query = req.query
  query.token && getToken(query.token)
  User.findAll({
    offset: 0,
    limit: 3,
    order: db.random(),
    where: {
      status: 0
    }
  }).then(result => {
    let list = []
    if (result && result.length) {
      list = result.map(val => {
        return {
          'id': val.id,
          'img': val.imgList.split(',')[0],
          'content': val.content,
          'title': val.title,
          'price': val.price,
          'LookNumber': val.LookNumber,
          'info': {
            'portrait': val.info_portrait,
            'name': val.info_name
          }
        }
      })
    }
    res.send({
      code: 0,
      msg: '成功',
      data: list
    })
  }).catch(value => {
    console.log(value)
    res.send({
      code: 1,
      msg: '没有内容',
      data: {}
    })
  })
})
router.get('/commodityList', function (req, res) {
  // 获取个人信息
  const query = req.query
  query.token && getToken(query.token)
  User.findAll({
    offset: query.offset * 1 || 0,
    limit: query.limit * 1 || 10,
    order: [['id', 'DESC']],
    where: {
      status: 0
    }
  }).then(result => {
    let list = []
    if (result && result.length) {
      list = result.map(val => {
        return {
          'id': val.id,
          'img': val.imgList.split(',')[0],
          'content': val.content,
          'title': val.title,
          'price': val.price,
          'LookNumber': val.LookNumber,
          'info': {
            'portrait': val.info_portrait,
            'name': val.info_name
          }
        }
      })
    }
    res.send({
      code: 0,
      msg: '成功',
      data: list
    })
  }).catch(value => {
    console.log(123, value)
    res.json({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.post('/publishItem', upload.array(), function (req, res) {
  // 获取个人信息
  const body = req.body
  const token = body.token && getToken(body.token)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  if (!(body.imgList && body.title && body.content && body.brandNew && body.price)) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }
  Users.findAll({
    where: {
      phone: token.phone,
      password: token.password
    }
  }).then(result => {
    if (result && result.length) {
      return User.create({
        status: 0,
        LookNumber: 0,
        imgList: body.imgList,
        title: body.title,
        content: body.content,
        brandNew: body.brandNew,
        price: body.price,
        info_id: result[0].id,
        info_name: result[0].name,
        info_portrait: result[0].portrait
      })
    }
    return Promise.reject('错误1')
  }).then(function (result) {
    console.log(result)
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(function (err) {
    console.log(err)
    res.send({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.get('/publish', function (req, res) {
  // +1我买到的 -1我卖出的 +0发布的
  // 0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
  const query = req.query
  let status = {}
  if (!(query.token && getToken(query.token))) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  const token = getToken(query.token)
  switch (query.publish) {
  case '+1':
    status = {
      status: {
        [Op.gte]: 1
      },
      logistics_id: token.id
    }
    break
  case '-1':
    status = {
      status: {
        [Op.gte]: 1
      },
      info_id: token.id
    }
    break
  case '+0':
    status = {
      status: 0,
      info_id: token.id
    }
    break
  default:
    res.send({
      code: 1,
      msg: '错误状态',
      data: {}
    })
    return
  }
  User.findAll({
    offset: query.offset * 1 || 0,
    limit: query.limit * 1 || 10,
    order: [['id', 'DESC']],
    where: status
  }).then(result => {
    let list = []
    if (result && result.length) {
      list = result.map(val => {
        return {
          'id': val.id,
          'img': val.imgList.split(',')[0],
          'content': val.content,
          'title': val.title,
          'price': val.price,
          'LookNumber': val.LookNumber,
          'info': {
            'portrait': val.info_portrait,
            'name': val.info_name
          }
        }
      })
    }
    res.send({
      code: 0,
      msg: '成功',
      data: list
    })
  }).catch(value => {
    console.log(123, value)
    res.json({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.get('/CommodityDetails', function (req, res) {
  // +1我买到的 -1我买出的 +0发布的
  // 0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
  const query = req.query
  if (!query.id) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }
  const token = getToken(query.token)
  User.findAll({
    where: {
      id: query.id
    }
  }).then(result => {
    if (!(result && result[0])) return Promise.reject('无内容')
    return User.update({
      LookNumber: result[0].LookNumber++
    }, {
      where: {
        id: query.id
      }
    }).then(value => {
      const data = {
        id: result[0].id,
        imgList: result[0].imgList.split(','),
        content: result[0].content,
        title: result[0].title,
        price: result[0].price,
        LookNumber: result[0].LookNumber,
        status: result[0].status,//0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
        brandNew: result[0].brandNew,// 全新
        info: {
          id: result[0].info_id,
          portrait: result[0].info_portrait,
          name: result[0].info_name
        }
      }
      if (token && (token.id === result[0].info_id || (result[0].logistics_id && token.id === result[0].logistics_id))) {
        data.logistics = {
          id: result[0].logistics_id,
          odd: result[0].logistics_odd,
          oddName: result[0].logistics_oddName,
          name: result[0].logistics_name,
          phone: result[0].logistics_phone,
          location: result[0].logistics_location,
          portrait: result[0].logistics_portrait
        }
      }
      return res.send({
        code: 0,
        msg: '成功',
        data
      })
    })
  }).catch(value => {
    console.log(123, value)
    res.json({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.post('/purchase', upload.array(), function (req, res) {
  // 购买宝贝
  const body = req.body
  let token = getToken(body.token)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  if (!body.id) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }

  Promise.all([
    Users.findAll({
      where: {
        id: token.id,
        phone: token.phone
      }
    }),
    User.findAll({
      where: {
        id: body.id,
        info_id: {
          [Op.ne]: token.id
        },
        status: 0,
      }
    })]).then(result => {
    const info = result[0] && result[0][0]
    const order = result[1] && result[1][0]
    if (info && order) {
      token = setToken(body.token, JSON.parse(JSON.stringify(info.dataValues)))
      if (!token.location) {
        res.send({
          code: 1,
          msg: '地址错误',
          data: {}
        })
        return
      }
      if (order.dataValues.price < info.dataValues.balance) {
        res.send({
          code: 2,
          msg: '余额不足',
          data: {}
        })
        return
      }
      return Promise.all([
        User.update({
          status: 1,
          logistics_id: info.dataValues.id,
          logistics_name: info.dataValues.name,
          logistics_phone: info.dataValues.phone,
          logistics_location: info.dataValues.location,
          logistics_portrait: info.dataValues.portrait
        }, { where: { id: body.id } }),
        Users.update({ balance: info.dataValues.balance - order.dataValues.price }, {
          where: {
            id: token.id,
            phone: token.phone
          }
        })
      ])
    }
    return Promise.reject('错误1')
  }).then(function (result) {
    console.log(result)
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(function (err) {
    console.log(err)
    res.send({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.post('/delTreasure', upload.array(), function (req, res) {
  // 下架
  const body = req.body
  let token = getToken(body.token)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  if (!body.id) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }

  Promise.all([
    Users.findAll({
      where: {
        id: token.id,
        phone: token.phone
      }
    }),
    User.findAll({
      where: {
        id: body.id,
        info_id: {
          [Op.ne]: token.id
        },
        status: 0,
      }
    })]).then(result => {
    const info = result[0] && result[0][0]
    const order = result[1] && result[1][0]
    if (info && order) {
      token = setToken(body.token, JSON.parse(JSON.stringify(info.dataValues)))
      if (!token.location) {
        res.send({
          code: 1,
          msg: '地址错误',
          data: {}
        })
        return
      }
      if (order.dataValues.price < info.dataValues.balance) {
        res.send({
          code: 2,
          msg: '余额不足',
          data: {}
        })
        return
      }
      return Promise.all([
        User.update({
          status: 1,
          logistics_id: info.dataValues.id,
          logistics_name: info.dataValues.name,
          logistics_phone: info.dataValues.phone,
          logistics_location: info.dataValues.location,
          logistics_portrait: info.dataValues.portrait
        }, { where: { id: body.id } }),
        Users.update({ balance: info.dataValues.balance - order.dataValues.price }, {
          where: {
            id: token.id,
            phone: token.phone
          }
        })
      ])
    }
    return Promise.reject('错误1')
  }).then(function (result) {
    console.log(result)
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(function (err) {
    console.log(err)
    res.send({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.post('/amendExpressage', upload.array(), function (req, res) {
  // 物流修改
  const body = req.body
  let token = getToken(body.token)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  if (!body.id) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }

  Promise.all([
    Users.findAll({
      where: {
        id: token.id,
        phone: token.phone
      }
    }),
    User.findAll({
      where: {
        id: body.id,
        info_id: {
          [Op.ne]: token.id
        },
        status: 0,
      }
    })]).then(result => {
    const info = result[0] && result[0][0]
    const order = result[1] && result[1][0]
    if (info && order) {
      token = setToken(body.token, JSON.parse(JSON.stringify(info.dataValues)))
      if (!token.location) {
        res.send({
          code: 1,
          msg: '地址错误',
          data: {}
        })
        return
      }
      if (order.dataValues.price < info.dataValues.balance) {
        res.send({
          code: 2,
          msg: '余额不足',
          data: {}
        })
        return
      }
      return Promise.all([
        User.update({
          status: 1,
          logistics_id: info.dataValues.id,
          logistics_name: info.dataValues.name,
          logistics_phone: info.dataValues.phone,
          logistics_location: info.dataValues.location,
          logistics_portrait: info.dataValues.portrait
        }, { where: { id: body.id } }),
        Users.update({ balance: info.dataValues.balance - order.dataValues.price }, {
          where: {
            id: token.id,
            phone: token.phone
          }
        })
      ])
    }
    return Promise.reject('错误1')
  }).then(function (result) {
    console.log(result)
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(function (err) {
    console.log(err)
    res.send({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})
router.post('/confirmExpressage', upload.array(), function (req, res) {
  // 物流修改
  const body = req.body
  let token = getToken(body.token)
  if (!token) {
    res.send({
      code: 911,
      msg: 'token1',
      data: {}
    })
    return
  }
  if (!body.id) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }

  Promise.all([
    Users.findAll({
      where: {
        id: token.id,
        phone: token.phone
      }
    }),
    User.findAll({
      where: {
        id: body.id,
        info_id: {
          [Op.ne]: token.id
        },
        status: 0,
      }
    })]).then(result => {
    const info = result[0] && result[0][0]
    const order = result[1] && result[1][0]
    if (info && order) {
      token = setToken(body.token, JSON.parse(JSON.stringify(info.dataValues)))
      if (!token.location) {
        res.send({
          code: 1,
          msg: '地址错误',
          data: {}
        })
        return
      }
      if (order.dataValues.price < info.dataValues.balance) {
        res.send({
          code: 2,
          msg: '余额不足',
          data: {}
        })
        return
      }
      return Promise.all([
        User.update({
          status: 1,
          logistics_id: info.dataValues.id,
          logistics_name: info.dataValues.name,
          logistics_phone: info.dataValues.phone,
          logistics_location: info.dataValues.location,
          logistics_portrait: info.dataValues.portrait
        }, { where: { id: body.id } }),
        Users.update({ balance: info.dataValues.balance - order.dataValues.price }, {
          where: {
            id: token.id,
            phone: token.phone
          }
        })
      ])
    }
    return Promise.reject('错误1')
  }).then(function (result) {
    console.log(result)
    res.send({
      code: 0,
      msg: 'ok',
      data: {}
    })
  }).catch(function (err) {
    console.log(err)
    res.send({
      code: 1,
      msg: '错误',
      data: {}
    })
  })
})

module.exports = router
