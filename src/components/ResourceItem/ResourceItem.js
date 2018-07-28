import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import ItemHeader from 'components/Item/ItemHeader'
import './ResourceItem.scss'

class ResourceItem extends React.Component {
  render () {
    const { item } = this.props

    return (
      <Item type={item.type} className='ResourceItem'>
        <ItemHeader {...item} />
        <div  
          className='ResourceItem__content'
          dangerouslySetInnerHTML={{ __html: item.content }} 
        />        
      </Item>
    )
  }
}

ResourceItem.propTypes = {
}

ResourceItem.defaultProps = {
}

export default ResourceItem
