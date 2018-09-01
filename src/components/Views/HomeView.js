import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import { getIsNavOpen, updateIsNavOpen } from 'modules/navigation'
import SectionList from 'components/SectionList/SectionList'
import './HomeView.scss'

const mapDispatchToProps = {
  updateIsNavOpen: value => updateIsNavOpen(value)
}

const mapStateToProps = state => {
  return {
    isNavOpen: getIsNavOpen(state),
    navItems: app.getSections(state)
  }
}

class HomeView extends React.Component {
  toggleNavigation = () => {
    this.props.updateIsNavOpen(!this.props.isNavOpen)
  }

  openNav = () => this.props.updateIsNavOpen(true)

  closeNav = () => this.props.updateIsNavOpen(false)

  renderNavItem (item, children) {
    return (
      <li className='Nav__item' key={item.slug}>
        <h2 className='Nav__header'>
          <a href={`#${item.slug}`}>
            {item.name}
          </a>
        </h2>
        {
          item.isGrouped && item.chapters
          ? <ul className='sublist'>
              {_.map(item.chapters, chapter =>
                <li className='sublist__item' key={chapter.slug}>
                  <a href={`#${chapter.slug}`}>
                    {chapter.name}
                  </a>
                </li>
              )}
            </ul>
          : null
        }
      </li>
    )
  }

  render () {
    const className = [
      'Header',
      this.props.isNavOpen ? 'Header--open' : null
    ].join(' ')

    return (
      <div>
        <header className={className}>
          <h1>
            <a href=''>
              Ways of Being
            </a>
          </h1>
          <div
            className='Header__toggle-Nav'
            onClick={this.toggleNavigation}
            onMouseEnter={this.openNav}
          >
            <i className={`fas fa-${this.props.isNavOpen ? 'times' : 'bars'}`} />
          </div>
          <nav className='Header__Nav' onMouseLeave={this.closeNav}>
            <ul>
              {this.renderNavItem({ name: 'Pre-Order the Book' })}
              {this.renderNavItem({ name: 'Play the Card Game' })}
              {_.map(this.props.navItems, item => this.renderNavItem(item))}
            </ul>
          </nav>
        </header>
        <SectionList />
      </div>
    )
  }
}

HomeView.propTypes = {
}

HomeView.defaultProps = {
  isNavOpen: false
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
