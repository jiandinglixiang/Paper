import { delay, fork, put, take, takeLatest } from 'redux-saga/effects'

export const ADD_MINE = 'ADD_MINE'
export const DEL_MINE = 'DEL_MINE'
export const ADD_MINE_ASYNC = 'ADD_MINE_ASYNC'
export const DEL_MINE_ASYNC = 'DEL_MINE_ASYNC'

const $this = {
  data () {
    return { count: 0 }
  },
  reducer (state = $this.data(), action) {
    switch (action.type) {
    case ADD_MINE:
      return Object.assign({}, state, { count: $this.method.add(state.count, action) })
    case DEL_MINE:
      return Object.assign({}, state, { count: $this.method.del(state.count, action) })
    default:
      return state
    }
  },
  effects: [
    fork(function * () {
      while (true) {
        const action = yield take(ADD_MINE_ASYNC)
        yield delay(1000)
        yield put({ type: ADD_MINE, payload: action.payload })
      }
      // yield takeEvery(ADD_MINE_ASYNC, function * (action) {
      //   yield delay(1000)
      //   yield put({ type: ADD_MINE, payload: action.payload })
      // })
    }),
    fork(function * () {
      yield takeLatest(DEL_MINE_ASYNC, function * (action) {
        yield delay(1000)
        yield put({ type: DEL_MINE, payload: action.payload })
      })
    })
  ],
  method: {
    add (state = $this.data().count, action) {
      return state + action.payload
    },
    del (state = $this.data().count, action) {
      return state - action.payload
    }
  }
}

export default $this
