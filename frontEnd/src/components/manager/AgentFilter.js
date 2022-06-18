//Agent Filter 
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Pagination, Grid, Paper, Typography, alertTitleClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';
import { VideoInfo } from './VideoInfo';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { hover } from '@testing-library/user-event/dist/hover';
import { set } from 'date-fns';
import validator from 'validator';
import CircularProgress from '@mui/material/CircularProgress';

export default function AgentFilter() {

var globalVariable = null;

const [agents, setAgents] = React.useState([]);
const [supervisors, setSupervisors] = React.useState([]);
const [employeeID, setEmployeeID] = React.useState(null);

const [loadingState, setLoadingState] = React.useState(true);

const [loadingData, setLoadingData] = React.useState(true);
const [refreshData, setRefreshData] = React.useState(false);

const getAgents = async ()=>{
  const response = await axios.post('https://azul-api.ccmchallenges.com/employees', {
        role: "Agent"
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    })

    let sortedAgents = response.data.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    setAgents(sortedAgents);
    setLoadingData(false);
    setLoadingState(false);
}


React.useEffect(()=>{  
  getAgents();
 },[refreshData])

React.useEffect(() => {
  
  axios.post('https://azul-api.ccmchallenges.com/employees', {
    role: "Supervisor"
  },
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => {
    let sortedSupervisors = response.data.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    if(supervisors.length < 1) {
        setSupervisors(sortedSupervisors);

    }
    //console.log(response)
  });
}, [supervisors]);

const [userName, setUserName] = useState('');
const [userPassword, setUserPassword] = useState('');

const [userPasswordVerify, setUserPasswordVerify] = useState('');

const [userEmail, setUserEmail] = useState('');
const [userGroup, setUserGroup] = React.useState('');
const [newAgent, setNewAgent] = React.useState(null);


function handleClickAccount(){
  setUserGroup('Account');
}

function handleClickShipping(){
  setUserGroup('Shipping');
}

function handleClickPayment(){

  setUserGroup('Payment');
}

function handleClickNotSpecified(){
  //console.log(userGroup);
  setUserGroup('Do Not Specify');
  console.log(userGroup);
  console.log(employeeID?.group);
}

  function createAgent() {
    axios.post('https://azul-api.ccmchallenges.com/employees/add', {
        role: 'Agent',
        name: userName,
        email: userEmail,
        password: userPassword,
        group: 'Do Not Specify'
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseAdd() });
  }


    function evalPassword(){
      if(userPassword.length  === 0)
        editAgentNoNewPassword();
      else
        editAgent();
    }

    function editAgent() {
      axios.put(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`, {
          role: employeeID.role,
          employee_id: employeeID.employee_id,
          name: userName.length > 1 ? userName : employeeID.name,
          email: userEmail.length > 1 ? userEmail : employeeID.email,
          password: userPassword,
          group: userGroup.length > 1 ? userGroup : employeeID.group,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseEdit() });
    }

    const [supervisorID, setSupervisorID] = React.useState("")

    function assignSupervisor(){
      
      axios.put(`https://azul-api.ccmchallenges.com/employees/${employeeID?.role}/${employeeID?.employee_id}`, {
          asign_supervisor: supervisorID
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then((response) => { setOpenLogoutAssign(true);  handleCloseAssign() });
    }


  function editAgentNoNewPassword() {
    axios.put(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`, {
        role: employeeID.role,
        employee_id: employeeID.employee_id,
        name: userName.length > 1 ? userName : employeeID.name,
        email: userEmail.length > 1 ? userEmail : employeeID.email,
        group: userGroup.length > 1 ? userGroup : employeeID.group,
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => { setRefreshData(!refreshData); setOpenLogoutEdit(true); handleCloseEdit() });
  }

const [anchorEl, setAnchorEl] = React.useState(null);
const [anchorE2, setAnchorE2] = React.useState(null);
const [anchorE3, setAnchorE3] = React.useState(null);
const [anchorE4, setAnchorE4] = React.useState(null);
const [open5, setOpen] = React.useState(false);
const open = Boolean(anchorEl);
const open2 = Boolean(anchorE2);
const open3 = Boolean(anchorE3);
const open4 = Boolean(anchorE4);


const [openLogout, setOpenLogout] = React.useState(false);
const [openLogoutEdit, setOpenLogoutEdit] = React.useState(false);
const [openLogoutDelete, setOpenLogoutDelete] = React.useState(false);
const [openLogoutAssign, setOpenLogoutAssign] = React.useState(false);
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

const handleCloseLogout = () => {
    setOpenLogout(false);
    setOpenLogoutEdit(false);
    setOpenLogoutDelete(false);
    setOpenLogoutAssign(false);
};

const handleCloseLogoutPORFAVOR = () => {
  setOpenLogoutDelete(false);
};

const handleClick = (event, employee) => {
  globalVariable = employee;
  setEmployeeID(globalVariable);
  setAnchorEl(event.currentTarget);
  
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

const handleCloseAssign = () =>{
  setAnchorE4(false);
  setAnchorEl(false);
}

const handleCloseEdit = () =>{
  setAnchorE3(false);
  setAnchorEl(false);
  setUserGroup('');
}

const handleCloseDelete = () =>{
  setOpen(false);
  setAnchorEl(false);
}


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
//console.log(userGroup);
};
const handleClose2 = () => {
  setAnchorE3(null);
  setUserGroup('');
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


const [superx, setSuperx] = React.useState('');


const handleChange = (event) => {
  setSuperx(event.target.value);
  setSupervisorID(event.target.value.employee_id)
};

const id = open2 ? 'simple-popover' : undefined;
const id3 = open3 ? 'simple-popover' : undefined;
const id4 = open4 ? 'simple-popover' : undefined;

const [list, setList] = useState("");


const ITEM_HEIGHT = 48;

  const openDots = Boolean(anchorEl);
  const [post, setPost] = React.useState(null);

function eliminarAgente() {
  axios.delete(`https://azul-api.ccmchallenges.com/employees/${employeeID.role}/${employeeID.employee_id}`,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then(() => { 
     setRefreshData(!refreshData);  setOpenLogoutEdit(true); handleCloseDelete()
   });
}
/*******************************************/
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
    Agents
    <Button aria-describedby={id} variant="contained" onClick={handleClick1}>Add+</Button>
    <Popover
      id={id}
      open={open2}
      anchorEl={anchorE2}
      onClose={handleClose1}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 100, left: 1000 }}
      anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
      }}
      transformOrigin={{
      vertical:'top',
      horizontal: 'right'
      }}
      PaperProps={{
        style: {position:'relative' ,height:'600', width: '35%'}
      }}
      >
      <Typography variant='h4' sx={{ textAlign:'center' ,p: 2 }}>
      Register new agent
      </Typography>
      <Typography sx={{ p: 3 }}>
      <Stack>
      Name:
      <TextField required name='name' id="standard-required" label="Required" variant="standard" onChange={(event) => {setUserName(event.target.value)}}/>
      </Stack>
      </Typography>

      <Typography sx={{ p: 3 }}>
      <Stack>
      Email:
      <TextField required name='email' id="standard-required" label="Required" variant="standard" onChange={(event) => {
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
      <TextField required name='password' id="standard-password-input" label="Password" type="password" variant="standard" onChange={(event) => {
                            setUserPassword(event.target.value)}}/>
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
{/*
      <Typography sx={{ p: 2 }}>


      <Stack>

      Group:

      <Stack direction="row" spacing={5} sx={{marginTop:"5%", marginLeft: "1%"}}>
        <Chip label="Account" variant="outlined" onClick={handleClickAccount} sx={{
                        backgroundColor:
                            userGroup === "Account"
                                ? "#d1d9ff"
                                : "grey"
                    }}/>

        <Chip label="Shipping" variant="outlined" onClick={handleClickShipping} sx={{
                        backgroundColor:
                            userGroup === "Shipping"
                                ? "#d1d9ff"
                                : "grey"
                    }}/>

        <Chip label="Payment" variant="outlined" onClick={handleClickPayment} sx={{
                        backgroundColor:
                            userGroup === "Payment"
                                ? "#d1d9ff"
                                : "grey"
                    }} />

        <Chip label="Do not specify" variant="outlined" onClick={handleClickNotSpecified} sx={{
                        backgroundColor:
                            userGroup === ""
                                ? "#d1d9ff"
                                : "grey"
                    }}/>

      </Stack>
      
      </Stack>
      </Typography>
                  */}
      <Typography sx={{ p: 3 }}>
      <Stack>
      <Button variant="contained" disabled={btndisable} onClick={() => {createAgent(); handleBlockAdd();}}>Save</Button>
      </Stack>

    
      </Typography>
    </Popover>
    </Typography>
    <br></br>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
    <TextField id="input-with-sx" label="Search agent" variant="standard" onChange={(event) => {
      setList(event.target.value);
    }} />
    </Box>
    <br></br>
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', borderBottom: '15px', borderColor: 'black' }} >

      {agents?.filter((item) => {
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
      <div key={item.name} style={{ borderBottom: "1px solid lightgrey" }}>
        <Stack spacing={2} direction="row">
        <ListItem>
          <ListItemAvatar >
            <Avatar>
              <AccountCircleIcon />
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
              <MenuItem onClick={handleClick3} >
              <Typography id="basic-button2" aria-controls={open4 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open4 ? 'true' : undefined}
              variant="h6"
               >
              Assign new supervisor
              </Typography>
              </MenuItem>
              <Popover
                id={id4}
                open={open4}
                anchorEl={anchorE4}
                onClose={handleClose3}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 200, left: 1020 }}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical:'top',
                horizontal: 'right'
                }}
                >
                <MenuItem style={{ backgroundColor: 'transparent', marginTop:'3%' }} >
                <Typography variant="h6" gutterBottom>
                Assign supervisor to <b style={{color:'#6f79a8'}}>{employeeID?.name}</b>
                </Typography>
                </MenuItem>
                <MenuItem style={{ backgroundColor: 'transparent', marginRigth: '5%' }}>
                <Box sx={{minWidth: 500 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Supervisors</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={superx}
                    label="Supervisors"
                    onChange={handleChange}
                    >
                    
                    {/*
                    <MenuItem value={"Supervisor Roberto"}>Supervisor Roberto Almero</MenuItem>
                    <MenuItem value={"Supervisor Daniel"}>Supervisor Daniel Javier</MenuItem>
                    <MenuItem value={"Supervisor Fernanda"}>Supervisor Fernanda Arraza</MenuItem>
                    */}

                   {supervisors.map((supervisor) => (
                      <MenuItem value={supervisor}>
                        {supervisor.name}
                      </MenuItem>
                   ))}
                 

                  </Select>
                </FormControl>
                </Box>
                </MenuItem>
                <br></br>
                <MenuItem style={{ backgroundColor: 'transparent', marginBottom: '3%', marginRigth: '2%', float:'right'}} >
                <Stack spacing={2} direction="row" >
                <Button variant="outlined" onClick={handleClose3}> Cancel </Button>
                <Button variant="contained" onClick={() => {assignSupervisor()}}>Save</Button>
                </Stack>
                </MenuItem>
              </Popover>


              <MenuItem onClick={handleClick2}>
              <Typography aria-describedby={id3} variant="h6" >Edit</Typography>
              </MenuItem>
              <Popover
                id={id3}
                open={open3}
                anchorEl={anchorE3}
                onClose={handleClose2}
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
                Edit agent information
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

                  Group:

                  <Stack direction="row" spacing={4.2} sx={{marginTop:"5%", marginLeft:"1.2%"}}>
                    <Chip label="Account" variant="outlined" onClick={handleClickAccount} sx={{
                                    backgroundColor:
                                        (employeeID?.group === "Account" && userGroup === "")
                                        ?
                                           "#d1d9ff"
                                        :
                                        userGroup === "Account"
                                            ? "#d1d9ff"
                                            : "white"
                                }}/>

                    <Chip label="Shipping" variant="outlined" onClick={handleClickShipping} sx={{
                                    backgroundColor:
                                        (employeeID?.group === "Shipping" && userGroup === "")
                                        ?
                                          "#d1d9ff"
                                        :
                                        userGroup === "Shipping"
                                            ? "#d1d9ff"
                                            : "white"
                                }}/>

                    <Chip label="Payment" variant="outlined" onClick={handleClickPayment} sx={{
                                    backgroundColor:
                                      (employeeID?.group === "Payment" && userGroup === "")
                                        ?
                                          "#d1d9ff"
                                        :
                                        userGroup === "Payment"
                                            ? "#d1d9ff"
                                            : "white"
                                }} />

                    <Chip label="Do not specify" variant="outlined" onClick={handleClickNotSpecified} sx={{
                                    backgroundColor:
                                        ((employeeID?.group === null || employeeID?.group === "" || employeeID?.group === "Do Not Specify") && (userGroup === "" || userGroup === "Do Not Specify"))
                                          ? 
                                              "#d1d9ff"
                                          :
                                          ((userGroup === "Do Not Specify" || userGroup == "") && employeeID?.group === "Do Not Specify" && employeeID?.group === null && employeeID?.group === "")
                                            ? 
                                              "#d1d9ff"
                                            :
                                              ((userGroup === "Do Not Specify" || userGroup == "") && employeeID?.group !== "Do Not Specify" && employeeID?.group !== null && employeeID?.group !== "")
                                                ? 
                                                  "white"
                                                : 
                                                  (userGroup === "Do Not Specify" || userGroup == "")
                                                    ?
                                                      "#d1d9ff"
                                                    :
                                                      "white"


                                }}/>

                  </Stack>
                  
                  </Stack>
                </Typography>


                <Typography sx={{ p: 2 }}>
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
              Are you sure you want to delete agent <b style={{color:'red'}}>{employeeID?.name}</b>
              </DialogTitle>

              <DialogContent sx={{opacity: 1}}>
              <DialogContentText id="alert-dialog-description" sx={{opacity: 1}}>
              This action can not be undone, so please make sure you want to delete this profile
              </DialogContentText>
              </DialogContent>

              <DialogActions sx={{opacity: 1}}>
              <Button onClick={handleClose4}>No</Button>
              <Button sx={{color:"red"}} onClick={() => {eliminarAgente();}} autoFocus>Yes</Button>
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
       {/* <Pagination count={5} /> */}

       <Snackbar
                        open={openLogout}
                        autoHideDuration={3000}
                        onClose={handleCloseLogout}
                        TransitionComponent={transition}
                        message="New agent added successfully."
                        key={transition ? transition.name : ''}
      />


      <Snackbar
                        open={openLogoutEdit}
                        autoHideDuration={3000}
                        onClose={handleCloseLogout}
                        TransitionComponent={transition}
                        message="Action done."
                        key={transition ? transition.name : ''}
        />

      <Snackbar
                        open={openLogoutDelete}
                        autoHideDuration={3000}
                        onClose={handleCloseLogout}
                        TransitionComponent={transition}
                        message="Agent deleted successfully."
                        key={transition ? transition.name : ''}
      />

      <Snackbar
                        open={openLogoutAssign}
                        autoHideDuration={3000}
                        onClose={handleCloseLogout}
                        TransitionComponent={transition}
                        message="Supervisor assigned succesfully."
                        key={transition ? transition.name : ''}
      />

      </Grid>

      
    }
    </div>
  );
}
