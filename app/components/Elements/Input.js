import React from 'react';
import './style.scss';

const Input = (props) => (
  <div className='input'>
    <input type={ props.type } name={ props.name } placeholder={ props.placeholder } required autoComplete='false' value={props.value} />
    <label htmlFor={ props.name } >{props.label}</label>
  </div>
)

export default (Input)