import React, { useState, useEffect } from 'react';
import S1 from '../assets/social_discord_2.svg';
import Engi from '../assets/engi.jpeg';
import moment from 'moment';
import LinesEllipsis from 'react-lines-ellipsis';
import {
  _likeItem,
  _getAllCareers,
  _bookmarkItem,
  _deleteItem,
} from '../HelperFunctions/CareerHelper';
import {
  getCareers,
  careerError,
  editCareer,
} from '../redux/actions/careerAction';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';

function Card({ role, data, openDrawer, from }) {
  let navigate = useNavigate();

  const [bookmarkArray, setBookmarkArray] = useState([]);

  const { _id, title, date, picture, requirements, likes, description } =
    data.item || data;

  const career = useSelector((state) => state.career);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });

  const deleteItem = () => {
    _deleteItem(_id).then((res) => {
      if (res.status === 200) {
        _getAllCareers().then((res) => {
          if (res.status === 200) {
            dispatch(getCareers(res.data));
            setOpen({
              modalVal: true,
              modalText: 'Item deleted successfully',
              modalStatus: 'success',
            });
          } else {
            dispatch(careerError(res.data));
            career.error &&
              setOpen({
                modalVal: true,
                modalText: career.error,
                modalStatus: 'failed',
              });
          }
        });
      } else {
        dispatch(careerError(res.data));
        career.error &&
          setOpen({
            modalVal: true,
            modalText: career.error,
            modalStatus: 'failed',
          });
      }
    });
  };

  const likeItem = () => {
    _likeItem(_id).then((res) => {
      if (res.status === 200) {
        _getAllCareers().then((res) => {
          if (res.status === 200) {
            dispatch(getCareers(res.data));
            setOpen({
              modalVal: true,
              modalText: 'You liked this!!',
              modalStatus: 'success',
            });
          } else {
            dispatch(careerError(res.data));
            career.error &&
              setOpen({
                modalVal: true,
                modalText: career.error,
                modalStatus: 'failed',
              });
          }
        });
      } else {
        dispatch(careerError(res.data));
        career.error &&
          setOpen({
            modalVal: true,
            modalText: career.error,
            modalStatus: 'failed',
          });
      }
    });
  };

  const editItem = () => {
    console.log(data);
    dispatch(editCareer(data.item));
    navigate('/createCareer', {
      state: {
        data: data,
      },
    });
  };

  const bookmarkItem = () => {
    if (user.user.bookmarks.filter((elem) => elem['_id'] === _id).length > 0) {
      console.log('unbookmarks');
    } else {
      _bookmarkItem(_id).then((res) => {
        if (res.status === 200) {
          setOpen({
            modalVal: true,
            modalText: 'You bookmarked this item!!',
            modalStatus: 'success',
          });
          window.location.reload();
        } else {
          dispatch(careerError(res.data));
          career.error &&
            setOpen({
              modalVal: true,
              modalText: career.error,
              modalStatus: 'failed',
            });
        }
      });
    }
  };

  return (
    <div
      style={{
        width: '85%',
        borderRadius: 12,
        marginTop: 22,

        backgroundColor: '#f5f5f5',
      }}
    >
      <CustomModal setOpen={setOpen} open={open} />

      <div onClick={openDrawer}>
        <div>
          <img
            src={picture ? picture : Engi}
            width="100%"
            height="205px"
            style={{
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}
          />
          <div
            style={{
              marginTop: -20,
              marginRight: 12,
            }}
            className="d-flex justify-content-end text-white"
          >
            <div className="circle bckg justify-content-center mr-4">
              <i
                class="fa-solid fa-heart"
                style={{
                  fontSize: 13,
                }}
              ></i>
              <p
                className="mt-1 ml-2"
                style={{
                  fontSize: 13,
                }}
              >
                {likes}
              </p>
            </div>

            {from !== 'bookmark' && (
              <div className="bckg circle d-flex">
                <div className=" d-flex align-items-center justify-content-center ">
                  <i
                    class="fa-solid fa-message"
                    style={{
                      fontSize: 13,
                    }}
                  ></i>
                </div>
                <div className=" d-flex align-items-center justify-content-center ">
                  <p
                    style={{
                      fontSize: 13,
                    }}
                    className="mt-1 ml-2"
                  >
                    {data.totalComment}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pl-3">
          <p
            style={{
              fontSize: 18,
            }}
            className="font-weight-bold"
          >
            {title}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#aaa',
            }}
            className="font-weight-bold"
          >
            <LinesEllipsis
              text={description}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </p>
          <div className="row pl-3 pr-4 mb-3">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="mr-2 d-flex align-items-center justify-content-center col"
                style={{
                  backgroundColor: 'rgba(3, 84, 125, 0.7)',

                  color: 'rgba(33, 0, 25, 1)',
                  borderRadius: 7,
                  padding: 4,
                  fontSize: 14,
                }}
              >
                <LinesEllipsis
                  text={req.subject}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex pl-3  pr-4  justify-content-between">
        <div
          className="d-flex"
          style={{
            color: '#aaa',
          }}
        >
          <div className="d-flex justify-content-center align-item-center">
            <i
              onClick={role === 'admin' ? editItem : bookmarkItem}
              style={{
                fontSize: 18,
                marginRight: 10,
                color:
                  user.user.bookmarks.filter((elem) => elem['_id'] === _id)
                    .length > 0 && '#0fccce',
              }}
              // className={
              //   role === 'user'
              //     ? 'fa-solid fa-bookmark'
              //     : 'fa-solid fa-pen-clip'
              // }
              className={
                role === 'admin'
                  ? 'fa-solid fa-pen-clip'
                  : 'fa-solid fa-bookmark'
              }
            ></i>

            <i
              onClick={role === 'admin' ? deleteItem : likeItem}
              className={
                role === 'admin' ? 'fa-solid fa-trash' : 'fa-solid fa-heart'
              }
              style={{
                fontSize: 18,
                marginRight: 10,
              }}
            ></i>
          </div>
        </div>
        <div
          style={{
            color: '#aaa',
            fontSize: 14,
          }}
        >
          <p> {moment(Number(date)).format('MMM Do YYYY')}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
