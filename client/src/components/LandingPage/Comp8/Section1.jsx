import React from 'react';
import Color from '../../../assets/Colors';
import RBtn from '../../../ReusableCompent/Btn';
import Lottie from 'lottie-react';
import data from '../../../lotties/Fotter.json';
function Section1() {
  return (
    <div className="">
      <div className="d-flex flex-column-reverse flex-md-row  mt-5">
        <div className="general">
          <p
            className="mt-3 mb-4"
            style={{
              color: Color.secondary,
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            Explore now and thank us later
          </p>
          <div>
            <p
              className="mt-3 mb-5 "
              style={{
                color: Color.headings,
                fontWeight: 'bold',
                fontSize: '3.8rem',
              }}
            >
              Push your career game to the next level.
            </p>
          </div>
          <RBtn size={17} className="p-4 btn " w={300}>
            <span className="font-weight-bold">Go to career section</span>
            <span>
              <i className="fas fa-arrow-right ml-2 "></i>
            </span>
          </RBtn>
        </div>
        <div className="">
          <Lottie width={'120%'} height={'250px'} animationData={data} />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Section1;
