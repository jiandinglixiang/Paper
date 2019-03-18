import React, { Component } from 'react'
import { Icon, InputItem, List, NavBar } from 'antd-mobile'
import style from './setting.module.scss'
import { createForm } from 'rc-form'

let moneyKeyboardWrapProps
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  }
}

const From = createForm()(function (props) {
  const { getFieldProps } = props.form
  return <List renderHeader={() => 'Format'}>
    <InputItem
      {...getFieldProps('name', {
        initialValue: '',
      })}
      type="text"
    >昵称</InputItem>
    <InputItem
      {...getFieldProps('phone')}
      type="phone"
      placeholder="186 1234 1234"
    >手机号码</InputItem>
    <InputItem
      {...getFieldProps('password')}
      type="password"
      placeholder="****"
    >密码</InputItem>
    <InputItem
      {...getFieldProps('number')}
      type="number"
      placeholder="click to show number keyboard"
    >数字键盘</InputItem>
    <InputItem
      {...getFieldProps('digit')}
      type="digit"
      placeholder="click to show native number keyboard"
    >数字键盘</InputItem>
  </List>
})

class Setting extends Component {
  state = {
    hasError: false,
    value: '',
  }
  submitSearch = () => {
    console.log(this.state.searchVal)
  }
  onChange = (val) => {
    this.setState({ value: val })
  }

  render () {
    return (<div className={style['app-page']}>
      <NavBar
        mode="light"
        icon={<Icon type="left"/>}
        onLeftClick={() => {
          this.props.history.goBack()
        }}
        rightContent={[<Icon key="1" type="ellipsis"/>]}
      >个人资料</NavBar>
      <From/>
    </div>)
  }
}

export default Setting
