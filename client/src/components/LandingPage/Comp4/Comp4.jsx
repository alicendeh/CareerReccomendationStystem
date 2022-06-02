import React from 'react';
import '../../../App.css';
import Color from '../../../assets/Colors';
import AnnimSection from './AnnimSection';
import LastComp from './LastComp';
function Comp4() {
  return (
    <div
      className=" d-flex flex-column align-items-center pb-5 mb-5"
      style={{
        paddingTop: '75px',
      }}
    >
      <p
        className="alignment"
        style={{
          color: Color.headings,
          fontSize: '4.5rem',
          fontWeight: 'bold',
        }}
      >
        Professional careers and their requirements
      </p>
      <div className="callW">
        <p
          className="alignment"
          style={{
            color: Color.secondary,
            lineHeight: 1.5,
            fontSize: 20,
            fontFamily: 'averta_stdregular,Helvetica Neue,Helvetica',
          }}
        >
          Welcome to the largest career recommendation for secondary school
          students in cameroon explore 20+ careers and their content with
          specific requirements
        </p>
      </div>
      <div className=" d-lg-block  d-none">
        <AnnimSection />
      </div>
    </div>
  );
}

export default Comp4;
