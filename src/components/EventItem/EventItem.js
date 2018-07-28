import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import ItemHeader from 'components/Item/ItemHeader'
import './EventItem.scss'

class EventItem extends React.Component {
  render () {
    const { item } = this.props

    return (
	   <Item type={item.type} className='EventItem'>
        <ItemHeader {...item} />
      </Item>
    )
  }
}

EventItem.propTypes = {
}

EventItem.defaultProps = {
}

export default EventItem
