import React, { useState, useEffect } from 'react';
import {
  Header,
  Card,
  Careerdetails,
  Skeleton as Skeleton,
} from '../../components';
import '../../App.css';
import { _loadUser } from '../../HelperFunctions/userHelper';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/userAction';
import {
  getCareers,
  careerError,
  loading,
  currentlyActiveCarrer,
  quizResponse,
} from '../../redux/actions/careerAction';
import {
  _getAllCareers,
  _getCommentPerCareer,
} from '../../HelperFunctions/CareerHelper';
import CustomModal from '../../components/CustomModal';

function Careers({ isAuthenticted, role }) {
  const dispatch = useDispatch();
  const career = useSelector((state) => state.career);

  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [open, setOpen] = useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });

  useEffect(() => {
    dispatch(loading(true));
    dispatch(quizResponse([]));
    _loadUser().then((res) => {
      dispatch(loadUser(res.data.user));
      _getAllCareers().then((res) => {
        if (res.status === 200) {
          dispatch(getCareers(res.data));
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
    });
  }, []);
  const toggleDrawer = (data) => {
    setShow(true);
    setCurrentItem(data.item);
    _getCommentPerCareer(data.item._id).then((res) => {
      if (res.status === 200) {
        console.log(res.data, 'here');
        dispatch(currentlyActiveCarrer(res.data));
      } else {
        dispatch(careerError(res.data));
      }
    });
  };
  return (
    <div
      style={{
        backgroundColor: '#fff',
        marginBottom: 31,
      }}
    >
      <CustomModal setOpen={setOpen} open={open} />

      <Careerdetails data={currentItem} show={show} setShow={setShow} />

      <div
        style={{
          backgroundColor: '#f5f5f5',
          zIndex: 2,
          width: '100%',
        }}
      >
        <Header role={role} isAuthenticted={isAuthenticted} />
      </div>

      <div className="container">
        <div className="row">
          {career.allCareers ? (
            career.allCareers.map((data) => (
              <div className="col-lg-4 col-md-6 col-sm-6 ">
                {career?.loading ? (
                  <Skeleton />
                ) : (
                  <div
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      openDrawer={() => toggleDrawer(data)}
                      role={role}
                      data={data}
                      isAuthenticted={isAuthenticted}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="row">
              {Arr.map(() => (
                <Skeleton />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Careers;

const colors = [
  'rgba(13, 284, 125, 0.7)',
  'rgba(3, 4, 125, 0.7)',
  'rgba(35, 90, 125, 0.7)',
  'rgba(113, 256, 125, 0.7)',
  'rgba(32, 154, 205, 0.7)',
];

const Arr = [
  1, 2, 3, 4, 44444, 3, 44, 4, 1, 2, 3, 4, 44444, 3, 44, 4, 1, 2, 3, 4, 44444,
  3, 44, 4,
];
