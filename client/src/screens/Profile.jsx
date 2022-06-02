import React, { useState, useEffect } from 'react';
import { Header, Card, Careerdetails, CustomModal } from '../components';
import BookmarkDefault from '../assets/undraw_noted_re_c5wv.svg';
import { Box, Tabs, Tab, Modal } from '@mui/material';
import Colors from '../assets/Colors';
import Empty from '../assets/undraw_real_time_collaboration_c62i.svg';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, loading, errorOccured } from '../redux/actions/userAction';
import {
  currentlyActiveCarrer,
  careerError,
  resetEditCareer,
  quizResponse,
} from '../redux/actions/careerAction';
import { _loadUser, _editUser } from '../HelperFunctions/userHelper';
import {
  _getCommentPerCareer,
  _getCommentPerUser,
  _deleteComment,
  _UnbookmarkItem,
} from '../HelperFunctions/CareerHelper';
import Default from '../assets/defaultUserPic.webp';
import Color from '../assets/Colors';
import moment from 'moment';
import RBtn from '../ReusableCompent/Btn';

function Profile() {
  const career = useSelector((state) => state.career);
  const user = useSelector((state) => state.user || {});

  const dispatch = useDispatch();

  console.log();
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [open, setOpen] = React.useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });
  const [OpenProfileModal, setOpenProfileModal] = useState(false);
  useEffect(() => {
    dispatch(loading(true));
    dispatch(quizResponse([]));

    _loadUser().then((res) => {
      dispatch(loadUser(res.data.user));
    });
    dispatch(resetEditCareer());
  }, []);

  useEffect(() => {
    if (user && user.user) {
      _getCommentPerUser(user.user._id).then((res) => {
        if (res.status === 200) {
          setMyComments(res.data.cmmts);
        }
      });
    }
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (data) => {
    setShow(true);
    setCurrentItem(data);
    _getCommentPerCareer(data._id).then((res) => {
      if (res.status === 200) {
        dispatch(currentlyActiveCarrer(res.data));
      } else {
        dispatch(careerError(res.data));
      }
    });
  };

  const deleteComment = (id) => {
    _deleteComment(id).then((res) => {
      if (res.status === 200) {
        _getCommentPerUser(user._id).then((res) => {
          if (res.status === 200) {
            setMyComments(res.data.cmmts);
          }
        });
        setOpen({
          modalVal: true,
          modalText: 'Comment deleted successfully',
          modalStatus: 'success',
        });
        _loadUser().then((res) => {
          dispatch(loadUser(res.data.user));
        });
      } else {
        dispatch(careerError(res.data));
        user.error &&
          setOpen({
            modalVal: true,
            modalText: user.error,
            modalStatus: 'failed',
          });
      }
    });
  };

  const removeAllBookmarks = () => {
    _UnbookmarkItem().then((res) => {
      if (res.status === 200) {
        setOpen({
          modalVal: true,
          modalText: 'All your bookmark items were removed!!',
          modalStatus: 'success',
        });
        _loadUser().then((res) => {
          dispatch(loadUser(res.data.user));
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

  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            zIndex: 2,
            width: '100%',
          }}
        >
          <Header
            isAuthenticted={true}
            role={user && user.user && user.user.role}
          />
          <Careerdetails data={currentItem} show={show} setShow={setShow} />
          <CustomModal setOpen={setOpen} open={open} />
        </div>

        <EditModal
          user={user}
          setOpenProfileModal={setOpenProfileModal}
          OpenProfileModal={OpenProfileModal}
          open={open}
          setOpen={setOpen}
        />
        <div className="container">
          <p className="h2">Profile</p>
          <div
            className="mr-5 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#3F3D56',
              padding: 12,
            }}
          >
            <div>
              <div
                className="d-flex justify-content-center align-items-center "
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 140,
                  border: '1px solid white',
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 25,
                    }}
                    src={
                      user && user.user && user.user.avater
                        ? user.user.avater
                        : Default
                    }
                    alt="avater"
                  />
                </div>
              </div>
            </div>
          </div>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{
                width: '100%',
              }}
            >
              <Tab
                style={{
                  width: '50%',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
                label="Personal Details"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  width: '50%',
                }}
                label="Comments"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  width: '50%',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
                label="Bookmarks"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div
              className="d-flex"
              style={{
                borderBottom: '4px solid #f5f5f5',
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i class=" fa-thin fa-solid fa-user"></i>
              </div>
              <div
                style={{
                  marginLeft: 35,
                }}
              >
                <p
                  className="h5"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Name
                </p>
                <p className="h5">{user && user.user && user.user.name}</p>
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                borderBottom: '4px solid #f5f5f5',
                marginTop: 18,
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i class="fa-regular fa-envelope"></i>
              </div>
              <div
                style={{
                  marginLeft: 35,
                }}
              >
                <p
                  className="h5"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Email
                </p>
                <p className="h5">{user && user.user && user.user.email}</p>
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                borderBottom: '4px solid #f5f5f5',
                marginTop: 18,
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-comment"></i>
              </div>

              <div
                style={{
                  marginLeft: 35,
                }}
              >
                <p
                  className="h5"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Your comments
                </p>
                <p className="h5">{myComments && myComments.length} </p>
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                borderBottom: '4px solid #f5f5f5',
                marginTop: 18,
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-bookmark"></i>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    marginLeft: 35,
                  }}
                >
                  <p
                    className="h5"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Your bookmarks
                  </p>
                  <p className="h5">
                    {user &&
                      user.user &&
                      user.user.bookmarks &&
                      user.user.bookmarks.length}{' '}
                  </p>
                </div>
                <p>
                  <i
                    onClick={removeAllBookmarks}
                    className="fa-solid fa-trash text-danger"
                  ></i>
                </p>
              </div>
            </div>
            <div
              onClick={() => setOpenProfileModal(true)}
              className="d-flex"
              style={{
                borderBottom: '4px solid #f5f5f5',
                marginTop: 18,
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-address-card"></i>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    marginLeft: 35,
                  }}
                >
                  <p
                    className="h5"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Click here to edit your profile
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {myComments.length < 1 ? (
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={Empty} width="50%" />
                <div>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: Colors.main,
                    }}
                  >
                    No comment
                  </p>
                </div>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: Colors.main,
                  }}
                  className="h4"
                >
                  All your comments will appear here!!
                </p>
              </div>
            ) : (
              <div>
                {myComments.map((elem, index) => (
                  <div
                    key={index}
                    className=" mt-4 mr-4 row"
                    style={{
                      borderBottom: '1px solid #ddd',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className=" row"
                      style={{
                        flex: 1,
                        display: 'flex',
                        marginLeft: 15,
                      }}
                    >
                      <div className="col-1">
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
                            src={elem.user.avater ? elem.user.avater : Default}
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
                          <p
                            style={{
                              fontSize: 14,
                            }}
                          >
                            {elem.body}{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: 'flex-end',
                      }}
                      onClick={() => deleteComment(elem._id)}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {user &&
            user.user &&
            user.user.bookmarks &&
            user.user.bookmarks.length < 1 ? (
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={BookmarkDefault} width="50%" height="423px" />
                <div>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#3F3D56',
                    }}
                  >
                    No bookmarks
                  </p>
                </div>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#3F3D56',
                  }}
                  className="h4"
                >
                  All your bookmarks will appear here!!
                </p>
              </div>
            ) : (
              <div>
                {user &&
                  user.user &&
                  user.user.bookmarks &&
                  user.user.bookmarks.map((elem, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 " key={index}>
                      <Card
                        openDrawer={() => toggleDrawer(elem)}
                        role={user.role}
                        data={elem}
                        isAuthenticted={'true'}
                        from="bookmark"
                      />
                    </div>
                  ))}
              </div>
            )}
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default Profile;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p className="h3">{children}</p>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// function EditModal({ open, setOpen }) {
//   return (
//     <div>
//       <Modal
//         open={open.modalVal}
//         onClose={() =>
//           setOpen({
//             modalVal: false,
//           })
//         }
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             backgroundColor: 'white',
//             boxShadow: 24,
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         ></Box>
//       </Modal>
//     </div>
//   );
// }

function EditModal({
  setOpenProfileModal,
  OpenProfileModal,
  user,
  open,
  setOpen,
}) {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState();
  const [imgURI, setImgURI] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  const { name, email } = userInfo;

  useEffect(() => {
    if (user && user.user && OpenProfileModal === true) {
      dispatch(loading(false));

      setUserInfo({
        name: user.user.name,
        email: user.user.email,
      });
      setImgURI(user.user.avater);
    }
  }, [OpenProfileModal]);

  const handleImageChange = (e) => {
    let image = e.target.files[0];
    setSelectedImage(image);
  };

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(name, email, selectedImage);
    e.preventDefault();
    dispatch(loading(true));
    const dataToSend = new FormData();
    dataToSend.append('image', selectedImage);
    dataToSend.append('name', name);
    dataToSend.append('email', email);

    _editUser(dataToSend).then((res) => {
      if (res.status === 200) {
        setOpen({
          modalVal: true,
          modalText: 'Data updated successfully',
          modalStatus: 'success',
        });
        _loadUser().then((res) => {
          dispatch(loadUser(res.data.user));
        });
        setOpenProfileModal(false);
      } else {
        dispatch(errorOccured(res.data));
        // user.error &&
        //   setOpen({
        //     modalVal: true,
        //     modalText: user.error,
        //     modalStatus: 'failed',
        //   });
      }
    });
  };

  return (
    <div>
      <Modal
        open={OpenProfileModal}
        onClose={() => setOpenProfileModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            backgroundColor: 'white',
            boxShadow: 24,
            p: 4,
            padding: 31,
          }}
        >
          <form onSubmit={onSubmit}>
            <p
              className="h2"
              style={{
                fontWeight: 'bold',
              }}
            >
              Edit your profile
            </p>
            <div className="d-flex mb-5 mt-5">
              <label for="img">
                <p
                  className="h5"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Tap on the image to change it{' '}
                </p>
                <img
                  style={{
                    height: 225,
                    width: 225,
                    borderRadius: 100,
                  }}
                  for="img"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : imgURI
                      ? imgURI
                      : Default
                  }
                  className="img-fluid rounded border card"
                />
                <input
                  type="file"
                  id="img"
                  name="image"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleImageChange(e)}
                />
              </label>
            </div>

            <div
              className="mb-4 mt-4 d-flex pl-4 pr-4 align-items-center justify-content-center"
              style={{
                border: '1px solid #ddd',
                width: '70%',
                borderRadius: 7,
                backgroundColor: '#f5f5f5',
              }}
            >
              <input
                style={{
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  flex: 1,
                  outline: 'none',
                  padding: 7,
                  padding: 7,
                }}
                type="text"
                required
                placeholder="please enter your name"
                onChange={(e) => onChange(e)}
                name="name"
                value={name}
              />
              <div className="d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-user"></i>
              </div>
            </div>

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
            <RBtn
              w={'70%'}
              size={17}
              bg={Colors.main}
              className="p-2 btn mt-4 "
            >
              {/* Update */}
              {user && user.loading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="spinner"></div>
                </div>
              ) : (
                'Update profile'
              )}
            </RBtn>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
