import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { DateRange } from "react-date-range";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { alpha, styled } from "@mui/material/styles";
import { Player, BigPlayButton } from 'video-react';
import "video-react/dist/video-react.css"; // import css

import { Grid, Paper, Typography, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { VideoInfo } from "./VideoInfo";

import TagFilter from "./TagFilter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AgentRecordings() {
  const auth = useAuth();

  const [videos, setVideos] = useState([]);

  //console.log(videos);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const { recordingId } = useParams();

  // Calendar Pick
  const [calendarS, setCalendarS] = useState(null); // Para el popup
  const isOpen = Boolean(calendarS);
  const calendar = isOpen ? "simple-popover":undefined;
  const handleClick = (event) => { // Maneja Evento Calendar Abierto 
    setCalendarS(event.currentTarget);
  }
  const handleClose = (event) => { // Maneja Evento Calendar Cerrado 
    setCalendarS(null);
  }
  const [state, setState] = useState([ // Formato para el date
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [date, setDate] = useState({}); // Variables cambiables del date con hook
  const handleChangeDates = (event) => {
    setState([event.selection])
    setDate({
      startDate: event.selection.startDate.toLocaleString('sv'), // Definir fecha en formato yyyy-mm-dd xx:xx:xx
      endDate: event.selection.endDate.toLocaleString('sv')
    });
    //console.log(date.startDate, date.endDate);
  };

  useEffect(() => {
    setLoadingSkeleton(true);
    const method = ((selectedTagList.length === 0) && ((date.startDate || date.endDate) === undefined)) ? 'get' : 'post';
    axios({
      method: method,
      headers: {
        Authorization: 'Bearer ' + auth.user.token
      },
      data: { tags: selectedTagList, from: date ? date.startDate :undefined, to: date ? date.endDate :undefined},
      url: 'https://azul-api.ccmchallenges.com/videos',
    })
    .then(function (response) {
      setLoadingSkeleton(false);
      if(method == 'get') {
        setVideos(response.data[0]);
      }
      if(method == 'post') {
        setVideos(response.data);
      }
    })
  }, [selectedTagList, date]);

  const [urlVideo, setUrlVideo] = useState('');

  useEffect(() => {
    if (recordingId !== undefined) {
      setUrlVideo('https://azul-recordings.s3.amazonaws.com/' + recordingId);
    }
  }, [recordingId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={recordingId !== undefined && videos.length !== 0 ? 4 : 12}>
        <Typography variant="h5" gutterBottom>
          Recording list
        </Typography>

        <TagFilter selectedTagList={selectedTagList} setSelectedTagList={setSelectedTagList} />

        <Stack spacing={4} sx={{ width: 450 }}>
          <Box sx={{ marginTop:"6%", display: "flex", alignItems: "flex-end" }}>
            <Button
              aria-describedby={calendarS}
              variant="contained"
              onClick={handleClick}
              size="small"
              sx={{width:240}}
            >
              Filter by dates
            </Button>
          </Box>
        </Stack>

        <Popover
          id={calendar}
          open={isOpen}
          calendarS={calendarS}
          onClose={handleClose}
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
          />
          <br></br>
          <Button variant='contained' sx={{marginBottom: '3.4%', marginRight: '3.4%'}} onClick={() => setDate({startDate: undefined, endDate: undefined}) }>Unselect date ranges</Button>
        </Popover>

        <List
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          {!loadingSkeleton && videos.map((video, index) => {
            return (
              <Link
                to={`/agent/recordings/${video.video_reference}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <VideoFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={video.video_reference} secondary={video.call_timestamp} />
                </ListItem>
              </Link>
            );
          })}

          {loadingSkeleton &&
            [...Array(10)].map((element, index) => (
              <ListItem key={index}s>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <Skeleton variant="rectangular" width={"100%"} height={40} />
              </ListItem>
            ))}
        </List>

      </Grid>
      {recordingId !== undefined && videos.length !== 0 && (
        <>
          <Grid item xs={4}>
            <VideoInfo videos={videos} recordingId={recordingId} />
          </Grid>
          <Grid item xs={4}>
          <Player playsInline src={urlVideo}>
            <BigPlayButton position="center" />
          </Player>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default AgentRecordings;
