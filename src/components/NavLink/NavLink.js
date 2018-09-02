import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { updateIsNavOpen } from 'modules/navigation'

const mapDispatchToProps = {
  updateIsNavOpen: value => updateIsNavOpen(value)
}

const mapStateToProps = (state) => {
  return {}
}

export class NavLink extends React.Component {
  render () {
    return (
      <li className='sublist__item'>
        <a>
          {this.props.name}
        </a>
      </li>
    )
  }
}
NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  updateIsNavOpen: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLink)
