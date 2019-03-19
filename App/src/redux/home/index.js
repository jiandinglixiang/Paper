import { delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'

const $this = {
  data () {
    return { count: 1 }
  },
  reducer (state = $this.data(), action) {
    // 同步
    switch (action.type) {
    case 'ADD_HOME':
      return Object.assign({}, state, { count: $this.method.add(state.count, action) })
    case 'DEL_HOME':
      return Object.assign({}, state, { count: $this.method.del(state.count, action) })
    default:
      return state
    }
  },
  effects: [ // 异步
    fork(function * () {
      yield takeEvery('ADD_HOME_ASYNC', function * (action) {
        yield delay(1000)
        yield put({ type: 'ADD_HOME', payload: action.payload })
      })
    }),
    fork(function * () {
      yield takeLatest('DEL_HOME_ASYNC', function * (action) {
        yield delay(1000)
        yield put({ type: 'DEL_HOME', payload: action.payload })
      })
    })
  ],
  method: {
    add (state = $this.data().count, action) {
      return state * action.payload
    },
    del (state = $this.data().count, action) {
      return state / action.payload
    }
  }
}

export default $this
