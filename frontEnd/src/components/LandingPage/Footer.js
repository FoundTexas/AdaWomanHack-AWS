import React from "react";
import { Box, Typography, Link } from "@mui/material";
import useStyles from "./Styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        Made with ♥ by {" "}
        <Link href="#" target="_blank" underline="none">
          Amazon RSH
        </Link>
      </Typography>
      <Typography className={classes.footerDate}>© 2022 Amazon RSH.</Typography>
    </Box>
  );
};

export default Footer;
