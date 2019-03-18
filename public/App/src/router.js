import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import App from './page/App'
import Setting from './page/setting/setting'
import { connect } from 'react-redux'

function RouterRoot (props) {
  const style = {
    'display': 'flex',
    'margin': '0 auto',
    'minHeight': `${props.minHeight}px`,
    'width': `${props.minWidth}px`,
    'backgroundColor': '#fff'
  }

  return (
    <BrowserRouter>
      <div style={style}>
        <Switch>
          <Route path="/index" component={App}/>
          <Route path="/setting" component={Setting}/>
          <Redirect to="/index"/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default connect(state => ({
  minHeight: state.device.height,
  minWidth: state.device.width > 640 ? 640 : state.device.width
}))(RouterRoot)
