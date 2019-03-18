import React, { Component } from 'react'
import { ReduxRoute } from '../../tool/router-redux'
import style from './mine.module.scss'
import { Grid, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'

class Mine extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (<div className={style['mine-page']}>
      <Link to="/setting?a=987654" className={style['mine-top']}>
        <img src="http://temp.im/120x120/2effee/fff" alt=""/>
        <div>
          <p>名字</p>
          <p>15577648264</p>
        </div>
        <Icon className={style['right-icon']} type="right"/>
      </Link>
      <Grid data={[
        {
          icon: 'http://temp.im/120x120/9effdd/fff',
          text: `我发布的`,
        },
        {
          icon: 'http://temp.im/120x120/9effee/fff',
          text: `我买到的`,
        },
        {
          icon: 'http://temp.im/120x120/9effff/fff',
          text: `我卖出的`,
        },
        {
          icon: 'http://temp.im/120x120/9effff/fff',
          text: `退出账号`,
        }
      ]} columnNum={3}/>
    </div>)
  }
}

export default ReduxRoute(
  (state, props) => ({
    a: state.home.count,
    b: state.mine.count
  }),
  (dispatch, props) => ({
    cClick1: () => dispatch({ type: 'ADD_HOME', payload: 10 }),
    cClick2: () => dispatch({ type: 'DEL_HOME', payload: 10 }),
    cClick3: () => dispatch({ type: 'ADD_HOME_ASYNC', payload: 10 }),
    cClick4: () => dispatch({ type: 'DEL_HOME_ASYNC', payload: 10 }),
    cClick5: () => dispatch({ type: 'ADD_MINE_ASYNC', payload: Math.random() * 100 }),
    cClick6: () => dispatch({ type: 'DEL_MINE_ASYNC', payload: Math.random() * 100 })
  })
)(Mine)
