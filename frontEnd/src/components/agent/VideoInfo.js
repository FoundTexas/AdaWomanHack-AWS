import React from "react";
import { Box, Chip, Typography, Skeleton } from "@mui/material";

export const VideoInfo = ({ videos, recordingId }) => {

  const video = videos.filter(video => video.video_reference == recordingId)[0];

  const textSkeleton = (text) => {
    if (text === undefined) return <Skeleton variant="text" />;
    return text;
  };

  const timestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const dateString = date.toString();
    console.log(dateString);
    return dateString;
  }
  
  return (
    <>
      <Typography variant="h5" mb={3}>
        Video information
      </Typography>
      <Typography variant="button" style={{ display: "block" }}>
        Date
      </Typography>
      <Typography variant="body2" style={{ display: "block" }} gutterBottom>
        {textSkeleton(timestampToDate(video.call_timestamp))}
      </Typography>

      <Typography variant="button" style={{ display: "block" }}>
        Agent ID
      </Typography>
      <Typography variant="body2" style={{ display: "block" }} gutterBottom>
        {textSkeleton(video.employee_id)}
      </Typography>

      <Typography variant="button" style={{ display: "block" }}>
        Length
      </Typography>
      <Typography variant="body2" style={{ display: "block" }} mb={4}>
        {textSkeleton(video.duration + ' seconds')}
      </Typography>

      <Typography variant="button" style={{ display: "block" }}>
        User Phone
      </Typography>
      <Typography variant="body2" style={{ display: "block" }} gutterBottom>
        {textSkeleton(video.user_phone)}
      </Typography>

      <Typography variant="button" style={{ display: "block" }}>
        Requested service
      </Typography>
      <Typography variant="body2" style={{ display: "block" }} mb={4}>
        {textSkeleton(video.call_reason)}
      </Typography>

      <Typography variant="h7" gutterBottom sx={{ fontWeight: "bold" }}>
        Related Tags
      </Typography>
      <Box sx={{ lineHeight: "45px", marginTop: "10px" }}>
        {video.tags.map((tag) => (
          <Box sx={{ display: "inline" }} mr={1}>
            <Chip
              label={tag}
              variant="outlined"
              sx={{ backgroundColor: "#d1d9ff" }}
            />
          </Box>
        ))}
        {video.tags.length == 0 && (
          <Box sx={{ display: "inline" }} mr={1}>
            <Skeleton variant="rectangular" width={"100%"} height={32} />
          </Box>
        )}
      </Box>
    </>
  );
};
