import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item/Item'
import VideoItem from 'components/VideoItem/VideoItem'
import ResourceItem from 'components/ResourceItem/ResourceItem'
import EventItem from 'components/EventItem/EventItem'
import './Chapter.scss'

class Chapter extends React.Component {
  render () {
    const { item } = this.props
    const hasAssignments = item.assignments.length > 0
    const hasActivities = item.activities.length > 0
    const hasEvents = item.events.length > 0

    const className = [
      'Chapter',
      hasActivities || hasAssignments || hasEvents ? 'Chapter--with-list' : null
    ].join(' ')


    return (
      <div className={className}>
        <div className='Chapter__header'>
          <h3 className='Chapter__number'>
            {`${item.position}`}
          </h3>        
          <h2 className='Chapter__name'>
            {`${item.name}`}
          </h2>
        </div>
        <VideoItem item={item.video} />
        <div  
          className='Chapter__content'
          dangerouslySetInnerHTML={{ __html: item.content }} 
        />
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
}

Chapter.defaultProps = {
}

export default Chapter
