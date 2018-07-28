import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import ItemHeader from 'components/Item/ItemHeader'
import VideoItem from 'components/VideoItem/VideoItem'
import './ChapterItem.scss'

class ChapterItem extends React.Component {
  render () {
    const { item } = this.props

    return (
      <Item type={item.type} className='ChapterItem'>
        <h2 className='ChapterItem__name'>
          {`${item.position} // ${item.name}`}
        </h2>
        <VideoItem item={item.video} />
        <div  
          className='ChapterItem__content'
          dangerouslySetInnerHTML={{ __html: item.content }} 
        />
      </Item>
    )
  }
}

ChapterItem.propTypes = {
}

ChapterItem.defaultProps = {
}

export default ChapterItem
