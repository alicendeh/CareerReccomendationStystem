import React, { useState, useEffect } from 'react';
import { Header, CustomModal } from '../components';
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
  TextField,
} from '@mui/material';
import RBtn from '../ReusableCompent/Btn';
import { careerError } from '../redux/actions/careerAction';
import { _createCareer, _editCareer } from '../HelperFunctions/CareerHelper';
import { useDispatch, useSelector } from 'react-redux';
import Engi from '../assets/engi.jpeg';

function CreateCareer() {
  const dispatch = useDispatch();
  const career = useSelector((state) => state.career);

  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [itemName, setitemName] = useState([]);
  const [value, setValue] = React.useState(30);
  const [subjectRate, setSubjectRate] = useState([]);
  const [careerFields, setcareerFields] = useState({
    title: '',
    description: '',
  });
  const { title, description } = careerFields;
  const [domain, setDomain] = useState('');
  const [open, setOpen] = React.useState({
    modalVal: false,
    modalText: '',
    modalStatus: '',
  });
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [imgURI, setImgURI] = useState('');

  useEffect(() => {
    if (career.editableCareer.hasOwnProperty('domain')) {
      setIsOnEditMode(true);
      setcareerFields({
        description: career.editableCareer.description,
        title: career.editableCareer.title,
      });
      setDomain(career.editableCareer.domain);
      let temp = [...career.editableCareer.requirements];
      let newArr = [];
      temp.map((item) =>
        newArr.push({ subject: item.subject, percentage: item.percentage })
      );
      setSubjectRate([...newArr]);
      console.log(career.editableCareer);
      setImgURI(career.editableCareer.picture);
    } else {
      setIsOnEditMode(false);
    }
  }, [career.editableCareer]);

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
      setDomain('Science');
    }
    if (e.target.value === 'arts') {
      setDataSet([...ArtSet]);
      setDomain('Arts');
    }
    if (e.target.value === 'commercial') {
      setDataSet([...CommercialSet]);
      setDomain('Commercial');
    }
  };

  const onChange = (e) => {
    setcareerFields({ ...careerFields, [e.target.name]: e.target.value });
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

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (isOnEditMode) {
      let req = [...subjectRate];
      const dataToSend = new FormData();
      dataToSend.append('image', selectedImage);
      dataToSend.append('title', careerFields.title);
      dataToSend.append('description', careerFields.description);
      dataToSend.append('domain', domain);
      req.forEach((data, index) => {
        dataToSend.append(`requirements[${index}].subject`, data.subject);
        dataToSend.append(`requirements[${index}].percentage`, data.percentage);
      });
      // dataToSend.append('requirements', JSON.stringify(req));

      _editCareer(dataToSend, career.editableCareer._id).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setDomain('');
          setSubjectRate([{}]);
          setcareerFields({
            title: '',
            description: '',
          });

          setOpen({
            modalVal: true,
            modalText: 'Data updated successfully',
            modalStatus: 'success',
          });
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
    } else {
      _createCareer({
        title: careerFields.title,
        description: careerFields.description,
        domain: domain,
        requirements: [...subjectRate],
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setDomain('');
          setSubjectRate([{}]);
          setcareerFields({
            title: '',
            description: '',
          });

          setOpen({
            modalVal: true,
            modalText: 'Career created successfully',
            modalStatus: 'success',
          });
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
    }
  };

  const handleImageChange = (e) => {
    let image = e.target.files[0];
    setSelectedImage(image);
  };

  return (
    <div>
      <Header isAuthenticted role={'admin'} />
      <CustomModal setOpen={setOpen} open={open} />

      <div className="container">
        <p className="h2 mt-5">
          {isOnEditMode ? ' Edit Career' : 'Post Career'}
        </p>
        <form onSubmit={onSubmit}>
          {isOnEditMode && (
            <div className="d-flex mb-5">
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
                  }}
                  for="img"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : imgURI
                      ? imgURI
                      : Engi
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
          )}

          <div class="form-group">
            <label for="exampleInputEmail1">Career name</label>
            <input
              type="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter career name"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mb-5">
            <FormControl fullWidth>
              <p className="h5">Describe this career</p>
              <TextField
                style={{
                  fontSize: 14,
                }}
                placeholder="About career"
                multiline
                rows={3}
                // maxRows={1}
                value={description}
                name="description"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </div>
          <div className="mb-5">
            <p className="h5">Career choice?</p>

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
            <p className="h5">What subjects are required for this career ?</p>

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
              <p className="h4 mb-4 pb-4">Passion per subject</p>
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

          <div
            style={{
              marginBottom: 28,

              width: '100%',
            }}
          >
            <RBtn size={17} className="p-4 btn mt-4" w={'100%'}>
              {loading ? (
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
                <span className="font-weight-bold">
                  {isOnEditMode ? ' Edit' : 'Submit'}
                </span>
              )}
            </RBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCareer;

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
