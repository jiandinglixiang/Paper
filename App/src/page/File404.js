import React from 'react'
import { Link } from 'react-router-dom'

const style = {
  textAlign: 'center',
  fontSize: '3em'
}

function File404 () {
  return (
    <div style={ style }>
      <p style={ { color: 'red' } }>404</p>
      <Link to="/">返回首页</Link>
    </div>
  )
}

export default File404
