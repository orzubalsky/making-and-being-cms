import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import ReadMore from 'components/ReadMore/ReadMore'
import ChapterList from 'components/ChapterList/ChapterList'
import './Section.scss'

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isExpanded: false }
  }

  renderHeader () {
    const { item } = this.props
    const { isExpanded } = this.state

    return (
      <div className='Section__header'>
        <h2 className='Section__name'>
          {`${item.name}`}
        </h2>
      </div>
    )
  }

  renderContent () {
    const { item } = this.props
    const { isExpanded } = this.state

    if (item.isGrouped && !isExpanded) return

    return <ChapterList items={item.chapters} />
  }

  render () {
    const { item } = this.props
    const { isExpanded } = this.state

    const className = [
      'Section',
      !isExpanded ? 'Section--collapsed' : null,
    ].join(' ')

    return (
      <div className={className} id={item.slug}>
        { item.isGrouped  ? this.renderHeader() : null }
        {this.renderContent()}
        <ReadMore
          onClick={() => this.setState({ isExpanded: !isExpanded })}
          isExpanded={isExpanded}
          isVisible={item.isGrouped && !isExpanded}
        />
      </div>
    )
  }
}

Section.propTypes = {
  item: PropTypes.object.isRequired
}

Section.defaultProps = {
}

export default Section
