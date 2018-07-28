import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import { TYPES } from 'utils/types'
import VideoItem from 'components/VideoItem/VideoItem'
import ResourceItem from 'components/ResourceItem/ResourceItem'
import AudioItem from 'components/AudioItem/AudioItem'
import ChapterItem from 'components/ChapterItem/ChapterItem'
import EventItem from 'components/EventItem/EventItem'
import Loader from 'components/Loader/Loader'
import './ItemList.scss'

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => {
  const items = app.getItems(state)
  
  return {
    isLoaded: app.getProp(state, 'isLoaded'),
    items
  }
}

const components = {
  [TYPES.VIDEO] : VideoItem,
  [TYPES.ASSIGNMENT] : ResourceItem,
  [TYPES.ACTIVITY] : ResourceItem,
  [TYPES.PODCAST] : AudioItem,
  [TYPES.CHAPTER] : ChapterItem,
  [TYPES.EVENT] : EventItem
}

class ItemList extends React.Component {
  renderItem (item) {
    const Component = components[item.type]
    return <Component key={item.id} item={item} />
  }

  render () {
    const { isLoaded, items } = this.props

    return (
      <Loader className='ItemList' isLoaded={isLoaded}>
        {_.map(items, item => this.renderItem(item))}
      </Loader>
    )
  }
}

ItemList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  items: PropTypes.array
}

ItemList.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
