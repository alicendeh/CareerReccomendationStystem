import React from 'react';
import Color from '../../../assets/Colors';
import Comp5middle from './Comp5middle';

function Comp5() {
  return (
    <div className=" d-flex flex-column align-items-center mt-5 pt-5">
      <p
        className="alignment"
        style={{
          color: Color.headings,
          fontSize: '4.5rem',
          fontWeight: 'bold',
        }}
      >
        Create, edit, and ship in a few clicks
      </p>
      <div className="callW ">
        <p
          className="alignment "
          style={{
            color: Color.secondary,
            lineHeight: 1.5,
            fontSize: 20,
            fontFamily: 'averta_stdregular,Helvetica Neue,Helvetica',
          }}
        >
          We have developed simple tools and integrations that require almost no
          learning curve and make shipping a Lottie fast and seamless.
        </p>
      </div>
      <div className=" d-lg-block  d-none">
        <Comp5middle />
      </div>
    </div>
  );
}

export default Comp5;
