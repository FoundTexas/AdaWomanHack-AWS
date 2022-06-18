//Manager Recordings 
import React, { useState } from 'react';
import "./ManagerRecordings.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { alpha, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination, Grid, Paper, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';
import { VideoInfo } from './VideoInfo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import Popover from "@mui/material/Popover";
import Autocomplete from '@mui/material/Autocomplete';
import { AccountBalance } from '@mui/icons-material';
import * as moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';

var respons = {};

const top100Films = [
  { title: 'Scam' },
  { title: 'Lost package' },
  { title: 'Unsolved'},
  { title: 'Solved' },
  { title: 'Angry client' },
  { title: "Calm client"},
  { title: 'Complain'},
  {title: 'Fail'}
];

const Item = styled(Paper)(({ theme }) => ({
backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
}));

function AgentRecordings() {

  const [videos, setVideos] = React.useState([]);

  const [loadingState, setLoadingState] = React.useState(true);

  const [resetFilters, setResetFilters] = React.useState(true);

  const [QUESTIONS, setQUESTIONS] = React.useState([]);
  const [allAnswers, setAllAnswers] = React.useState([]);

  
  //Get videos (Obtains all the videos that the employee have access).
  React.useEffect(() => {
    //alert("Initial State")
    axios.get('https://azul-api.ccmchallenges.com/videos',
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      setVideos(response.data[0]);

      var trimedData = response.data[1].trim();
      var JSONdata = JSON.parse(trimedData);

       if(QUESTIONS.length < 1) {
          setQUESTIONS(JSON.parse(JSONdata.survey));
       }

      QUESTIONS.map((item) => (
              item.Answers?.map((data) => {
                  console.log(data);
                  setAllAnswers(prevAnswers => [...prevAnswers, data]);
            })
          ))
          
          setLoadingState(false);
    });
  }, [QUESTIONS]);

const [loadingData, setLoadingData] = React.useState(true);
const [refreshData, setRefreshData] = React.useState(false);

const [resetTags, setResetTags] = React.useState([]);

const getAllVideos = async ()=>{

   const response = await axios.get(`https://azul-api.ccmchallenges.com/videos`,
     {
       headers: {
         Authorization: 'Bearer ' + localStorage.getItem("token")
       }
     })

     setVideos(response.data[0]);

     setLoadingState(false);
     setResetFilters(true);
     setTags([]);
     setDates({startDate: null, endDate: null})
     respons = {};
}



const getVideos = async ()=>{
    const response = await axios.post(`https://azul-api.ccmchallenges.com/videos`, respons,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })

      {/*
      let sortedAgents = response.data.sort(function (a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    */}
      setVideos(response.data);
      setLoadingState(false);
      respons = {};
}
  
const [value, setValue] = React.useState(null);

var globalVariableVideo = '';

const { recordingId } = useParams();
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setAnchorEl(null);
};
//Input share
const [age, setAge] = React.useState('');
const handleChange = (event) => {
setAge(event.target.value);
};
const [list, setList] = useState("");

const [calendarS, setCalendarS] = React.useState(null);

const open1 = Boolean(calendarS);

  const id = open ? "simple-popover" : undefined;
  const calendar = open1 ? "simple-popover" : undefined;


const handleClick1 = (event) => {
  setCalendarS(event.currentTarget);
};
const handleClose1 = () => {
  setCalendarS(null);
};
const handleCloseCalendar = () =>{
  console.log(dates.startDate.toISOString().split('T')[0]);
  console.log(dates.endDate.toISOString().split('T')[0]);
}



//CALENDAR
const [dates, setDates] = React.useState("");
 
const handleChangeDates = (event) => {
  setState([event.selection])
  setDates({startDate: event.selection.startDate, endDate: event.selection.endDate}) 
};

  
const handleSearch = () =>{
    setResetFilters(false);
    if(tags.length){
      respons.tags=tags
      /*setRespons({
        ...respons,
        tags: ['answer1', 'answer2']
      })
      */
    }
    if(dates && dates.startDate){
      respons.from=moment.utc(moment(dates.startDate.toISOString().split('T')[0]+" 00:00:00")).format()
      /*setRespons({
        ...respons,
        from: dates.startDate.toISOString().split('T')[0]
      })
      */
    }
    if(dates && dates.endDate){
      respons.to=moment.utc(moment(dates.endDate.toISOString().split('T')[0]+" 23:59:59")).format()
      /*setRespons({
        ...respons,
        to: dates.endDate.toISOString().split('T')[0]
      })*/
    }
   // setRefreshData(!refreshData);
    getVideos();
}

    //console.log({Tags:tags, From:dates.startDate.toISOString().split('T')[0],To:dates.endDate.toISOString().split('T')[0]});
    //console.log({To:dates.endDate.toISOString().split('T')[0]});
//CALENDAR
  
const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection'
  }
]);

//TAGS
const [tags,setTags]=React.useState([]);
function handleTags(value){
  setTags(value)
}

