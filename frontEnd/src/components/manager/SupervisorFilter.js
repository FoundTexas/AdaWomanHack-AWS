//Supervisor Filter
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Pagination, Grid, Paper, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';
import { VideoInfo } from './VideoInfo';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import validator from 'validator';
import CircularProgress from '@mui/material/CircularProgress';

export default function SupervisorFilter() {

var globalVariable = null;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const [openLogout, setOpenLogout] = React.useState(false);
const [openLogoutEdit, setOpenLogoutEdit] = React.useState(false);
const [openLogoutDelete, setOpenLogoutDelete] = React.useState(false);
const [openLogoutAssign, setOpenLogoutAssign] = React.useState(false);

const [supervisors, setSupervisors] = React.useState([]);
const [agents, setAgents] = React.useState([]);

const [employeeID, setEmployeeID] = React.useState(null);

const [post, setPost] = React.useState(null);

const [userName, setUserName] = useState('');
const [userPassword, setUserPassword] = useState('');
const [userPasswordVerify, setUserPasswordVerify] = useState('');
const [userEmail, setUserEmail] = useState('');
const [newSupervisor, setNewSupervisor] = React.useState(null);

const [loadingState, setLoadingState] = React.useState(true);

const [loadingData, setLoadingData] = React.useState(true);
const [refreshData, setRefreshData] = React.useState(false);

const getSupervisor = async ()=>{
  const response = await axios.post('https://azul-api.ccmchallenges.com/employees', {
        role: "Supervisor"
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    })

    let sortedSupervisor = response.data.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    setSupervisors(sortedSupervisor);
    //console.log(response.data);
    setLoadingData(false);
    setLoadingState(false);

    setOpenLogout(false);
}


React.useEffect(()=>{
  getSupervisor();
 },[refreshData])

React.useEffect(() => {
  axios.post('https://azul-api.ccmchallenges.com/employees', {
      role: "Agent"
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      let sortedAgents = response.data.sort(function (a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

      if(agents.length < 1) {
          setAgents(sortedAgents);
      }
    });
}, [agents]);

function createSupervisor() {
  axios.post('https://azul-api.ccmchallenges.com/employees/add', {
      role: 'Supervisor',
      name: userName,
      email: userEmail,
      password: userPassword
  },
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseAdd() });
}

function deleteSupervisor() {
  axios.delete(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then(() => { 
      setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseDelete()
   });
}

function refre(){
  window.location.reload();
}

function evalPassword(){
  if(userPassword.length  === 0)
    editSupervisorNewPassword();
  else
    editSupervisor();
}

function editSupervisor() {
  axios.put(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`, {
      role: employeeID.role,
      employee_id: employeeID.employee_id,
      name: userName.length > 1 ? userName : employeeID.name,
      email: userEmail.length > 1 ? userEmail : employeeID.email,
      password: userPassword,
  },
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseEdit() });
}

function editSupervisorNewPassword() {
  axios.put(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`, {
      role: employeeID.role,
      employee_id: employeeID.employee_id,
      name: userName.length > 1 ? userName : employeeID.name,
      email: userEmail.length > 1 ? userEmail : employeeID.email,
      password: employeeID.password,
  },
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseEdit() });
}


const { recordingId } = useParams();
const [anchorEl, setAnchorEl] = React.useState(null);
const [anchorE2, setAnchorE2] = React.useState(null);
const [anchorE3, setAnchorE3] = React.useState(null);
const [anchorE4, setAnchorE4] = React.useState(null);
const [open5, setOpen] = React.useState(false);
const open = Boolean(anchorEl);
const open2 = Boolean(anchorE2);
const open3 = Boolean(anchorE3);
const open4 = Boolean(anchorE4);
const [saveSettings, setSaveSettings] = React.useState(false);

function sendData(){
  setSaveSettings(true);
  setTimeout(() => setSaveSettings(false), 3000);
}


const [transition, setTransition] = React.useState(undefined);
function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}
const handleClickLogout = (Transition) => () => {
    setTransition(() => Transition);
    setOpenLogout(true);
};

const handleCloseAdd = () =>{
  setAnchorE2(false);
  setAnchorEl(false);
  setUserPassword('');
  setUserPasswordVerify('');
  setUserEmail('');
}

const handleBlockAdd = () =>{
  setBtnDisable(true);
}

const handleCloseEdit = () =>{
  setAnchorE3(false);
  setAnchorEl(false);
}

const handleCloseDelete = () =>{
  setOpen(false);
  setAnchorEl(false);
}

const handleCloseLogout = () => {
    setOpenLogout(false);
};

const handleCloseLogoutEdit = () => {
  setOpenLogoutEdit(false);
};

const handleCloseLogoutDelete = () => {
  setOpenLogoutDelete(false);
};

const handleCloseLogoutAssign = () => {
  setOpenLogoutAssign(false);
};

const handleClick = (event, employee) => {
  globalVariable = employee;
  setEmployeeID(globalVariable);
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setAnchorEl(null);
};
const handleClick1 = (event) => {
setAnchorE2(event.currentTarget);
};
const handleClose1 = () => {
setAnchorE2(null);
setUserPassword('');
setUserPasswordVerify('');
setUserEmail('');
};
const handleClick2 = (event) => {
setAnchorE3(event.currentTarget);
};
const handleClose2 = () => {
setAnchorE3(null);
};
const handleClick3 = (event) => {
setAnchorE4(event.currentTarget);
};
const handleClose3 = () => {
setAnchorE4(null);
};
const handleClickOpen = () => {
setOpen(true);
};
const handleClose4 = () => {
setOpen(false);
};
///
const [age, setAge] = React.useState('');
const id = open2 ? 'simple-popover' : undefined;
const id3 = open3 ? 'simple-popover' : undefined;
const id4 = open4 ? 'simple-popover' : undefined;
const handleChange = (event) => {
setAge(event.target.value);
};
const [list, setList] = useState("");

function isNumber(char) {
  if (typeof char !== 'string') {
    return false;
  }

  if (char.trim() === '') {
    return false;
  }

  return !isNaN(char);
}

function refre(){
  window.location.reload();
}
/**************************************/
const [btndisable, setBtnDisable] = React.useState(true)
const [emailError, setEmailError] = React.useState("")

React.useEffect(() => {
  if(userName.length > 0 && userEmail.length > 6 && userPassword.length > 0 && userPasswordVerify === userPassword){
    setBtnDisable(false);
  }else{
    setBtnDisable(true);
  }

}, [userName, userEmail, userPassword, userPasswordVerify])

React.useEffect(() => {
  if(userEmail.length == 0){
    setEmailError('')
  }
  if(validator.isEmail(userEmail)){
    setEmailError('Valid email');
  }else{
    setEmailError("Invalid email");
    setBtnDisable(true);
  }

}, [userEmail])


const [passwordError, setPasswordError] = React.useState("")

React.useEffect(() => {
  
  if(userPasswordVerify.length == 0){
    setPasswordError('')
  }
  if(userPassword === userPasswordVerify && userPasswordVerify !== ""){
    setPasswordError('Valid passwords');
  }else{
    setPasswordError("Passwords do not match");
    setBtnDisable(true);
  }

}, [userPasswordVerify])

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


  <Grid>
    <Typography variant="h5" gutterBottom>
    Supervisors
    <Button aria-describedby={id} variant="contained" onClick={handleClick1}>Add+</Button>
    <Popover
      id={id}
      open={open2}
      anchorEl={anchorE2}
      onClose={handleClose1}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 90, left: 1000 }}
      anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
      }}
      transformOrigin={{
      vertical:'top',
      horizontal: 'right'
      }}
      PaperProps={{
        style: {position:'relative' ,height:'500', width: '35%'}
      }}
      >
      <Typography variant='h4' sx={{ textAlign:'center' ,p: 2 }}>
      Register new supervisor
      </Typography>
      <Typography sx={{ p: 3 }}>
      <Stack>
      Name:
      <TextField required id="standard-required" label="Required" variant="standard"  onChange={(event) => { 
                              setUserName(event.target.value) }} />
      </Stack>
      </Typography>
      <Typography sx={{ p: 3 }}>
      <Stack>
      Email:
      <TextField required name='email' id="standard-required" label="Required" variant="standard"  onChange={(event) => {
                            setUserEmail(event.target.value)}}/>
      <span style={{
          fontSize: 'small',
          fontWeight: 'normal',
          color: emailError === "Invalid email" ? 'red' : 'green',
        }}>{userEmail.length > 0 ? emailError : ''}</span>
      </Stack>
      </Typography>
      <Typography sx={{ p: 3 }}>
      <Stack>
      Password:
      <TextField required id="standard-password-input" label="Password" type="password" variant="standard"  onChange={(event) => {
                            setUserPassword(event.target.value)}} />
      </Stack>
      </Typography>

      <Typography sx={{ p: 3 }}>
      <Stack>
      Verify Password:
      <TextField required name='password' id="standard-password-input" label="Password" type="password" variant="standard" onChange={(event) => {
                            setUserPasswordVerify(event.target.value)}}/>
      <span style={{
          fontSize: 'small',
          fontWeight: 'normal',
          color: passwordError === "Passwords do not match" ? 'red' : 'green',
        }}>{userPasswordVerify.length > 0 ? passwordError : ''}</span>
      </Stack>
      </Typography>

      <Typography sx={{ p: 3 }}>
      <Stack>
      <Button variant="contained" disabled={btndisable} onClick={() => {createSupervisor();handleBlockAdd();}}>Save</Button>
      </Stack>
      
      </Typography>
    </Popover>
    </Typography>
    <br></br>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
    <TextField id="input-with-sx" label="Search supervisor" variant="standard" onChange={(event) => {
    setList(event.target.value);
    }} />
    </Box>
    <br></br>
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', borderBottom: '15px', borderColor: 'black' }} >
      {supervisors?.filter((item) => {
          if(isNumber(list[0])){
            if (list == "") {
              return item;
            } else if (item.employee_id.startsWith(list)) {
              return item;
            }
          }
          else{
            if (list == "") {
              return item;
            } else if (item.name.toLocaleLowerCase().startsWith(list.toLocaleLowerCase())) {
              return item;
            }
          }
      }).map((item) => (
      <div  style={{ borderBottom: "1px solid lightgrey" }}>
        <Stack spacing={2} direction="row">
        <ListItem>
          <ListItemAvatar >
            <Avatar>
              <SupervisorAccountIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.employee_id} sx={{ color: '#6f79a8' }} />
              <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
              >
              
              {/*
              <MenuItem onClick={handleClick3} >
              <Typography id="basic-button2" aria-controls={open4 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open4 ? 'true' : undefined}
              variant="h6">
              Assign new agents
              </Typography>
              </MenuItem>
              
              <Popover
                id={id4}
                open={open4}
                anchorEl={anchorE4}
                onClose={handleClose3}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 150, left: 1100 }}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical:'top',
                horizontal: 'right'
                }}
                >

              <Typography variant='h5' sx={{ p: 2, paddingTop: "4%", paddinBottom: "4%", paddingLeft: "5%" }}>
                Assign agents
                </Typography>

                

<Autocomplete

      multiple
      id="checkboxes-tags-demo"
      options={agents}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 5 }}
            checked={selected}
          />
          {/*{option.name} - {option.employee_id}
          ///
          <ListItemText primary={option.name} secondary={option.employee_id} sx={{ color: '#6f79a8' }} />
        </li>
      )}
      style={{ width: 700, paddingLeft: "5%", paddingRight: "5%", paddingBottom: "2%" }}
      renderInput={(params) => (
        <TextField {...params} label="Current Agents" placeholder="Type agent name" />
      )}
    />


<Button variant="contained" sx={{margin: '3%'}} onClick={handleClickLogout(TransitionRight)}>Save</Button>


                    </Popover>

                    */}


                    <MenuItem onClick={handleClick2}>
                      <Typography aria-describedby={id3} variant="h6">Edit</Typography>
                    </MenuItem>
                    <Popover
                      id={id3}
                      open={open3}
                      anchorEl={anchorE3}
                      onClose={handleClose2}
                      anchorReference="anchorPosition"
                      anchorPosition={{ top: 100, left: 1000 }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      PaperProps={{
                        style: {position:'relative' ,height:'500', width: '35%'}
                      }}
                    >
                       <Typography variant='h4' sx={{  textAlign:'center' ,p: 2 }}>
                          Edit supervisor information
                          </Typography>
                          <Typography sx={{ p: 3 }}>
                          <Stack>
                          Name:
                          <TextField required id="standard-required" autoFocus label="Required" variant="standard"  defaultValue = {employeeID!=null ? employeeID.name : "Undefined"} onChange={(event) => {
                                      setUserName(event.target.value)}} />
                          </Stack>
                          </Typography>
                          <Typography sx={{ p: 3 }}>
                          <Stack>
                          Email:
                          <TextField required id="standard-required" autoFocus label="Required" variant="standard" defaultValue = {employeeID!=null ? employeeID.email : "Undefined"}  onChange={(event) => {
                                      setUserEmail(event.target.value)}} />
                          </Stack>
                          </Typography>
                          <Typography sx={{ p: 3 }}>
                          <Stack>
                          Password:
                          <TextField required id="standard-password-input" label="Password" type="password" variant="standard" onChange={(event) => {
                                      setUserPassword(event.target.value)}}/>
                          </Stack>
                          </Typography>
                          
                          <Typography sx={{ p: 3 }}>
                          <Stack>
                          <Button variant="contained" disabled={saveSettings} onClick={() => {evalPassword(); sendData();}}>Save</Button>
                          </Stack>
                          </Typography>
                    </Popover>

                    <MenuItem onClick={handleClickOpen}>
                      <Typography variant="h6">Delete</Typography>
                    </MenuItem>

                    <Dialog
                      open={open5}
                      onClose={handleClose4}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      style={{opacity: 0.63}}
                    >
                      <DialogTitle id="alert-dialog-title" sx={{opacity: 1}}>
                        Are you sure you want to delete the supervisor <b style={{color:'red'}}>{employeeID?.name}</b>
                      </DialogTitle>

                      <DialogContent sx={{opacity: 1}}>
                        <DialogContentText id="alert-dialog-description" sx={{opacity: 1}}>
                          This action can not be undone, so please make sure you want to delete this profile
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{opacity: 1}}>
                        <Button onClick={handleClose4}>No</Button>
                        <Button sx={{color: "red"}} onClick={() => {deleteSupervisor();}} autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Menu>
                </ListItem>
                <Button id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(e) => {handleClick(e, item)}}>

                  <MoreVertIcon />
                </Button>
              </Stack>

            </div>
          ))}
        </List>
        {/*<Pagination count={5} />*/}

        <Snackbar
                        open={openLogout}
                        autoHideDuration={3000}
                        onClose={() => this.setState({openLogout: false})}
                        message="New supervisor added."
                        key='1'
        />


        <Snackbar
                        open={openLogoutEdit}
                        autoHideDuration={3000}
                        onClose={handleCloseLogoutEdit}
                        TransitionComponent={transition}
                        message="Action done."
                        key='2'
        />

      <Snackbar
                        open={openLogoutDelete}
                        autoHideDuration={3000}
                        onClose={handleCloseLogoutDelete}
                        TransitionComponent={transition}
                        message="Supervisor deleted successfully."
                        key='3'
      />

      <Snackbar
                        open={openLogoutAssign}
                        autoHideDuration={3000}
                        onClose={handleCloseLogoutAssign}
                        TransitionComponent={transition}
                        message="Supervisor assigned succesfully."
                        key='4'
      />


      </Grid>
      
      }
    </div>
  );
}
