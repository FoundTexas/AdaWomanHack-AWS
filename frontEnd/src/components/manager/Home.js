import React from "react";
import { Container, Typography } from "@mui/material";
import LogoManager from "./Call_center_amico.png";

function Home() {
  return (
    <>
      <img
        style={{
          height: "100%",
          width: "60%",
          top: "0%",
          marginLeft: "18%",
        }}
        src={LogoManager}
      />
    </>
  );
}

export default Home;
