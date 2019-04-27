import React from 'react'
import PropTypes from 'prop-types'
import './CircleButton.css'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props
  return React.createElement(
    tag,
    {
      className: ['NavCircleButton', className].join(' '),
      ...otherProps
    },
    children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

NavCircleButton.propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  className: PropTypes.string,
  otherProps: PropTypes.shape({
    role: PropTypes.string,
    onClick: PropTypes.func
  })
}