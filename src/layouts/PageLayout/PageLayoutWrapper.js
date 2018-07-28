import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { mountRequested } from 'modules/app'
import PageLayout from 'layouts/PageLayout'
import HomeView from 'components/Views/HomeView'
import './PageLayout.scss'

const mapDispatchToProps = {
  mount: () => mountRequested()
}

const mapStateToProps = state => {
  return {}
}

export class PageLayoutWrapper extends React.Component {
  componentWillMount () {
    this.props.mount()
  }

  componentWillUpdate (prevProps) {
    const previousPathname = prevProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (previousPathname !== currentPathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div className='App'>
        <PageLayout exact path='/' Component={HomeView} />
      </div>
    )
  }
}

PageLayoutWrapper.propTypes = {
  location: PropTypes.object,
  mount: PropTypes.func.isRequired
}

PageLayoutWrapper.defaultProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageLayoutWrapper))
