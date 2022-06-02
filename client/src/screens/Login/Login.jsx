import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import logginLottie from '../../lotties/101236-login.json';
import RBtn from '../../ReusableCompent/Btn';
import Colors from '../../assets/Colors';
import Img from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  errorOccured,
  loading,
  loadUser,
} from '../../redux/actions/userAction';
import { _LoginUser, _loadUser } from '../../HelperFunctions/userHelper';
import { CustomModal } from '../../components';
import '../../App.css';

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: logginLottie,
};
function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector((state) => state.user || {});
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [open, setOpen] = React.useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });

  const { name, email, password } = userInfo;

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      if (user.user !== null && user.user !== undefined) {
        user.user.role === 'user'
          ? navigate('/user')
          : user.user.role === 'admin'
          ? navigate('/admin')
          : navigate('/Login');
      }
    }
  }, [user]);

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    _LoginUser(userInfo).then((res) => {
      if (res.status === 200) {
        dispatch(loginUser(res.data));
        setOpen({
          modalVal: true,
          modalText: 'Login successful',
          modalStatus: 'success',
        });
        _loadUser().then((res) => {
          dispatch(loadUser(res.data.user));
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
    <form
      onSubmit={onsubmit}
      className=" align-items-center justify-content-center d-flex "
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CustomModal setOpen={setOpen} open={open} />

      <div className="container align-items-center justify-content-center d-flex ">
        <div
          className=" d-flex row "
          style={{
            width: '100%',
            height: '70vh',
            borderRadius: 22,
          }}
        >
          <div
            style={{
              backgroundColor: '#0fccce',
            }}
            className=" col-md-6 d-md-block d-none"
          >
            <Lottie width={'70%'} height={650} animationData={logginLottie} />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'red',
              borderTopRightRadius: 22,
              borderBottomRightRadius: 22,
            }}
            className="col-md-6 col-12  bg-white align-items-center justify-content-center d-flex text-secondary"
          >
            <img src={Img} width="50px" />
            <p
              style={{
                fontSize: '3.3rem',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              Hello Again!
            </p>
            <p
              style={{
                textAlign: 'center',
              }}
            >
              Login now and keep enjoying endless features of our platform at
              your convenience
            </p>
            <div
              className="d-flex pl-4 pr-4 align-items-center justify-content-center"
              style={{
                border: '1px solid #ddd',
                width: '70%',
                borderRadius: 7,
                backgroundColor: '#f5f5f5',
              }}
            >
              <input
                onChange={(e) => onChange(e)}
                name="email"
                value={email}
                style={{
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  outline: 'none',
                  padding: 7,
                  flex: 1,
                }}
                type="email"
                required
                placeholder="please enter your email"
              />
              <div className="d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-envelope"></i>
              </div>
            </div>
            <div
              className=" mt-4 d-flex pl-4 pr-4 align-items-center justify-content-center"
              style={{
                border: '1px solid #ddd',
                width: '70%',
                borderRadius: 7,
                backgroundColor: '#f5f5f5',
              }}
            >
              <input
                onChange={(e) => onChange(e)}
                name="password"
                value={password}
                style={{
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  flex: 1,
                  outline: 'none',
                  padding: 7,
                }}
                type="password"
                required
                placeholder="please enter your password"
              />
              <div className="d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-lock"></i>
              </div>
            </div>
            {/* <Link to={user?.user?.role === 'admin' ? '/admin' : '/user'}> */}
            <RBtn size={17} bg={Colors.main} className="p-2 btn mt-4 ">
              {user?.loading ? <div className="spinner"></div> : 'Login'}
            </RBtn>
            {/* </Link> */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
              }}
            >
              <p>
                Dont have an account yet?
                <span className="font-weight-bold">
                  <Link
                    style={{
                      color: Colors.main,
                      fontWeight: 'bold',
                      paddingLeft: 9,
                    }}
                    to="/register"
                  >
                    Register
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
