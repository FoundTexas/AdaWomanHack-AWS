import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import axios from 'axios';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

import "./chartsComponents.css";
import { Typography } from "@mui/material";
import { Tag } from "rsuite";
import { Box } from "@mui/system";
import { DateRange } from 'react-date-range';
import * as moment from 'moment';
import SendIcon from '@mui/icons-material/Send';


var respons = {};

export default function AgentCharts(props) {

  const [info, setInfo] = React.useState([]);
  const [tags,setTags]= React.useState([]);
  
  React.useEffect(() => {
    
    //Get general graphs.
    axios.get('https://azul-api.ccmchallenges.com/videos/graph', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      if(info.length < 1){
        setInfo(response.data)
        //console.log("2")
      }
      
      
/*tags.map((item) =>{
  item.ta
})*/
        
    });
  }, [info]);

  /*****************************/
  const styleh1 = {
    color: "#9fa8da",
    marginLeft:"15%",
    marginTop:"5%",
    marginRight:"15%"
  } 

const styleh2 = {
  color: "#6f79a8",
  fontSize: "500%",
  marginLeft:"20%",
  marginRight:"20%",
  marginTop:"5%"
  
}

  const dummyEndpoint=[
    {
      "solvedIssue": {
        "Delivery": 10,
        "Payment": 11,
        "Account": 12,
        "Lost":13
      },
      "solved": {
        "solved": 23,
        "unsolved": 12
      },
      "averageCallTime": {
        "averageCallTime": 30
      }
    }
  ]

  const dummyEndpointIndividuales=[
    {
      "agent_id": 0,
      "email": "email@gmail.com",
      "role": "agent",
      "name": "string",
      "status": true,
      "graphInfo": {
        "schema": {
          "solvedIssue": {
            "Delivery": 10,
            "Payment": 10,
            "Account": 10
          },
          "solved": {
            "solved": 23,
            "unsolved": 12
          },
          "averageCallTime": {
            "averageCallTime": 30
          }
        }
      }
    }
  ]

  //CALENDAR
  const [dates, setDates] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setCalendarS(event.currentTarget);
  };

  const handleClose1 = () => {
    setCalendarS(null);
  };

  const handleChangeDates = (event) => {
    //console.log(event)
    setState([event.selection])
    setDates({startDate: event.selection.startDate, endDate: event.selection.endDate})
    //console.log(state)
    
  };

  const getDataRange = async ()=>{
    
     const response = await axios.post(`https://azul-api.ccmchallenges.com/videos/graph`, respons,
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
       //console.log("Response");
       setInfo(response.data);
       //console.log(respons);
       //console.log(response.data);

       respons = {};
 }

  function handleSearch(){
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
    //console.log("HandleSearch");
    //console.log(respons);
   // setRefreshData(!refreshData);
    getDataRange();
}

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [calendarS, setCalendarS] = React.useState(null);
  const open1 = Boolean(calendarS);
  const calendar = open1 ? "simple-popover" : undefined;

  //console.log(dummyEndpointIndividuales[0].graphInfo.schema)
  const informacionParaGraficarIndividual=dummyEndpointIndividuales[0].graphInfo.schema

  const barData = [
    {
      tags: "Devolcion",
      "total": 137
     
    },
    {
      tags: "Envio",
      "total": 68
      
    },
    {
      tags: "Fraude",
      "total": 137
    },
    {
      tags: "Enojo",
      "total": 68
      
    },
    {
      tags: "Dañado",
      "total": 137
     
    },
    {
      tags: "Perdido",
      "total": 68
      
    },
    {
      tags: "Cumplido",
      "total": 137
     
    },
    
 
  ];


  const donutData = [
    {
      id: "Solved",
      label: "Solved",
      "solved": 14,
      value: info.successfulCalls?.solved ? info.successfulCalls.solved : 0,
    },
    {
      id: "Unsolved",
      label: "Unsolved",
      "not solved": 14,
      value: info.successfulCalls?.unsolved ? info.successfulCalls.unsolved : 0,
    },
    
    
  ];

  const lineData = [
    {
      id: "Overall",
      data: [
        {
          x: "Jan",
          y: 32,
        },
        {
          x: "Feb",
          y: 34,
        },
        {
          x: "Mar",
          y: 30,
        },
        {
          x: "Apr",
          y: 55,
        },
        {
          x: "May",
          y: 28,
        },
        {
          x: "Jun",
          y: 70,
        },
        {
          x: "Jul",
          y: 72,
        },
        {
          x: "Aug",
          y: 75,
        },
        {
          x: "Sep",
          y: 85,
        },
        {
          x: "Oct",
          y: 50,
        },
        {
          x: "Nov",
          y: 74,
        },
        {
          x: "Dec",
          y: 90,
        },
      ],
    },
  ];

  return (
  

    <div className="AgentPage">
    
    <Typography variant="h5" gutterBottom>
      Overall metrics
    </Typography>
  
    <Stack sx={{marginTop:'3%'}}>
      <Box sx={{ marginTop:1, marginBottom:1, display: "flex", alignItems: "flex-end" }}>
          <Stack spacing={3} direction="row" sx={{ width: 390, height: 40 }}>
            <Button
              aria-describedby={calendar}
              variant="contained"
              onClick={handleClick1}
              size="small"
              sx={{width:250}}
            >
              Filter by dates
            </Button>
            <Button sx={{float: "left", width:115, backgroundColor:"#6f79a8"}} size="medium" variant="contained" onClick={() => handleSearch()} endIcon={<SendIcon size='small'/>}>Search</Button>
    
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

      <div className="AgentInfo">
        <h1 className="Name">{props.name}</h1>
        <h2 className="Id">{props.id}</h2>
      </div>
      <div className="WrapperCharts">
        <div className="WrapperChart donut-chart">
          <Typography variant="h6" sx={{textAlign: 'center'}}>Number of solved and unsolved calls</Typography>
          <ResponsivePie
            data={donutData}
            keys={["solved", "not solved"]}
            margin={{ top: 30, right: 95, bottom: 85, left: 95 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={["#9fa8da", "#d1d9ff", "#6f79a8"]}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 20,
                translateY: 45,
                itemsSpacing: 2,
                itemWidth: 90,
                itemHeight: 10,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 15,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="WrapperChart bar-chart">
        <Typography variant="h6" sx={{textAlign: 'center'}}>Number of calls received by group </Typography>

          <ResponsiveBar
            data={info.solvedIssue ? info.solvedIssue : []}
            keys={["total"]}
            legendLabel=""
            indexBy="tag"
            margin={{ top: 30, right: 30, bottom: 60, left: 50 }}
            padding={0.3}
            hidden={true}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={["#9fa8da", "#6f79a8"]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
          
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            /*legends={[
              {
                //dataFrom: "keys",
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 20,
                translateY: 45,
                itemsSpacing: 2,
                itemWidth: 90,
                itemHeight: 10,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 15,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}*/
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) {
              return (
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
              );
            }}
          />
        </div>
          
<Box sx={{  display: "flex", alignItems: "flex-end"}}>
        <div className="WrapperChart line-chart" style={{width:492,height:250}} >
          <h1 style={styleh1}>Average Call Time</h1>
          <h2 style={styleh2}>{info.callTime?.averageCallTime} mins</h2>
        </div>
        </Box>
      </div>
    </div>
  );
}
