import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth';

import { useReactMediaRecorder } from "react-media-recorder";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import { alpha, styled } from '@mui/material/styles';

// Components
import Home from "./Home";
import Recordings from "./Recordings";
import IncomingCall from './IncomingCall';
import Survey from './Survey';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import SettingsIcon from '@mui/icons-material/Settings';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import StopIcon from '@mui/icons-material/Stop';
import LogoutIcon from "@mui/icons-material/Logout";


const drawerWidth = 240;

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary
}));

export default function PermanentDrawerLeft() {

  useEffect(() => {  
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const auth = useAuth();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  // Backdrop state
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  // Media recording hook
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    screen: true,
    onStop: (blobUrl, blob) => {
      setVideo(blob)
    }
  });

  useEffect(() => {
    if(status === 'recording') {
      handleCloseBackdrop();
    }
  }, [status])
  
  // Menu items
  const menuLinkItems = [
    { icon: <HomeIcon />, name: 'Home', link: '/agent/' },
    { icon: <VideocamIcon />, name: 'Recording Library', link: '/agent/recordings' },
  ];

  // Call actions
  const callActions = [
    { icon: <Link to="survey"><CallEndIcon /></Link>, name: 'Hang up', onclick: () => { handleActiveCall(false); } },
  ];

  const [openCallDialog, setOpenCallDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpenCallDialog = () => {
    setOpenCallDialog(true);
  };

  const handleCloseCallDialog = (value) => {
    setOpenCallDialog(false);
    setSelectedValue(value);

    if(value == "pick_up") {
      handleActiveCall(true);
      startRecording();
    }

  };


  const handleActiveCall = value => {
    auth.setActiveCall(value);
  }

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={ (!auth.activeCall && {backgroundColor: '#9fa8da'}) || (auth.activeCall && { backgroundColor: '#4caf50' })}>
          <Typography variant="h6" noWrap component="div">
            Amazon RSH
          </Typography>
          { auth.activeCall && <FiberManualRecord style={{color: 'red'}}/> }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Typography variant="h8" sx={{ paddingLeft: "7%", paddingTop: "4%" }}>
          { auth.user.name }
        </Typography>

        <Typography
          variant="h8"
          sx={{ paddingLeft: "7%", paddingBottom: "2%" }}
        >
          { auth.user.employee_id }
        </Typography>

        <Divider />
        
        <List sx={{display:"flex", flexDirection: "column", height: "100vh"}}>
          {menuLinkItems.map((item, key) => (
          <CustomLink to={item.link} key={key}>
            <ListItem button>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </CustomLink>
          ))}

            {/* <ListItem button onClick={handleClickOpenCallDialog}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Call dialog"} />
              </ListItem> */}

            

            <ListItem button sx={{color:"red", marginTop: "auto"}} onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "red" }}/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        

      <IncomingCall
        selectedValue={selectedValue}
        openCallDialog={openCallDialog}
        onCloseCallDialog={handleCloseCallDialog}
        handleToggleBackdrop={handleToggleBackdrop}
      />
              
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

        <Routes>
          <Route path="/" element={<Home start={startRecording} status={status} video={video} />} />
          <Route path="/recordings" element={<Recordings />}>
            <Route path=":recordingId" element={<Recordings />} />
          </Route>
          <Route path="/survey" element={<Survey/>} />
        </Routes>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, alignItems: 'end' }}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <Alert severity="warning" sx={{ marginBottom: '20px' }}>Por favor, acepta el permiso de compartir pantalla para comenzar la llamada</Alert>
        </Backdrop>
      </Box>
    </Box>
  );
}
