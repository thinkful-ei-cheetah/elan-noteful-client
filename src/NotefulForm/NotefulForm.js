import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import './NotefulForm.css';

export default class NotefulForm extends Component {
  render() {
    const { className, onSubmit, ...otherProps } = this.props
    return (
      <form 
        className={['Noteful-form', className].join(' ')}
        onSubmit={e => onSubmit(e)}
        {...otherProps}
      />
    )
  }

}

NotefulForm.propTypes = {
  className: string,
  formSubmit: PropTypes.func
}