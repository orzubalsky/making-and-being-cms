import React from 'react'
import PropTypes from 'prop-types'
import SectionList from 'components/SectionList/SectionList'
import './HomeView.scss'

class HomeView extends React.Component {
  render () {
    return (
      <div>
        <header className='Header'>
          <h1>
            <a href=''>
              Ways of Being
            </a>
          </h1>
        </header>
        <SectionList />
      </div>
    )
  }
}

HomeView.propTypes = {
}

HomeView.defaultProps = {
}

export default HomeView
