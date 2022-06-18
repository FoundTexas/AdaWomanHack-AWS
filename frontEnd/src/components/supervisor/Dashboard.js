import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth';
import { alpha, styled } from "@mui/material/styles";

import { useReactMediaRecorder } from "react-media-recorder";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import axios from 'axios';

// Components
import Home from "./Home";
import Recordings from "./Recordings";

//import VideoFilter from "../managerViews/VideoFilter";
import AgentFilter from "./AgentFilter";
import AgentStatistics from "./AgentStatistics";
import AgentCharts from "./AgentCharts";
import IndividualCharts from "./IndividualCharts";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import VideocamIcon from "@mui/icons-material/Videocam";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDial from "@mui/material/SpeedDial";
import CallIcon from "@mui/icons-material/Call";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CallEndIcon from "@mui/icons-material/CallEnd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

export default function PermanentDrawerLeft() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [profileName, setProfileName] = React.useState("");
  const [profileID, setProfileID] = React.useState("");

  
  //Get profile after login. Add token received in login to auth as bearer.
  React.useEffect(() => {
    axios.get('https://azul-api.ccmchallenges.com/profile',
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      if(profileName.length < 1){
        setProfileName(response.data.principal.name);
        setProfileID(response.data.principal.employee_id);
      }
    });
  }, [profileName, profileID]);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, screen: true });
  const menuLinkItemsSupervisor = [
    { icon: <HomeIcon />, name: "Home", link: "/supervisor/" },
    { icon: <PersonIcon />, name: "Agents", link: "/supervisor/agents" },
    {
      icon: <VideocamIcon />,
      name: "Videos library",
      link: "/supervisor/recordings",
    },
    {
      icon: <AlignVerticalBottomIcon />,
      name: "Overall metrics",
      link: "/supervisor/globalstadistics",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);

    if (value == "pick_up") {
      handleActiveCall(true);
      startRecording();
    }
  };

  const [activeCall, setActiveCall] = useState(false);

  const handleActiveCall = (value) => {
    setActiveCall(value);
  };

  //LogoutEffect
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  const [openLogout, setOpenLogout] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClickLogout = (Transition) => () => {
    setTransition(() => Transition);
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ backgroundColor: "#9fa8da" }}>
          <Typography variant="h6" noWrap component="div">
            Amazon RSH
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h8" sx={{ paddingLeft: "7%", paddingTop: "4%", color:"#6f79a8" }}>
          <b>{ auth.user.name }</b>
        </Typography>

        <Typography
          variant="h8"
          sx={{ paddingLeft: "7%", paddingBottom: "2%", color:"gray"}}
        >
          <i>{ auth.user.role }</i>
        </Typography>

        <Divider />

        <List sx={{display:"flex", flexDirection: "column", height: "100vh"}}>
          {menuLinkItemsSupervisor.map((item) => (
            <CustomLink to={item.link}>
              <ListItem button onClick={handleClickLogout(TransitionRight)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </CustomLink>
          ))}

            <ListItem button sx={{ height:"15%" ,color:"red", marginTop: "auto"}} onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutIcon style={{ color: "red" }}/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<AgentFilter />} />
          <Route path="/agents/:agentId" element={<AgentStatistics />} />
          <Route path="/recordings" element={<Recordings />}>
            <Route path=":recordingId/:timestamp" element={<Recordings />} />
          </Route>
          <Route path="/globalstadistics" element={<AgentCharts />} />
        </Routes>
      </Box>
    </Box>
  );
}
