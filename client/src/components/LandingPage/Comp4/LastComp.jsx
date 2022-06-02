import React from 'react';
import RBtn from '../../../ReusableCompent/Btn';
import Color from '../../../assets/Colors';
function LastComp() {
  return (
    <div className="mt-5">
      <p
        className="alignment"
        style={{
          color: Color.secondary,
          lineHeight: 1.7,
        }}
      >
        All free Lottie animations are under a Creative Commons License, so go
        ahead and use them without hesitation.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RBtn size={17} className="p-4 btn " w={220}>
          <span className="font-weight-bold">Discover Animations</span>
          <span>
            <i className="fas fa-arrow-right ml-2 "></i>
          </span>
        </RBtn>
      </div>
    </div>
  );
}

export default LastComp;
