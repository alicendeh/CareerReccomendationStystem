import React from 'react';
import C5a1 from '../../../assets/C5a.json';
import C5b1 from '../../../assets/C5b.json';
import C5c1 from '../../../assets/C5c.json';
import Lottie from 'lottie-react';
import RBtn from '../../../ReusableCompent/Btn';
import Color from '../../../assets/Colors';
import Colors from '../../../assets/Colors';

function Comp5middle() {
  const DataSet = [
    {
      options: C5a1,
      title: 'View all careers and get to like them',
      body: 'All careers for secondary school students with possible ecommendations',
      btnTitle: 'View more',
    },
    {
      options: C5b1,
      title: 'Like careers and bookmark them to view later',
      body: 'Like all these careers and bookmark the once you particularly like',
      btnTitle: 'View more',
    },
    {
      options: C5c1,
      title: 'Comment careers and view view all comments',
      body: 'View all comments on careers and leave your personalize comment for others to view',
      btnTitle: 'View more',
    },
  ];
  return (
    <div>
      <div
        className=" mt-5 pt-5 ml-5 pl-5 items"
        style={{
          display: 'flex',
          borderRadius: 12,
          marginLeft: 15,
        }}
      >
        {DataSet.map((data) => (
          <div
            className="ml-5 col-3 pb-5 item"
            style={{
              backgroundColor: 'teal',
              height: 550,
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              boxShadow: ' 0 5px 20px -5px rgb(0 0 0 / 7%)',
            }}
          >
            <Lottie width={70} height={10} animationData={data.options} />
            <p
              style={{
                color: Colors.heading,
                fontWeight: 'bold',
                fontSize: '21px',
                textAlign: 'center',
              }}
            >
              {data.title}{' '}
            </p>
            <p
              style={{
                color: Colors.secondary,
                textAlign: 'center',
                fontSize: '15px',
              }}
            >
              {data.body}{' '}
            </p>
            <RBtn size={17} bg={Color.headings} className="p-4 btn " w={220}>
              <span className="font-weight-bold">{data.btnTitle} </span>
              <span>
                <i className="fas fa-arrow-right ml-2 "></i>
              </span>
            </RBtn>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comp5middle;
