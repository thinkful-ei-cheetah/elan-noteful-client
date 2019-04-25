import React, { Component } from 'react'
import './NotefulForm.css'

export default class NotefulForm extends Component {
  render() {
    const { className, ...otherProps } = this.props
    return (
      <form 
        className={['Noteful-form', className].join(' ')}
        action='#'
        onSubmit={e => this.props.formSubmit(e)}
        {...otherProps}
      />
    )
  }

}
