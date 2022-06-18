import React, { useState } from "react";
import "./AgentFilter.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Pagination, Grid, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';

export default function AgentFilter() {

  const [agents, setAgents] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState(true);

  //List of employees (supervisor only sees their agents).
  React.useEffect(() => {
    axios.get('https://azul-api.ccmchallenges.com/employees', {
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

      setLoadingState(false);
    });
  }, [agents]);

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
        </Typography>

        <br></br>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search agent"
            variant="standard"
            onChange={(event) => {
              setList(event.target.value);
            }}
          />
        </Box>

        <br></br>

        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
            borderBottom: "15px",
            borderColor: "black",
          }}
        >
          {agents.filter((item) => {
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
              <div
                key={item.employee_name}
                style={{ borderBottom: "1px solid lightgrey" }}
              >
                <Link
                  to={`/supervisor/agents/${item.employee_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.employee_id}
                      sx={{ color: "#6f79a8" }}
                    />
                  </ListItem>
                </Link>
              </div>
            ))}

          {/* {
            clientes.map(cliente => {
              return(
                <Link to={`/profile/${cliente.id}`} style={{ textDecoration: 'none' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={cliente.nombre} secondary={cliente.id}/>
                    <ListItemAvatar>
                        <MoreVertIcon/>
                    </ListItemAvatar>
                    
                  </ListItem>
                </Link>
              )
            })
          }

        */}
        </List>
      </Grid>
    }
    </div>
  );
}
