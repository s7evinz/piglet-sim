import React, { Component } from 'react';
import classNames from 'classnames';

function Modal(props) {
  const { isActive, content } = props;

  const modalClasses = classNames({
    'modal': true,
    'is-active': isActive
  });
  
  return (
    <div className={modalClasses}>
      <div className="modal-background ps-modal-background"></div>
      <div className="modal-content">
        {content}
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.onClose}></button>
    </div>
  );
}

export default Modal;