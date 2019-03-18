import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import Home from './index/home'
import Mine from './index/mine'
import style from './App.module.scss'

function App (props) {

  return (<div className={style['app-page']}>
    <Switch>
      <Route exact path="/index" component={Home}/>
      <Route exact path='/index/mine' component={Mine}/>
    </Switch>
    <div className={style['nav-index']}>
      <TabBar tabBarPosition="bottom">
        <TabBar.Item
          title="首页"
          key="Home"
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg' }}
          selected={props.location.pathname === '/index'}
          onPress={() => props.history.push('/index')}
        />
        <TabBar.Item
          title="我的"
          key="Mine"
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg' }}
          selected={props.location.pathname === '/index/mine'}
          onPress={() => props.history.push('/index/mine')}
        />
      </TabBar>
    </div>
  </div>)
}
export default App
