import React, { useState } from 'react';
import { Header, CustomModal, Card, Careerdetails } from '../components';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  Slider,
  Box,
  Grid,
  Input,
  Modal,
  TextField,
} from '@mui/material';
import RBtn from '../ReusableCompent/Btn';
import {
  _takeQuiz,
  _getCommentPerCareer,
} from '../HelperFunctions/CareerHelper';
import {
  careerError,
  quizResponse,
  currentlyActiveCarrer,
} from '../redux/actions/careerAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import annim from '../lotties/96526-search-not-found.json';
import Lottie from 'lottie-react';

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: annim,
};

function TakeAQuiz() {
  const dispatch = useDispatch();
  const career = useSelector((state) => state.career);

  const [dataSet, setDataSet] = useState([]);
  const [subjectRate, setSubjectRate] = useState([]);
  const [itemName, setitemName] = React.useState([]);
  const [Loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [open, setOpen] = React.useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);

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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const finalItems = [];
    value.forEach((item) => {
      finalItems.push({ subject: item, percentage: 0 });
    });

    setitemName(value);
    setSubjectRate(finalItems);
  };

  const storeSelection = (e) => {
    if (e.target.value === 'science') {
      setDataSet([...ScienceSet]);
    }
    if (e.target.value === 'arts') {
      setDataSet([...ArtSet]);
    }
    if (e.target.value === 'commercial') {
      setDataSet([...CommercialSet]);
    }
  };

  const [value, setValue] = React.useState(30);

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleSliderChange = (event, index) => {
    setValue(event.target.value);

    const temp = [...subjectRate];
    temp[index].percentage = event.target.value;
    setSubjectRate(temp);
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    _takeQuiz({
      data: [...subjectRate],
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);

        dispatch(quizResponse(res.data));
        setShowResults(true);
      } else {
        setLoading(false);
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
    <form onSubmit={onSubmit}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          zIndex: 2,
          width: '100%',
        }}
      >
        <CustomModal setOpen={setOpen} open={open} />

        <Header isAuthenticted={true} role={'user'} />
      </div>
      <div className="container">
        <p className="h2">Answer the questions below</p>
        <div className="mt-5">
          <div className="mb-5">
            <p className="h5">
              Are you more science arts or commercially oriented ?
            </p>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Career choice
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => storeSelection(e)}
              >
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="arts">Arts</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-4 ">
            <p className="h4">What subjects do you love most ?</p>

            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Subjects</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={itemName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
              >
                {dataSet.map((elem) => (
                  <MenuItem key={elem.title} value={elem.title}>
                    {elem.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              fullWidth
              style={{
                marginTop: 22,
              }}
            >
              <p className="h4 mb-4 pb-4">Rate your love for each subject</p>
              {subjectRate.map((item, index) => (
                <div>
                  <p> {item.subject} </p>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        style={{
                          paddingTop: 22,
                        }}
                        value={item.percentage}
                        onChange={(e) => handleSliderChange(e, index)}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={item.percentage}
                        style={{
                          fontSize: 18,
                        }}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 10,

                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Box>
          </div>

          <FormControl fullWidth>
            <p className="h4">Tell us a little about yourself</p>
            <TextField
              required
              placeholder="About you"
              multiline
              rows={3}
              maxRows={1}
            />
          </FormControl>

          <RBtn size={17} className="p-4 btn mt-4" w={'100%'}>
            {Loading ? (
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <div className="spinner"></div>
              </div>
            ) : (
              <span className="font-weight-bold">Submit</span>
            )}
          </RBtn>
        </div>

        {career.quizResults.careerData && (
          <div>
            {career.quizResults.careerData.length < 1 ? (
              <div>
                <Lottie width={'70%'} height={650} animationData={annim} />
                <p
                  className="h2"
                  style={{
                    fontWeight: 'bold',
                    marginTop: 21,
                    marginBottom: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  Oops sorry we couldn't find anything.
                </p>
              </div>
            ) : (
              <div>
                <Careerdetails
                  data={currentItem}
                  show={show}
                  setShow={setShow}
                />

                <p
                  className="h2"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Search results
                </p>
                <p className="h4">We found this based on your search results</p>

                <div className="row">
                  {career.quizResults.careerData &&
                    career.quizResults.careerData.map((elem, index) => (
                      <div className="col-lg-4 col-md-6 col-sm-6 " key={index}>
                        <Card
                          openDrawer={() => toggleDrawer(elem)}
                          role={'user'}
                          data={elem}
                          isAuthenticted={'true'}
                        />
                      </div>
                    ))}
                </div>
                <Link to="/user">
                  <div
                    style={{
                      marginTop: 22,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 45,
                    }}
                    className="btn btn-danger"
                  >
                    <p className="text-white">View more careers</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default TakeAQuiz;

const ScienceSet = [
  {
    title: 'Mathematics',
  },
  {
    title: 'Chemistry',
  },
  {
    title: 'Physics',
  },
  {
    title: 'Computer Science',
  },
  {
    title: 'Biology',
  },
  {
    title: 'Oraganic',
  },
  {
    title: 'GEOLOGY',
  },
  {
    title: 'Further Mathematics',
  },
  {
    title: 'ICT',
  },
  {
    title: 'Logic',
  },
  {
    title: 'Human biology',
  },
  {
    title: 'Additional maths',
  },
];

const ArtSet = [
  {
    title: 'History',
  },
  {
    title: 'Geography',
  },
  {
    title: 'Economics',
  },
  {
    title: 'Litterature',
  },
  {
    title: 'History',
  },
  {
    title: 'Geography',
  },
  {
    title: 'French',
  },
  {
    title: 'Economics',
  },
  {
    title: 'Pure Mathematics Statistics',
  },
  {
    title: 'Pure Mathematics Mechanics',
  },
  {
    title: 'Philosophy',
  },
  {
    title: 'Citizenship',
  },
  {
    title: 'ICT',
  },
  {
    title: 'Computer science',
  },
  {
    title: 'Religious studies',
  },
  {
    title: 'Commerce',
  },
  {
    title: 'Food and nutrition',
  },
  {
    title: 'Painting',
  },
  {
    title: 'Hair stylist',
  },
];

const CommercialSet = [
  {
    title: 'Marketing',
  },
  {
    title: 'Management',
  },
  {
    title: 'Business Mathematics',
  },
  {
    title: 'Accounting',
  },
  {
    title: 'Home Economics',
  },
  {
    title: 'Marketing',
  },
  {
    title: 'Secretariat admin and communication',
  },
  {
    title: 'Manufacturing mechanics',
  },
  {
    title: 'Taxation and information management system',
  },
];
