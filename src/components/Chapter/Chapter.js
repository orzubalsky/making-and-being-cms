import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import ReadMore from 'components/ReadMore/ReadMore'
import ResourceItem from 'components/ResourceItem/ResourceItem'
import EventItem from 'components/EventItem/EventItem'
import './Chapter.scss'

class Chapter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isExpanded: false,
      isSubsectionsExpanded: false
    }
  }

  renderSubsection (section, index) {
    const { isExpanded, isSubsectionsExpanded } = this.state

    const className = [
      'Subsection',
      isExpanded && index === 0 ? 'Subsection--expanded' : null,
      isSubsectionsExpanded ? 'Subsection--expanded' : null
    ].join(' ')

    return (
      <div className={className} id={section.slug} key={section.slug}>
        { section.isnamevisible
          ? <h3 className='Subsection__name'>
              {`${section.name}`}
            </h3>
          : null
        }
        <div className='Subsection__content' dangerouslySetInnerHTML={{ __html: section.content }} />
      </div>
    )
  }

  setExpanded () {
    const { item } = this.props
    const { isExpanded, isSubsectionsExpanded } = this.state

    !isExpanded && this.setState({ isExpanded: true })
    !isExpanded && item.subsections.length <= 1 && this.setState({ isExpanded: true, isSubsectionsExpanded: true })
    isExpanded && this.setState({ isSubsectionsExpanded: true })
    isExpanded && isSubsectionsExpanded && this.setState({ isExpanded: false, isSubsectionsExpanded: false })
  }

  render () {
    const { item } = this.props
    const { isExpanded, isSubsectionsExpanded  } = this.state

    const hasAssignments = item.assignments.length > 0
    const hasActivities = item.activities.length > 0
    const hasEvents = item.events.length > 0

    const className = [
      'Chapter',
      !isExpanded ? 'Chapter--collapsed' : null,
      !isSubsectionsExpanded ? 'Chapter--subsections-collapsed' : null,
      hasActivities || hasAssignments || hasEvents ? 'Chapter--with-list' : null
    ].join(' ')


    return (
      <div className={className} id={item.slug}>
        <div className='Chapter__header' onClick={() => this.setExpanded()}>
          <h3 className='Chapter__number'>
            {`${item.position}`}
          </h3>
          <h2 className='Chapter__name'>
            <span className='arrow'>&#8627; </span>{`${item.name}`}
          </h2>
        </div>
          <div className='Chapter__content'>
            {item.subsections.map((section, i) => this.renderSubsection(section, i))}
            <ReadMore
              onClick={() => this.setExpanded()}
              isExpanded={isExpanded && isSubsectionsExpanded}
              text={isExpanded && !isSubsectionsExpanded ? 'Continue reading' : isExpanded && isSubsectionsExpanded ? 'Collapse' : null}
            />
          </div>
          {hasAssignments
            ? <div className='List'>
              <h3 className='List__header'><span>Assignments</span></h3>
              <div className='List__items'>
                {item.assignments.map(item => <ResourceItem key={item.id} item={item} />)}
              </div>
            </div>
            : null
          }
          {hasActivities
            ? <div className='List'>
              <h3 className='List__header'><span>Activities</span></h3>
              <div className='List__items'>
                {item.activities.map(item => <ResourceItem key={item.id} item={item} />)}
              </div>
            </div>
            : null
          }
          {hasEvents
            ? <div className='List'>
              <h3 className='List__header'><span>Events</span></h3>
              <div className='List__items'>
                {item.events.map(item => <EventItem key={item.id} item={item} />)}
              </div>
            </div>
            : null
          }
      </div>
    )
  }
}

Chapter.propTypes = {
  item: PropTypes.object
}

Chapter.defaultProps = {
}

export default Chapter
