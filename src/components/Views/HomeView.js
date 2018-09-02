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

  renderNavItem (item, isIncludingChildren = false) {
    const link = ({ slug, name, isExternal }) => {
      const props = {
        href: `${isExternal ? '' : '#'}${slug}`,
        target: isExternal ? '_blank' : null
      }

      return (
        <a {...props}>
          {name}
          {isExternal
            ? <i className='fas fa-external-link-alt' />
            : null
          }
        </a>
      )
    }

    if (!item.isGrouped && item.chapters) {
      return _.map(item.chapters, item =>
        <li className='Nav__item' key={item.slug}>
          <h2 className='Nav__header'>
            {link(item)}
          </h2>
        </li>
      )
    }

    return (
      <li className='Nav__item' key={item.slug}>
        <h2 className='Nav__header'>
          {link(item)}
        </h2>
        {
          item.isGrouped && item.chapters && isIncludingChildren
          ? <ul className='sublist'>
              {_.map(item.chapters, chapter =>
                <li className='sublist__item' key={chapter.slug}>
                  {link(chapter)}
                </li>
              )}
            </ul>
          : null
        }
      </li>
    )
  }

  renderToggleButton () {
    return (
      <div
        className='Header__toggle-Nav'
        onClick={this.toggleNavigation}
        onMouseEnter={this.openNav}
      >
        <i className={`fas fa-${this.props.isNavOpen ? 'times' : 'bars'}`} />
      </div>
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
          {this.renderToggleButton()}
          <nav className='Header__Nav' onMouseLeave={this.closeNav}>
            {this.renderToggleButton()}
            <ul>
              {this.renderNavItem({ name: 'Pre-Order the Book', slug: '', isExternal: true})}
              {this.renderNavItem({ name: 'Play the Card Game', slug: 'http://bfamfaphd.com/cards/', isExternal: true })}
              {_.map(this.props.navItems, item => this.renderNavItem(item))}
              {this.renderNavItem({ name: 'BFAMFAPHD', slug: 'http://bfamfaphd.com/', isExternal: true })}
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
