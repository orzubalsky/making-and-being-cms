import React from 'react'
import PropTypes from 'prop-types'
import './Item.scss'

class Item extends React.Component {
  render () {
  	const { children, type } = this.props

  	const className = [
      'Item',
      this.props.className
  	].join(' ')

    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

Item.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  type: PropTypes.string
}

Item.defaultProps = {
  className: ''
}

export default Item
