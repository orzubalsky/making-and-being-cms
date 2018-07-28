import React from 'react'
import PropTypes from 'prop-types'
import './VideoItem.scss'

class VideoItem extends React.Component {
  render () {
  	const { item } = this.props

    if (!item) return null

    const id = item.media.url.match(/\d+/)[0]
    const iframe = `<iframe class="iframe" src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`

    return (
      <div className='Video'>
        <div 
          className='Video__ratio' 
          dangerouslySetInnerHTML={{ __html: iframe }} 
        />
      </div>
    )
  }
}

VideoItem.propTypes = {
  className: PropTypes.string
}

VideoItem.defaultProps = {
  className: ''
}

export default VideoItem
