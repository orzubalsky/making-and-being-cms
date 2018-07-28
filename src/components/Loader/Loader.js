import React from 'react'
import PropTypes from 'prop-types'
import './Loader.scss'

export class Loader extends React.Component {
  render () {
    if (this.props.isLoaded) {
      return (
        <div className={`Loader--loaded ${this.props.className}`}>
          {this.props.children}
        </div>
      )
    }

    return (
      <div className='Loader'>
        Loading...
      </div>
    )
  }
}

Loader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  message: PropTypes.string
}

Loader.defaultProps = {
  isLoaded: false
}

export default Loader
