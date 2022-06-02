import React from 'react';
import Color from '../assets/Colors';

function Btn(props) {
  return (
    <div onClick={props.onClick}>
      <button
        className={props.className}
        style={{
          backgroundColor: props.bg ? props.bg : Color.main,
          color: 'white',
          fontSize: props.size ? props.size : 17,
          width: props.w,
        }}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Btn;
