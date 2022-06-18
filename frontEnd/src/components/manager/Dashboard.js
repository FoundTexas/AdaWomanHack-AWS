import React from 'react';
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
import axios from 'axios';

// AGENT VIEWS
import Home from "./Home";
import AgentFilter from "./AgentFilter";
import SupervisorFilter from "./SupervisorFilter";
//import ManagerFilter from "./ManagerFilter";
import ManagerRecordings from "./ManagerRecordings";
import AdminSettings from "./AdminSettings";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import VideocamIcon from "@mui/icons-material/Videocam";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
//import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

export default function PermanentDrawerLeft() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [profileEmail, setProfileEmail] = React.useState("");
  const [profileID, setProfileID] = React.useState("");

  
  //Get profile after login. Add token received in login to auth as bearer.
  React.useEffect(() => {
    axios.get('https://azul-api.ccmchallenges.com/profile',
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      if(profileEmail.length < 1){
        setProfileEmail(response.data.principal.name);
        //console.log(response.data);
        setProfileID(response.data.principal.employee_id);
      }
    });
  }, [profileEmail, profileID]);


  const menuLinkItemsManagers = [
    { icon: <HomeIcon />, name: "Home", link: "/manager/" },
    { icon: <PersonIcon />, name: "Agents", link: "/manager/lstAgents" },
    {
      icon: <SupervisorAccountIcon />,
      name: "Supervisors",
      link: "/manager/lstSupervisors",
    },

    {
      icon: <VideocamIcon />,
      name: "Videos library",
      link: "/manager/recordings",
    },
    {
      icon: <SettingsIcon />,
      name: "System settings",
      link: "/manager/settings",
    },
  ];

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
          sx={{ paddingLeft: "7%", paddingBottom: "2%", color: 'gray'}}
        >
          <i>{ auth.user.role }</i>
        </Typography>

        <Divider />
        
        <List sx={{display:"flex", flexDirection: "column", height: "100vh"}}>
          {menuLinkItemsManagers.map((item) => (
            <CustomLink to={item.link}>
              <ListItem button>
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
          <Route path="/lstAgents" element={<AgentFilter />} />
          <Route path="/lstSupervisors" element={<SupervisorFilter />} />
          <Route path="/recordings" element={<ManagerRecordings />}>
          <Route path=":recordingId/:timestamp" element={<ManagerRecordings />} />
          </Route>
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </Box>
    </Box>
  );
}
