import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import IndividualCharts from "./IndividualCharts";
import axios from "axios";
import AgentCharts from "./AgentCharts";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

let miPostURL = localStorage.getItem("RSHurlEmployees");

export default function AgentStatistics() {
  let { agentId } = useParams();

  const [loadingState, setLoadingState] = React.useState(true);
  const [agent, setAgent] = React.useState(null);


  React.useEffect(() => {
    axios.get(`https://azul-api.ccmchallenges.com/employees/Agent/${agentId}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      setAgent(response.data[0]);
      setLoadingState(false);  
    });
  }, []);


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
   
    <div className="chart">
      
      <div>



        <Typography variant="h5" gutterBottom>
          Agent {agent?.name}
        </Typography>

        <Typography variant="h7" gutterBottom>
          ID: {agent?.employee_id}
        </Typography>

        <br></br>
        <br></br>
      </div>

      <IndividualCharts employee_demo={agentId} />
    </div>

  }

</div>
  );
}
