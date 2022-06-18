import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import useStyles from "./Styles";

const Section = () => {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: <VideoCameraFrontIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        "The system will allow Contact Center Agents to record their interactions with users",
    },
    {
      id: 2,
      icon: <PersonSearchIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        "Allow Supervisors to search specific videos of their assigned agents and see them again to audit the agent's performance and interactions with clients",
    },
    {
      id: 3,
      icon: <VerifiedUserIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        "Allow a Manager to set up the recording system in order to conform to the business needs",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: "400px" }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
