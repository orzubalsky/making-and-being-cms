import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import Item from 'components/Item/Item'
import ReadMore from 'components/ReadMore/ReadMore'
import ChapterList from 'components/ChapterList/ChapterList'
import './Section.scss'

const mapDispatchToProps = {
  updateItem: (item, options) => app.updateItem({ item, options })
}

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: app.getIsSectionExpanded(state, ownProps.item.id)
  }
}

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.updateIsExpanded = this.updateIsExpanded.bind(this)
  }

  updateIsExpanded () {
    const { isExpanded, item, updateItem } = this.props

    updateItem(item, { isExpanded: !isExpanded })
  }

  renderHeader () {
    const { isExpanded, item } = this.props

    return (
      <div className='Section__header'>
        <h2 className='Section__name'>
          {`${item.name}`}
        </h2>
      </div>
    )
  }

  renderContent () {
    const { isExpanded, item } = this.props

    if (item.isGrouped && !isExpanded) return

    return <ChapterList items={item.chapters} />
  }

  render () {
    const { isExpanded, item } = this.props

    const className = [
      'Section',
      !isExpanded ? 'Section--collapsed' : null,
    ].join(' ')

    return (
      <div className={className} id={item.slug}>
        { item.isGrouped  ? this.renderHeader() : null }
        {this.renderContent()}
        <ReadMore
          onClick={() => this.updateIsExpanded()}
          isExpanded={isExpanded}
          isVisible={item.isGrouped && !isExpanded}
        />
      </div>
    )
  }
}

Section.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

Section.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
