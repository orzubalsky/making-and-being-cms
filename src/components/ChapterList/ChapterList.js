import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import Chapter from 'components/Chapter/Chapter'
import Loader from 'components/Loader/Loader'
import './ChapterList.scss'

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => {
  const items = app.getChapters(state)
  
  return {
    isLoaded: app.getProp(state, 'isLoaded'),
    items
  }
}

class ChapterList extends React.Component {
  render () {
    const { isLoaded, items } = this.props

    return (
      <Loader className='ChapterList' isLoaded={isLoaded}>
        {_.map(items, item => <Chapter key={item.id} item={item} />)}
      </Loader>
    )
  }
}

ChapterList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  items: PropTypes.array
}

ChapterList.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)
