const token = {}

function getToken (key) {
  if (!key) return
  if (token[key]) {
    token[key].time = new Date().getTime()
    return token[key]
  } else {
    return false
  }
}

function setToken (key, data) {
  data.key = key
  data.time = new Date().getTime()
  token[key] = data
  return getToken(key)
}

setInterval(function () {
  const time = new Date().getTime()
  for (let i in token) {
    token[i] && (token[i].time + (10 * 60 * 1000) < time) && delete token[i]
  }
}, 10 * 60 * 1000)

module.exports = {
  setToken,
  getToken,
  token
}
