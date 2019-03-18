import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// 路由与redux
export function ReduxRoute (mapStateToProps, mapDispatchToProps) {
  const con = connect(mapStateToProps, mapDispatchToProps)
  return (components) => {
    return withRouter(con(components))
  }
}
