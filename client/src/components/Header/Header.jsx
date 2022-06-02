import React from 'react';
import Logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../../src/HelperFunctions/userHelper';
import { logout } from '../../redux/actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Default from '../../assets/defaultUserPic.webp';

function Header({ isAuthenticted, role }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="d-flex align-items-center">
          <Link to={isAuthenticted && role === 'user' ? '/user' : '/admin'}>
            <img src={Logo} width="50px" />
          </Link>
          <MenuItems isAuthenticted={isAuthenticted} role={role} />
        </div>
        <div>
          {isAuthenticted ? (
            <div
              style={{
                flexDirection: 'row',
                margin: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p>
                <span
                  style={{
                    marginRight: 12,
                  }}
                >
                  WELCOME,
                </span>
                <span
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginRight: 21,
                  }}
                >
                  {user && user.name}
                </span>
              </p>
              <div
                className="mr-5"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 25,
                  }}
                  src={user && user.avater ? user.avater : Default}
                  alt="avater"
                />
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <div className="mr-5 d-flex align-items-center ml-5">
                <Link to="/login">
                  <p
                    style={{
                      color: '#0fccce',
                      fontWeight: 'bold',
                    }}
                  >
                    Login
                  </p>
                </Link>
              </div>
              <Link to="/register">
                <button
                  className="btn text-white "
                  style={{
                    backgroundColor: '#0fccce',
                    width: 85,
                    fontSize: 15,
                  }}
                >
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

const MenuItems = ({ isAuthenticted, role }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const signOut = () => {
    console.log('hey');
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      {isAuthenticted && role === 'user' && (
        <>
          <div className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center">
            <Link to="/quiz">
              <p
                className="click"
                style={{
                  color: '#606f7b',
                }}
              >
                Recommend
              </p>
            </Link>
          </div>
          <div className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center">
            <Link to="/profile">
              <p
                className="click"
                style={{
                  color: '#606f7b',
                }}
              >
                Profile
              </p>
            </Link>
          </div>
          <div
            onClick={signOut}
            className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center"
          >
            <p
              className="click"
              style={{
                color: '#606f7b',
              }}
            >
              Logout
            </p>
          </div>
        </>
      )}
      {isAuthenticted && role === 'admin' && (
        <>
          <div className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center">
            <Link to="/createCareer">
              <p
                className="click"
                style={{
                  color: '#606f7b',
                }}
              >
                Careers
              </p>
            </Link>
          </div>
          <div className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center">
            <Link to="/allUsers">
              <p
                className="click"
                style={{
                  color: '#606f7b',
                }}
              >
                Users
              </p>
            </Link>
          </div>
          <div className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center">
            <Link to="/profile">
              <p
                className="click"
                style={{
                  color: '#606f7b',
                }}
              >
                Profile
              </p>
            </Link>
          </div>
          <div
            className="d-flex pr-4 pl-5 pt-4 align-items-center justify-content-center"
            onClick={signOut}
          >
            <p
              className="click"
              style={{
                color: '#606f7b',
              }}
            >
              Logout
            </p>
          </div>
        </>
      )}
    </>
  );
};
