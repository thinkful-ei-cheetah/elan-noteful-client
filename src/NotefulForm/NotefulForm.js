import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import './NotefulForm.css';

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

NotefulForm.propTypes = {
  className: string,
  formSubmit: PropTypes.func
}