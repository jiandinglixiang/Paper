import React, { Component } from 'react'
import { Card, Carousel, SearchBar, WhiteSpace, } from 'antd-mobile'
import style from './home.module.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchVal: '',
      data: ['http://temp.im/640x260/ff5a5f/fff', 'http://temp.im/640x260/ff5a5f/fff', 'http://temp.im/640x260/ff5a5f/fff'],
      imgHeight: 176,
    }
  }

  submitSearch = () => {
    console.log(this.state.searchVal)
  }
  onChange = (val) => {
    this.setState({ searchVal: val })
  }

  render () {
    return (<div className={style['home']}>
      <SearchBar onChange={this.onChange}
                 placeholder="搜索二手商品"
                 onSubmit={this.submitSearch}
                 value={this.state.searchVal}
      />
      <WhiteSpace/>
      <Carousel
        autoplay={false}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {this.state.data.map((val, index) => (
          <a
            key={index}
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
            }}
          >
            <img
              src={val}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
      {[1, 2, 3].map(val => (<div
          key={val}
        >
          <WhiteSpace/>
          < Card full>
            <Card.Header
              title='用户昵称'
              thumb='http://temp.im/20x20/ff5a5f/fff'
              extra={<span>浏览人数233</span>}
            />
            <Card.Body>
              <div className={style['content-img']}>
                <img src="http://temp.im/120x120/ff5a5f/fff" alt=""/>
                <p>商品简短描述</p>
              </div>

            </Card.Body>
            <Card.Footer content='9新' extra={<div>$112.0</div>}/>
          </Card>
        </div>
      ))}
    </div>)
  }
}

export default Home
