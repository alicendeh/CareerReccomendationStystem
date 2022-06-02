import React from 'react';
import Color from '../../../assets/Colors';
import RBtn from '../../../ReusableCompent/Btn';
import '../../../App.css';
import Lottie from 'lottie-react';
import animationData from '../../../lotties/landingPageAnnim.json';
import { Link } from 'react-router-dom';

function Comp2() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };
  return (
    <div
      className="mt-5 ml-4 row "
      style={{
        paddingTop: '20px',
      }}
    >
      <div className="col-md-6 col-sm-12 row general">
        <p
          style={{
            fontWeight: 'bold',
            fontSize: 'calc(100% + 1.5vw + 1vh)',
          }}
        >
          All, careers avialable
          <span
            className="pl-4"
            style={{
              color: '#8795a1',
            }}
          >
            in your hands!!
          </span>
        </p>
        <p
          className="row col-12 general"
          style={{
            color: '#8795a1',
            width: '76%',
            fontSize: 'calc(100% + 0vw + 0.3vh)',

            // backgroundColor: "red",
          }}
        >
          Careermines provides you with plenty varieties of careers. No need to
          stress anymore explore and enjoy
        </p>
        <div
          className=" general"
          style={{
            width: '100%',
          }}
        >
          <Link to="/register">
            <RBtn size={17} className="p-4 btn " w={220}>
              <span className="font-weight-bold">Sign up</span> for free{' '}
              <span>
                <i className="fas fa-arrow-right ml-2 "></i>
              </span>
            </RBtn>
          </Link>
        </div>
      </div>
      <div className=" col-md-6 col-sm-12  ">
        <Lottie width={'110%'} height={'90%'} animationData={animationData} />
      </div>
    </div>
  );
}

export default Comp2;
