import React from 'react'
import PropTypes from 'prop-types'
import './ReadMore.scss'

class ReadMore extends React.Component {
  render () {
    const { isVisible, onClick } = this.props

    if (!isVisible) return null

    return (
      <div className='ReadMore' onClick={() => this.props.onClick()}>
        <i className='ReadMore__icon fas fa-arrow-down' />
      </div>
    )
  }
}

ReadMore.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

ReadMore.defaultProps = {
  isVisible: true
}

export default ReadMore
