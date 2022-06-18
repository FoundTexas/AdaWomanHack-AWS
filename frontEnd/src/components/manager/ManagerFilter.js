import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination, Grid, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

let supervisores = [
  {
    nombre: "Devanni Regina",
    id: "987654",
    role: "Manager",
  },
  {
    nombre: "Daniel Elenor",
    id: "184764",
    role: "Manager",
  },
  {
    nombre: "Rodrigo Escobar",
    id: "324567",
    role: "Manager",
  },
  {
    nombre: "Daniela Mendez",
    id: "723456",
    role: "Manager",
  },
  {
    nombre: "Adrian Velazquez",
    id: "234567",
    role: "Manager",
  },
  {
    nombre: "Edgar Velazco",
    id: "184764",
    role: "Manager",
  },
];
export default function AgentFilter() {
  const { recordingId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [open5, setOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const open3 = Boolean(anchorE3);

  const [openLogout, setOpenLogout] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }
  const handleClickLogout = (Transition) => () => {
    setTransition(() => Transition);
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorE2(null);
  };

  const handleClick2 = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE3(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose4 = () => {
    setOpen(false);
  };
  ///
  const [age, setAge] = React.useState("");
  const id = open2 ? "simple-popover" : undefined;
  const id3 = open3 ? "simple-popover" : undefined;
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [list, setList] = useState("");
  return (
    <div>
      <Grid>
        <Typography variant="h5" gutterBottom>
          Managers list
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick1}
          >
            Add+
          </Button>
          <Popover
            id={id}
            open={open2}
            anchorEl={anchorE2}
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
            <Typography sx={{ p: 2 }}>Create a new manager</Typography>
            <Typography sx={{ p: 2 }}>
              <Stack>
                Name:
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  variant="standard"
                />
              </Stack>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Stack>
                Email:
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  variant="standard"
                />
              </Stack>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Stack>
                Password:
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  variant="standard"
                />
              </Stack>
            </Typography>
            <Typography sx={{ p: 2 }}>
              <Stack>
                <Button onClick={handleClickLogout(TransitionRight)}>
                  Save
                </Button>
              </Stack>
              <Snackbar
                open={openLogout}
                onClose={handleCloseLogout}
                TransitionComponent={transition}
                message="New supervisor added"
                key={transition ? transition.name : ""}
              />
            </Typography>
          </Popover>
        </Typography>
        <br></br>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search manager"
            variant="standard"
            onChange={(event) => {
              setList(event.target.value);
            }}
          />
        </Box>
        <br></br>
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
            borderBottom: "15px",
            borderColor: "black",
          }}
        >
          {supervisores
            .filter((item) => {
              if (list == "") {
                return item;
              } else if (
                item.nombre
                  .toLocaleLowerCase()
                  .startsWith(list.toLocaleLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => (
              <div
                key={item.nombre}
                style={{ borderBottom: "1px solid lightgrey" }}
              >
                <Stack spacing={2} direction="row">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBoxIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.nombre}
                      secondary={item.id}
                      sx={{ color: "#6f79a8" }}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                       {/*<MenuItem
                        style={{ backgroundColor: "transparent" }}
                      ></MenuItem>
                     <MenuItem>
                        <Typography
                          aria-describedby={id3}
                          variant="h6"
                          onClick={handleClick2}
                        >
                          Edit
                        </Typography>
                      </MenuItem>
                      <Popover
                        id={id3}
                        open={open3}
                        anchorEl={anchorE3}
                        onClose={handleClose2}
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
                        <Typography sx={{ p: 2 }}>
                          Edit manager information
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          <Stack>
                            Name:
                            <TextField
                              required
                              id="standard-required"
                              label="Required"
                              variant="standard"
                            />
                          </Stack>
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          <Stack>
                            Email:
                            <TextField
                              required
                              id="standard-required"
                              label="Required"
                              variant="standard"
                            />
                          </Stack>
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          <Stack>
                            Password:
                            <TextField
                              id="standard-password-input"
                              label="Password"
                              type="password"
                              variant="standard"
                            />
                          </Stack>
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          <Stack>
                            <Button>Save</Button>
                          </Stack>
                        </Typography>
                      </Popover>
                      */}
                      <MenuItem>
                        <Typography variant="h6" onClick={handleClickOpen}>
                          Delete
                        </Typography>
                      </MenuItem>
                      <Dialog
                        open={open5}
                        onClose={handleClose4}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure you want to delete this manager?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            This action can not be undone, so please make sure
                            you want to delete this profile
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose4}>No</Button>
                          <Button onClick={handleClose4} autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Menu>
                  </ListItem>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Button>
                </Stack>
              </div>
            ))}
        </List>
        {/* <Pagination count={5} /> */}
      </Grid>
    </div>
  );
}
