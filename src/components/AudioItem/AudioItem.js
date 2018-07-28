import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import './AudioItem.scss'

class AudioItem extends React.Component {
  render () {
    const { item } = this.props

    return (
      <Item type={item.type} className='AudioItem'>
        {item.name}
      </Item>
    )
  }
}

AudioItem.propTypes = {
}

AudioItem.defaultProps = {
}

export default AudioItem
