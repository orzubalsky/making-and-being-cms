import React from 'react'
import PropTypes from 'prop-types'
import ItemList from 'components/ItemList/ItemList'
import ChapterList from 'components/ChapterList/ChapterList'
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
        <ChapterList />
      </div>
    )
  }
}

HomeView.propTypes = {
}

HomeView.defaultProps = {
}

export default HomeView
