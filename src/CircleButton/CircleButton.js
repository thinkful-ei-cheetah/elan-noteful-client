import React from 'react'
import PropTypes from 'prop-types'
import './CircleButton.css'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props
  console.log(otherProps)
  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

NavCircleButton.PropTypes = {
  tag: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.elementType,
  otherProps: PropTypes.shape({
    role: PropTypes.string,
    onClick: PropTypes.func
  })
}