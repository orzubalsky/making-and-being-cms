import React from 'react'
import PropTypes from 'prop-types'
import './ReadMore.scss'

class ReadMore extends React.Component {
  render () {
    const { isExpanded, isVisible, onClick, text } = this.props

    if (!isVisible) return null;

    const className = [
      'ReadMore',
      isExpanded ? 'ReadMore--collapse' : null
    ].join(' ')

    return (
      <div className={className} onClick={() => onClick()}>
        {text}
        <i className='ReadMore__icon fas fa-arrow-down' />
      </div>
    )
  }
}

ReadMore.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
}

ReadMore.defaultProps = {
  isExpanded: false,
  isVisible: true
}

export default ReadMore
