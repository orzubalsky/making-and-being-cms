import React from 'react'
import PropTypes from 'prop-types'
import './ItemHeader.scss'

class ItemHeader extends React.Component {
  render () {
    const { name, type, media } = this.props

    return (
      <div className='ItemHeader'>
        <h3 className='ItemHeader__name ItemHeader__cell'>{name}</h3>
        <h3 className='ItemHeader__type ItemHeader__cell'>{type}</h3>
        <h3 className='ItemHeader__media ItemHeader__cell'>
          <i className='far fa-file' />
        </h3>
      </div>
    )
  }
}

ItemHeader.propTypes = {
  media: PropTypes.object,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
}

ItemHeader.defaultProps = {
}

export default ItemHeader
