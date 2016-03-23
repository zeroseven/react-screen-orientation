import React, { Component, PropTypes } from 'react'

export class Orientation extends Component {
  render () {
    const { type, children, className } = this.props
    return (
      <div className={`${className} react-orientation react-orientation--${type}`}>
        {children}
      </div>
    )
  }
}

Orientation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['portrait', 'landscape'])
}

Orientation.defaultProps = {
  className: ''
}

const lock = window.screen.lockOrientation ||
  window.screen.mozLockOrientation ||
  window.screen.msLockOrientation ||
  ((orientation) => {
    const { screen } = window
    if (screen.orientation && typeof screen.orientation.lock === 'function') {
      return window.screen.orientation.lock(orientation)
    } else {
      return new Promise((resolve, reject) => reject())
    }
  })

export default class DeviceOrientation extends Component {

  constructor (props) {
    super(props)
    this.lockOrientation(props)
  }

  lockOrientation ({lockOrientation}) {
    if (typeof lockOrientation !== 'string') {
      return
    }
    let onLockOrientation = this.props.onLockOrientation || (() => false)
    return lock(lockOrientation).then(function () {
      onLockOrientation(true)
    }).catch(function () {
      onLockOrientation(false)
    })
  }

  render () {
    const { children, className } = this.props
    return (
      <div className={`${className}`}>
        {children}
      </div>
    )
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/screen/lockOrientation
const LOCK_ORIENTATIONS = [
  'portrait-primary',
  'portrait-secondary',
  'landscape-primary',
  'landscape-secondary',
  'portrait',
  'landscape',
  'default'
]

const isOrientation = (props, propName, componentName, location, propFullName) => {
  const propValue = props[propName]
  if (propValue.type !== Orientation) {
    return new Error(`Invalid ${location} '${propFullName}' supplied to '${componentName}', expected 'Orientation' component.`)
  }
}

DeviceOrientation.propTypes = {
  children: PropTypes.oneOfType([
    isOrientation,
    PropTypes.arrayOf(isOrientation)
  ]).isRequired,
  className: PropTypes.string,
  lockOrientation: PropTypes.oneOfType([
    PropTypes.oneOf(LOCK_ORIENTATIONS),
    PropTypes.arrayOf(PropTypes.oneOf(LOCK_ORIENTATIONS))
  ]),
  onLockOrientation: PropTypes.func
}

DeviceOrientation.defaultProps = {
  className: ''
}