return (

  <div>

  { loadingState === true

    ?
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '55%',
        marginTop: 0,
        marginLeft: 0,
        width: '100px',
        height: '100px'
        }}>
        <CircularProgress />
      </Box>
  
    :

  <Grid container spacing={2}>


  <Grid item xs={recordingId !== undefined ? 4 : 12}>

  <Stack spacing={10} direction="row" sx={{widht: 360}}>
    <Typography variant="h5" gutterBottom>
    Videos library
    </Typography>

    <Button variant='text' sx={{float: 'left', color: 'red', borderColor: 'red'}} onClick={() => {getAllVideos()}} endIcon={<CachedIcon />} disabled={resetFilters}>Reset Filters</Button>
    <br></br>
    </Stack>

    <br></br>

    
    
    {/*
    <Stack spacing={3} direction="row">
    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
    <SearchIcon sx={{ color: 'action.active', mr: 1.2, my: 0.5, }} />
    <TextField id="input-with-sx" label="Search video" variant="standard" onChange={(event) => {
    setList(event.target.value);
    }}/>
    </Box>
  */}

  
     
    
    <Stack spacing={3} direction="row" sx={{widht: 100}}>
          
        <Box sx={{ widht: 100, height:1, display: "flex", alignItems: "flex-end" }}>

<Autocomplete
  value = {tags}
  onChange={(event, value) => handleTags(value)}
  multiple
  id="tags-standard"
  options={allAnswers}
  sx={{ minWidth: 360, width: '100%' }}
  getOptionLabel={(option) => option}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      label="Tags"
      placeholder="Filter tags"
    />
  )}
/>
</Box>
{/********************************************************** */}
        </Stack>

          <Stack spacing={4} sx={{ width: 450 }}>
          
          
          <Box sx={{ marginTop:"6%", display: "flex", alignItems: "flex-end" }}>

          <Stack spacing={3} direction="row" sx={{ width: 360, height: 40 }}>

          <Button
            aria-describedby={calendar}
            variant="contained"
            onClick={handleClick1}
            size="small"
            sx={{width:240}}
          >
            Filter by dates
          </Button>
         
          <Button sx={{float: "left", width:95, backgroundColor:"#6f79a8"}} size="small" variant="contained" onClick={handleSearch} endIcon={<SendIcon size='small'/>}>Search</Button>
          
          </Stack>
          
          

          <Popover
            id={calendar}
            open={open1}
            calendarS={calendarS}
            onClose={handleClose1}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 150, left: 900 }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            
           <DateRange
            editableDateInputs={true}
            onChange={e => handleChangeDates(e)}
            moveRangeOnFirstSelection={true}
            ranges={state}
            dateDisplayFormat={"yyyy-MM-dd"}
            retainEndDateOnFirstSelection ={false}
            maxDate={new Date()}
            //onChange={item => ([item.selection])}
          />
          <br></br>
          </Popover>
          </Box>
    </Stack>

   

    {dates?.startDate ?
          <Typography sx={{color : '#6f79a8', marginTop: '1.5%'}}>Filtering from <b>{dates.startDate.toISOString().split('T')[0]}</b> to <b>{dates.endDate.toISOString().split('T')[0]}</b></Typography>
            :
          <Typography sx={{color: 'lightgray', marginTop: '1.5%'}}>No date filters selected</Typography>
          }


       <br></br>
    
  
  
    
    <List sx={{width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {videos?.filter((item) => {
      if(list == ""){
      return item;
      }else if(item.call_reason.toLocaleLowerCase().startsWith(list.toLocaleLowerCase())){
      return item;
      }
      }).map(video => {
      return(
      <div style={{borderBottom:"1px solid lightgrey"}}>
        <Stack spacing={2} direction="row">
        <ListItem >
          
          <ListItemAvatar>
            <Avatar>
              <VideoFileIcon />
              </Avatar>
            </ListItemAvatar>

            
            <Link to={`/manager/recordings/${video.employee_id}/${video.call_timestamp}`} style={{ textDecoration: 'none' }}>
            
            <ListItemText primary={`${video.agent_name} - ${video.call_reason}`} secondary={moment(parseInt(video.call_timestamp)).format('dddd, MMMM Do, YYYY h:mm:ss A')} sx={{color:'#6f79a8'}} />
            
            </Link>

            
            
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem style={{ backgroundColor: 'transparent' }} >
            <Typography variant="h6" gutterBottom>
            Share
            </Typography>
            </MenuItem>
            
            <MenuItem style={{ backgroundColor: 'transparent' }}>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Employee"
                onChange={handleChange}
                >
                <MenuItem value={"Account"}>Group Account</MenuItem>
                <MenuItem value={"Shipping"}>Group Shipping</MenuItem>
                <MenuItem value={"Payment"}>Group Payment</MenuItem>

              </Select>
            </FormControl>
            </Box>
            </MenuItem>
            <br></br>
            <MenuItem style={{ backgroundColor: 'transparent' }} >
            <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleClose}> Cancel </Button>
            <Button variant="contained">Share</Button>
            </Stack>
            </MenuItem>
            </Menu>
            
            
          </ListItem>

          
          {/* ****************************************************** 
          <Button id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          
          <MoreVertIcon />
          </Button>
          */}
          



          </Stack>
          
        </div>
        )
        })
        }
      </List>

      </Grid>
      
      
      {recordingId !== undefined && (
        <>
          <Grid item xs={8}>
            <VideoInfo loadingStateParent={true} />
          </Grid>
         {/*
          <Grid item xs={4}>
          <div className="video-container">
            {/*<iframe src="https://www.youtube.com/embed/Fml-LvtMM90" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/tWVWeAqZ0WU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            
          </Grid>
          
      */}

      
        </>
         
      )}
      
      
      
    </Grid>

  }
  </div>
  );
}
export default AgentRecordings;
