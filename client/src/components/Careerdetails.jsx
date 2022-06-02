import React from 'react';
import { Drawer } from '@mui/material';
import Engi from '../assets/engi.jpeg';
import { TabBar } from '../components';
import '../App.css';

function Careerdetails({ show, setShow, data }) {
  const { title, date, picture, requirements, likes, description } = data;

  return (
    <>
      <Drawer anchor={'right'} open={show} onClose={show}>
        <div className="drawer">
          <div
            style={{
              backgroundColor: '#f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 12,
            }}
          >
            <i
              onClick={() => setShow(false)}
              class="fa-solid fa-xmark fa-2x"
            ></i>
            <p className="text-center h4">Career details</p>
            <div></div>
          </div>
          <div className="bg-white">
            <div className="bg-white d-flex justify-content-center align-items-center">
              <img
                src={picture ? picture : Engi}
                width="120px"
                height="120px"
                style={{
                  borderRadius: 90,
                }}
              />
            </div>
            <p className="text-center h4">{title}</p>
          </div>
          <div className="bg-white mt-3">
            <p className="h4 ml-3">Required subjects</p>
            <div className="row" style={{}}>
              {requirements &&
                requirements.map((elem) => (
                  <div
                    className="col col-md-3 col-sm-6"
                    style={{
                      margin: 21,

                      // color: 'rgba(3, 84, 125, 1)',
                      // borderRadius: 7,
                      // padding: 4,
                    }}
                  >
                    {elem.subject}
                  </div>
                ))}
            </div>
          </div>
          <TabBar data={data} description={description} />
        </div>
      </Drawer>
    </>
  );
}

export default Careerdetails;
