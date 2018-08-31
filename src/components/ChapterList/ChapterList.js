import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Chapter from 'components/Chapter/Chapter'
import './ChapterList.scss'

class ChapterList extends React.Component {
  render () {
    const { items } = this.props

    return (
      <div className='ChapterList'>
        {_.map(items, item => <Chapter key={item.id} item={item} />)}
      </div>
    )
  }
}

ChapterList.propTypes = {
  items: PropTypes.array
}

ChapterList.defaultProps = {
}

export default ChapterList
