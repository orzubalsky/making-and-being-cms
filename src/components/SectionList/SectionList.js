import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import Section from 'components/Section/Section'
import Loader from 'components/Loader/Loader'
import './SectionList.scss'

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => {
  const items = app.getSections(state)

  return {
    isLoaded: app.getProp(state, 'isLoaded'),
    items
  }
}

class SectionList extends React.Component {
  render () {
    const { isLoaded, items } = this.props

    return (
      <Loader className='SectionList' isLoaded={isLoaded}>
        {_.map(items, item => <Section key={item.id} item={item} />)}
      </Loader>
    )
  }
}

SectionList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  items: PropTypes.array
}

SectionList.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionList)
