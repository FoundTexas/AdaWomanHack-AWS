import React from "react";
import { Container, Typography } from "@mui/material";
import LogoSupervisor from "./Call_center_amico.png";

function HomeDashboard() {
  return (
    <>
      {/* <Typography variant="h3" gutterBottom>
      Welcome to  Amazon RSH - Supervisor!! 
    </Typography>
    <Typography variant="h3" gutterBottom>
      "The only goal you can't accomplish is the one you don't go after".
    </Typography>
  */}
      <img
        style={{
          height: "100%",
          width: "60%",
          top: "0%",
          marginLeft: "18%",
        }}
        src={LogoSupervisor}
      />
    </>
  );
}

export default HomeDashboard;
