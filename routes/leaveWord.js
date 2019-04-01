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
const User = db.define('leave_words', {
  info_id: Sequelize.STRING,
  info_portrait: Sequelize.STRING,
  info_name: Sequelize.STRING,
  msg_list: Sequelize.STRING,
  commodity_id: Sequelize.STRING// 商品id
}, {
  timestamps: false
})

router.get('/getMassageList', function (req, res) {
  // 获取留言记录
  const query = req.query
  if(!query.id){
    res.send({
      code: 1,
      msg: '没有内容id',
      data: {}
    })
    return
  }
  User.findAll({
    offset: query.offset * 1 || 0,
    limit: query.limit * 1 || 10,
    where: {
      commodity_id: query.id
    }
  }).then(result => {
    console.log(result)
    let list = []
    if (result && result.length) {
      list = result.map(val => {
        return {
          portrait: val.dataValues.info_portrait,
          name: val.dataValues.info_name,
          list: val.dataValues.msg_list
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
router.post('/addMassage', upload.array(), function (req, res) {
  // 添加留言
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
  if (!(body.msg && body.id)) {
    res.send({
      code: 1,
      msg: '参数错误',
      data: {}
    })
    return
  }
  User.findAll({
    where: {
      commodity_id: body.id,
      info_id: token.id
    }
  }).then(result => {
    console.log(1, result)
    let list = [{ msg: body.msg, time: new Date().getTime() / 1000 }]
    if (result && result.length) {
      list.push.apply(list, result[0].dataValues.msg_list)
      return User.update({
        info_name: token.name,
        info_portrait: token.portrait,
        msg_list: JSON.stringify(list)
      }, {
        where: {
          commodity_id: body.id,
          info_id: token.id
        }
      })
    } else {
      return User.create({
        info_id: token.id,
        info_portrait: token.portrait,
        info_name: token.name,
        msg_list: JSON.stringify(list),
        commodity_id: body.id// 商品id
      })
    }
  }).then(function (result) {
    console.log(2, result)
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
