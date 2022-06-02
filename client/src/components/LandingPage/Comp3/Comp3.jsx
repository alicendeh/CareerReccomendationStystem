import React from 'react';
import '../../../App.css';
import Color from '../../../assets/Colors';
import Lottie from 'lottie-react';
import animationData from '../../../lotties/Comp3.json';

function Comp3() {
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const data = [
    {
      title: 'PNG',
      size: '50 files',
      options: defaultOptions1,
      borderColor: 'none',
      height: '30vh',
      mt: 40,
    },
    {
      title: 'GIF',
      size: '375 KB',
      options: defaultOptions1,
      borderColor: 'none',
      height: '30vh',
      mt: 40,
    },
    {
      title: 'Lottie',
      size: '56 KB',
      options: defaultOptions1,
      borderColor: 'none',
      height: '35vh',
      color: Color.main,
      p: 26,
    },
  ];
  return (
    <div className="mb-5 pb-5">
      <div className=" mt-5 pt-5 reverse ">
        <div className="col-lg-6 mt-5 col-md-12  row">
          {data.map((dataset) => (
            <div className="col" style={{}}>
              <div
                style={{
                  backgroundColor: 'white',
                  marginTop: dataset.mt && dataset.mt,
                  borderRadius: 12,
                  height: dataset.height ? dataset.height : '70vw',
                  padding: dataset.p && dataset.p,
                  border: dataset.color && '1px solid #0fccce',
                  boxShadow: dataset.color && '1px 1px  #0fccce',
                }}
              >
                <Lottie
                  width={'100%'}
                  height={'100%'}
                  animationData={animationData}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    color: dataset.color ? dataset.color : '#b8c2cc',
                    fontWeight: 'bold',
                  }}
                >
                  {dataset.title}{' '}
                </p>
                <p
                  style={{
                    color: '#b8c2cc',
                  }}
                >
                  {dataset.size}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="col-lg-6   col-md-12 "
          style={{
            position: 'relative',
          }}
        >
          <p
            style={{
              color: '#3d4852',
              fontSize: '3.8rem',
              fontWeight: 'bold',
            }}
          >
            The new career guide
          </p>
          <p
            style={{
              color: '#8795a1',
              lineHeight: 1.9,
              fontSize: 18,
            }}
          >
            Careermines is a free platform aimed at helping high school students
            learn about different careers and take an assestment quiz to get
            different careers that suits their skills,dreams and aspirations.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <p className="click">
              Learn more about Caareermines
              <i className="fas fa-arrow-right mt-3  ml-2  "></i>
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6  "></div>
        <div
          className="col-lg-6 d-flex"
          style={{
            position: 'absolute',
            right: 0,
            marginTop: -100,
          }}
        >
          <div>
            <p
              style={{
                color: Color.main,
                fontWeight: 'bold',

                fontSize: '8rem',
              }}
            >
              600
              <span
                style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                }}
              >
                %
              </span>
            </p>
            <p
              style={{
                color: Color.secondary,
              }}
            >
              smaller when compared to GIF
            </p>
          </div>
          <div className="ml-5">
            <p
              style={{
                color: Color.main,
                fontSize: '8rem',
                fontWeight: 'bold',
              }}
            >
              10
              <span
                style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                }}
              >
                x
              </span>
            </p>
            <p
              style={{
                color: Color.secondary,
              }}
            >
              faster to ship
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comp3;
