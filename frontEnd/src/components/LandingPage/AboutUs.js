import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import useStyles from "./Styles";

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.aboutUsContainer}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <img src="https://i.ibb.co/MBXdysv/rsh2.png" alt="My Team" className={classes.largeImage} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            The project
          </Typography>
          <Typography className={classes.aboutUsSubtitle}>
            Full-stack system that allows Amazon Connect clients to record
            different aspects of the interactions between employees and
            customers to provide business insights and to have a way to access
            previous calls for different purposes.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
