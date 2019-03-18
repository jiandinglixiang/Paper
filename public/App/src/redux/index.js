import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import home from './home/index'
import mine from './mine/index'
import device from './device'
import { all } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()//  中间件 redux-sage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // redux-devtool

const store = createStore(
  combineReducers({
    home: home.reducer,
    mine: mine.reducer,
    device: device.reducer
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware)) // 中间件
)

sagaMiddleware.run(function * () {
  yield all([
    ...(home.effects),
    ...(mine.effects)
  ])
})
device.method.update(store)// 设备宽高更新

export default store
