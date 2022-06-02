import React, { useState, useEffect } from 'react';
import { Header, CustomModal } from '../components';
import styles from './AllUsers.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetEditCareer, quizResponse } from '../redux/actions/careerAction';
import {} from '../HelperFunctions/CareerHelper';
import { loadUser, errorOccured } from '../redux/actions/userAction';
import {
  _loadUser,
  _getAllUsers,
  _deleteUser,
} from '../HelperFunctions/userHelper';
import moment from 'moment';
import Default from '../assets/defaultUserPic.webp';

function AllUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });

  useEffect(() => {
    _loadUser().then((res) => {
      dispatch(loadUser(res.data.user));
    });
    dispatch(resetEditCareer());
    dispatch(quizResponse([]));

    _getAllUsers().then((res) => {
      if (res.status === 200) {
        setAllUsers(res.data.user);
      } else {
        dispatch(errorOccured(res.data));
      }
    });
  }, []);

  const deleteAcc = (id) => {
    _deleteUser(id).then((res) => {
      if (res.status === 200) {
        _getAllUsers().then((res) => {
          if (res.status === 200) {
            setAllUsers(res.data.user);
            setOpen({
              modalVal: true,
              modalText: 'User deleted successfully',
              modalStatus: 'success',
            });
          } else {
            dispatch(errorOccured(res.data));
            user.error &&
              setOpen({
                modalVal: true,
                modalText: user.error,
                modalStatus: 'failed',
              });
          }
        });
      } else {
        dispatch(errorOccured(res.data));
        user.error &&
          setOpen({
            modalVal: true,
            modalText: user.error,
            modalStatus: 'failed',
          });
      }
    });
  };

  return (
    <div>
      <Header isAuthenticted={true} role="admin" />
      <CustomModal setOpen={setOpen} open={open} />

      <div className="container">
        <p className="h3">All Users</p>
        {allUsers &&
          allUsers.map((data) => (
            <div
              style={{
                overflow: 'unset',
              }}
            >
              <div className={` ${styles.card} shadow  mb-5 bg-white rounded`}>
                <div className={`${styles.colorContainerPremium}`}></div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <span className={styles.dt}>
                    {moment(Number(data.date)).format('MMM Do YYYY')}
                  </span>
                </div>
                <div className={styles.lineContainer}>
                  <div className={styles.line}></div>
                </div>
                <div className={` ${styles.userInfoContainer}`}>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 79,
                      height: 79,
                      borderRadius: 46,
                    }}
                  >
                    <img
                      src={data.avater ? data.avater : Default}
                      style={{
                        width: 53,
                        height: 53,
                        borderRadius: 40,
                      }}
                    />
                  </div>
                  <div className={styles.txtContainer}>
                    {data.name}
                    <br />
                    <span className={styles.email}> {data.email} </span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className={`${styles.pendingContianer}`}>
                    <div className={styles.round}></div>
                  </div>
                </div>
                <div className={` ${styles.imgContainer}`}>
                  <i
                    class="fa-solid fa-trash "
                    onClick={() => deleteAcc(data._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllUsers;
