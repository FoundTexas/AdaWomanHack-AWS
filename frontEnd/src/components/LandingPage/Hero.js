import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import heroImage from "../../assets/images/agent-home.svg";
import useStyles from "./Styles";

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Let's scale your business
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Amazon RSH (Recording System Helper) is a system that will work as
            an extension for Amazon Connect in order to offer more
            functionalities to its users.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={heroImage} alt="heroImage" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
