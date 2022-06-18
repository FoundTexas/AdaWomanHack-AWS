//Video Info
import React, { useState } from 'react'
import { Box, Chip, Typography, IconButton, Grid, alertTitleClasses } from '@mui/material';
import "./ManagerRecordings.css";
import DeleteIcon from '@mui/icons-material/Delete';
import PlusIcon from '@mui/icons-material/Add';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { ViewCarousel } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Popover from '@mui/material/Popover';
import axios from 'axios';
import * as moment from 'moment';
import LinearProgress from '@mui/material/LinearProgress';


const names = [
  "NULL"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const miPostURL = localStorage.getItem("RSHurlCalls");

export const VideoInfo = (props) => {

const { recordingId, timestamp } = useParams();

const [video, setVideo] = React.useState({});
const [reload, setReload] = React.useState([]);
const [updatedTags, setUpdatedTags] = React.useState([]);
const [s3Video, sets3Video] = React.useState('');
const [loadingState, setLoadingState] = React.useState(true);



React.useEffect(() => {
  setLoadingState(true);
  axios.get(`https://azul-api.ccmchallenges.com/videos/${recordingId}/${timestamp}` ,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => {
    setVideo(response.data[0]);
    setReload(response.data[0].tags);
    setUpdatedTags(response.data[0].tags);
    sets3Video(response.data[1]); 
    setLoadingState(false);
  });

}, [recordingId, timestamp]);

{/*
React.useEffect(() => { 
  setLoadingState(props.loadingStateParent) 
}, [props.loadingStateParent]);
*/}

  //Input share

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
    
    //Form
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  
  const updateTags = () =>{
    setReload(updatedTags);
  }

  
  const [openLogout, setOpenLogout] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
  }

  const handleClickLogout = (Transition) => () => {
    setTransition(() => Transition);
    setOpenLogout(true);
  };

  const [anchorE4, setAnchorE4] = React.useState(null);
  const open4 = Boolean(anchorE4);

  const id4 = open4 ? 'simple-popover' : undefined;

  const handleClick3 = (event) => {
    setAnchorE4(event.currentTarget);
  };
  
  const handleClose3 = () => {
    setAnchorE4(null);
  };


  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>

{ loadingState === true

?
  <Box sx={{ 
    position: 'absolute',
    top: '50%',
    left: '57%',
    marginTop: 0,
    marginLeft: 0,
    width: '30%'
    }}>
    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
  </Box>

:

<Grid container spacing={2} >

  <Grid item xs={5}>

      
    
      <Typography variant="h5" mb={3}>Video information</Typography>
      <Typography variant='button' style={{ display: 'block' }}>Date</Typography>
      <Typography variant='body2' style={{ display: 'block' }} gutterBottom>{moment(parseInt(video.call_timestamp)).format('dddd, MMMM Do, YYYY h:mm:ss A')}</Typography>

      <Typography variant='button' style={{ display: 'block' }}>Agent information</Typography>
      <Typography variant='body2' style={{ display: 'block' }} gutterBottom>{video.agent_name} - <i>{video.employee_id}</i></Typography>

      <Typography variant='button' style={{ display: 'block' }}>Length</Typography>
      <Typography variant='body2' style={{ display: 'block' }} mb={4}>{video.duration}</Typography>

      <Typography variant='button' style={{ display: 'block' }}>User phone</Typography>
      <Typography variant='body2' style={{ display: 'block' }} gutterBottom>{video.user_phone}</Typography>

      <Typography variant='button' style={{ display: 'block' }}>Call reason</Typography>
      <Typography variant='body2' style={{ display: 'block' }} gutterBottom>{video.call_reason}</Typography>

      <Typography variant='button' style={{ display: 'block' }}>Video reference</Typography>
      <Typography variant='body2' style={{ display: 'block' }} mb={4}>{video.video_reference}</Typography>
      
      <br></br>

      <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold' }}>Related Tags</Typography>

      {/*
        <IconButton variant="filled" aria-label="plus" size="large" sx={{bgcolor:'#d1d9ff'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick3}
        >
          <PlusIcon fontSize="inherit" />
        </IconButton>
      */}





            <Popover
                id={id4}
                open={open4}
                anchorEl={anchorE4}
                onClose={handleClose3}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 300, left: 1000 }}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical:'top',
                horizontal: 'right'
                }}
                >

                <Typography variant='h6' sx={{ p: 1, paddingTop: '2%', paddingLeft: "5%"}}>
                  Edit tags
                </Typography>
                                <Autocomplete
                                    
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={names}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    defaultValue = {updatedTags}
                                    onChange={(e, updatedTags) => setUpdatedTags(updatedTags)}
                                    renderOption={(props, option, { selected }) => (
                                      <li {...props}>
                                        <Checkbox
                                          //sx={{backgroundColor: "#9fa8da"}}
                                          icon={icon}
                                          checkedIcon={checkedIcon}
                                          style={{ marginRight: 8 }}
                                          checked={selected}
                                        />
                                        {/* Text in the dropdwon" */}
                                        {option}
                                       {/*<ListItemText primary={option.name} secondary={option.employee_id} sx={{ color: '#6f79a8' }} /> */}
                                      </li>
                                    )}
                                    style={{ width: 500, paddingTop: "1%", paddingLeft: "5%", paddingRight: "5%"}}
                                    renderInput={(params) => (
                                      <TextField {...params} label="Current tags" placeholder="Type tag" />
                                    )}
                                    />


              <Button variant="contained" sx={{marginRight: '5%', marginBottom: '2%', marginTop: '2%'}} onClick={updateTags}>Save</Button>
                                    

              </Popover>



{/*
      <Box sx={{ lineHeight: '45px', marginTop: '10px'}} key={reload}>
        {tags.map(tag => (
          <Box sx={{ display: 'inline'}} mr ={1}>
            {console.log(video)}
            <Chip label={tag} variant="outlined" sx={{backgroundColor:"#edf2fb" }} />
          </Box>   
        ))}
        
      </Box>
        */}
        


<Box sx={{ lineHeight: '45px', marginTop: '10px'}} key={reload}>
        {reload?.map(vid => (         
          <Box sx={{ display: 'inline'}} mr ={1}>
            <Chip label={vid} variant="outlined" sx={{backgroundColor:"#edf2fb" }} />
          </Box>   
        ))}
        
      </Box>

      </Grid>


      <Grid  item xs={7}>

     {/*} <Typography variant='h5' mb={3}>Recording</Typography> */}

      <div className="video-container">
            <iframe src={s3Video} title="Video player" frameborder="3" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

      </Grid>

      
</Grid>

        }

      
      
    </>
  )
}
