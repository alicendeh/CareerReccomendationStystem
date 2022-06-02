import React, { useState } from 'react';
import Default from '../assets/defaultUserPic.webp';
import Color from '../assets/Colors';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Cross from '../assets/cross.png';
import {
  _newComment,
  _getAllCareers,
  _getCommentPerCareer,
} from '../HelperFunctions/CareerHelper';
import {
  careerError,
  currentlyActiveCarrer,
  loading,
  getCareers,
} from '../redux/actions/careerAction';
import '../App.css';

function Comments({ data }) {
  const dispatch = useDispatch();
  const career = useSelector((state) => state.career);
  const [body, setbody] = useState('');
  const onChange = (e) => {
    setbody(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    _newComment(data._id, body).then((res) => {
      if (res.status === 200) {
        _getCommentPerCareer(data._id).then((res) => {
          if (res.status === 200) {
            dispatch(currentlyActiveCarrer(res.data));
          } else {
            dispatch(careerError(res.data));
          }
        });
        _getAllCareers().then((res) => {
          if (res.status === 200) {
            dispatch(getCareers(res.data));
          } else {
          }
        });
      } else {
        dispatch(careerError(res.data));
      }
    });
  };
  return (
    <div
      className="cmmt"
      style={{
        margin: 12,
      }}
    >
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <textarea
            required
            type="text"
            onChange={(e) => onChange(e)}
            placeholder="Leave your message..."
            style={{
              width: '95%',
              height: 80,
              border: '1px solid #ddd',
            }}
          />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-dark text-white "
              style={{
                marginRight: 27,
              }}
            >
              {career?.loading ? <div className="spinner" /> : 'Send'}
            </button>
          </div>
        </form>

        {career.error && career.error !== null ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                marginTop: 12,
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                }}
                src={Cross}
              />
            </div>
            <h4 id="modal-modal-description" sx={{ mt: 2 }}>
              {career.error}
            </h4>
          </div>
        ) : (
          <div>
            {career.currentCarrent &&
              career.currentCarrent.cmmts.map((elem, index) => (
                <div
                  key={index}
                  className=" mt-4 mr-4 "
                  style={{
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <div className=" row">
                    <div className="col-2">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 46,
                          backgroundColor: '#00A792',
                        }}
                      >
                        <img
                          src={
                            elem.user && elem.user.avater
                              ? elem.user.avater
                              : Default
                          }
                          style={{
                            width: 53,
                            height: 53,
                            borderRadius: 40,
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <p className="h4 font-weight-bold">
                          {elem.user && elem.user.name}
                        </p>
                        <div>
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 8,
                              backgroundColor: Color.main,
                              marginLeft: 12,
                            }}
                          />
                        </div>
                        <p
                          style={{
                            color: Color.main,
                          }}
                          className="h6 ml-2"
                        >
                          {moment(Number(elem.date)).format('MMM Do YYYY')}
                        </p>
                      </div>
                      <div>
                        <p>{elem.body} </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
