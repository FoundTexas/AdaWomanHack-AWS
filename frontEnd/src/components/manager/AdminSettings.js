import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Switch, FormControlLabel, Typography, Box, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoManager from "./Call_center_amico.png";
import Snackbar from '@mui/material/Snackbar';

import axios from 'axios';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { cleanup } from '@testing-library/react';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminSettings() {

 const [openLogoutEdit, setOpenLogoutEdit] = React.useState(false);
 const [QUESTIONS, setQUESTIONS] = React.useState([]);
 const [loadingState, setLoadingState] = React.useState(true);
 const [open, setOpen] = React.useState(false);
 const [saveSettings, setSaveSettings] = React.useState(false);

 function sendData(){
   setSaveSettings(true);
   setTimeout(() => setSaveSettings(false), 3000);
 }


 
 
 //Get survey questions.
 React.useEffect(() => {
  {/*axios.get(`${miPostURL}/getone/Manager/1`).then((response) => { */}
  axios.get('https://azul-api.ccmchallenges.com/employees/survey', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }
  }).then((response) => {
      var trimedData = response.data.survey.trim();
      var JSONdata = JSON.parse(trimedData);
      console.log("JsonData");

       if(QUESTIONS.length < 1) {
          setQUESTIONS(JSONdata);
          console.log(QUESTIONS.Question);  
       }
 
    });
  }, [QUESTIONS]);


  const [minimumCallTime, setMinimumCallTime] = React.useState('');

  //List of employees (supervisor only sees their agents).
  React.useEffect(() => {
    axios.get('https://azul-api.ccmchallenges.com/employees/settings', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
      setMinimumCallTime(response.data);
      setLoadingState(false);
    });
  }, []);

  function editSettings() {
    axios.put('https://azul-api.ccmchallenges.com/employees/settings',
    {
      settings: parseInt(minimumCallTime)
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {  setOpenLogoutEdit(true); });
  }



  //Post new questions to survey.
  function updateSurvey(){
    var stringJSON = JSON.stringify(QUESTIONS);
    axios.post('https://azul-api.ccmchallenges.com/employees/survey', {
      survey: stringJSON,
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then((response) => {
        setPost(response.data); setOpenLogoutEdit(true); setOpen(false);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [loading, setLoading] = React.useState(false);

  function handleClick() {
    setLoading(true);
  }

  const [question, setQuestion] = React.useState({Question: '', Answer:'', Type:'Single answer question'});

  const handleCloseLogoutEdit = () => {
    setOpenLogoutEdit(false);
  };

  const handleAddFruit = () => {
    const nextHiddenItem = QUESTIONS.find((i) => !QUESTIONS.includes(i));
    if (nextHiddenItem) {
      setQUESTIONS((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item) => {
    setQUESTIONS((prev) => [...prev.filter((i) => i !== item)]);
  };
 
  const [chipData, setChipData] = React.useState([]);
  const [allAnswers, setAllAnswers] = React.useState([]);

  function addQuestionButton(){
    setChipData([...chipData, { key: question.Answer, label: question.Answer }]);
    setAllAnswers(prevAnswers => [...prevAnswers, question.Answer]);
    setQuestion({
      ...question,
      Answer: ""
  }); 
  }

  const handleSelect = (e) => {
    setChipData([...chipData, { key: e.target.value, label: e.target.value }]);
    setAllAnswers(prevAnswers => [...prevAnswers, e.target.value]);
    setQuestion({
      ...question,
      Answer: ""
  });  
  };

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    setAllAnswers(answers => answers.filter(answers => answers !== chipToDelete.key));
  };


  const addItemLocally = () => {
    QUESTIONS.push({
        Question: question.Question,
        Answers: allAnswers,
        Type: question.Type ? "Single answer question" : "Multiple answer question"
    });
    setQuestion({Question: "", Answer: "", Type: ""});
    setChipData([]);
    setAllAnswers([]);
    handleAddFruit();
  };

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    console.log(QUESTIONS);
}, [QUESTIONS]);


  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
    };
  
  const handleCloseDelete = (e) => {
    console.log("Hi" + QUESTIONS.length);
    setQUESTIONS([{Question:"Call rating",Answers:["1","2","3","4","5"]}]);
    console.log("AFTER" + QUESTIONS.length)
    setOpenDelete(false);
  };

  return (
    <>

    

    { loadingState === true

?
  <Box sx={{ 
    position: 'absolute',
    top: '50%',
    left: '55%',
    marginTop: 0,
    marginLeft: 0,
    width: '100px',
    height: '100px'
    }}>
    <CircularProgress />
  </Box>

:

<>
    

<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:'100%',
        marginTop:'5%'
      }}

    >

      <Paper elevation={21}
      
      sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width:'40%',
          height:'100%',
          marginRight: '48%',
          zIndex: 999
        }}
      >

      <Box>

      <Typography variant="h4" gutterBottom sx={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'}}>
      System settings
    </Typography>

    <br></br>
    <Typography variant="h6" sx={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
          fontWeight: "normal"}}>
      Minimum call time (min)
    </Typography>

      <TextField style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //marginLeft: '45%',
        marginTop: '5%' 
      }}
      
      
      type={"number"} min="1" max="999" color="primary" autoFocus value={minimumCallTime} onChange={(event) => { 
                              setMinimumCallTime(event.target.value) }}/>
  

    <br></br>
    <br></br>

    <Typography variant="h6" sx={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
          fontWeight: "normal"}}>
      Post call survey for agents
    </Typography>

    <Button 
    sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: "5%"
    }}  
    variant='outlined' onClick={handleClickOpen}>Display questions</Button>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <Box sx={{float: 'left', marginBottom:'5%'}}>

      <LoadingButton
        size="large"
        onClick={() => {editSettings(); sendData();}}
        disabled={saveSettings}
        endIcon={<SaveIcon />}
        loadingPosition="end"
        variant="contained"
        sx={{width: 250}}
      >
        Save
      </LoadingButton>
    </Box>

    </Box>

      </Paper>
    </Box>


    

 
    
  


    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative'}}>
          <Toolbar sx={{backgroundColor: '#9fa8da', position: 'fixed', width: '100%'}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Agents' Survey Questions
            </Typography>

          </Toolbar>
        </AppBar>

        <Box sx={{marginLeft: '5%', marginTop: '2%'}}>
       
          
         
        <Stack spacing={100} direction="row" sx={{marginTop:'5%'}}>
              <Stack spacing={3} direction="row">

                  <Button
                          variant="contained"
                          onClick={addItemLocally}
                          color = "primary"
                          >
                          Add question
                  </Button>

                  <Button
                          variant="contained"
                          color = "success"

                          onClick={updateSurvey}

                      >
                          Save questions
                  </Button>
              </Stack>
{/*
        
                <Button

                        variant="contained"
                        color = "error"
                        onClick={handleClickOpenDelete}
                >
                      
                        Delete all questions
                </Button>

*/}







          </Stack>




          


          <br></br>

<Typography variant="h6" gutterBottom>New Question</Typography>





            <Stack spacing={3} direction="row" sx={{margin: '1%'}}>
            
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="Question" id="Question" color="primary" value={question.Question} focused onChange={(event) => {
                    setQuestion({
                        ...question,
                        Question: event.target.value
                    });                            
                    }}/>
            </Box>


            <TextField
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSelect(e)
                    }
                }}
                label="Answer"
               
                color="secondary"
                
                value={question.Answer}
                
                focused

                onChange={(event) => {
                    
                    setQuestion({
                        ...question,
                        Answer: event.target.value
                    });                         
                }}
                />

              <Button
                      variant="outlined"
                      color = "secondary"
                      onClick = {addQuestionButton}
              >
                      Save answer
              </Button>

            </Stack>

            <FormGroup sx={{marginLeft: '1%'}}>
                <FormControlLabel control={<Checkbox defaultChecked  onChange={(event) => {
                    setQuestion({
                        ...question,
                        Type: event.target.checked
                    });                            
                    }}
                />} label="Single answer question" />
            </FormGroup>
            
            <br></br>

            <Typography variant="h6" gutterBottom>Answers</Typography>

            <Stack spacing={2} direction="row" sx={{marginLeft: '1%', marginTop: '1%'}}>

              <Box sx={{borderBottom: '2px solid #6f79a8', width: '64%', minHeight:'20'}}>
              

              {chipData.map((data, index) => {
                console.log("CHIP:" + data.label)
                  return (
                  <Chip
                      sx={{marginRight:'1%', marginTop:'3%', marginBottom:'0.7%', marginLeft: '1%', backgroundColor: '#d1d9ff'}}
                      key={data.key + index}
                      label={data.label}
                      onDelete={handleDelete(data)}
                      
                  />
                  );
              })}

              </Box>

            </Stack>

          
          <br></br>
          <br></br>

          </Box>

          <Divider sx={{ borderBottomWidth: 2 }}/>


          <Box sx={{marginLeft: '5%', marginTop: '2%'}}>

          <Typography variant="h5" gutterBottom>Current Questions</Typography>

                        <Box sx={{ mt: 1 }}>
                            <List>
                            <TransitionGroup>
                                {QUESTIONS.map((item) => (
                                <Collapse key={item.Question}>

                                <ListItem>

                                      
                                        <Box sx={{border: '2px solid #6f79a8', width: '94%', borderRadius: '7px'}}>

                                        <Stack spacing={2} direction="row" sx={{margin: '1%'}}>

                                          <Box sx={{borderRight: '2px solid #6f79a8', width: '50%'}}> 
                                          
                                          
                                          <ListItemText primary={item.Question} secondary={item.Type} sx={{ color: '#6f79a8' }} />

                                          </Box>
                                          
                                          <Box sx={{width:'55%'}}>
                                          {item.Answers?.map((data) => {
                                              return (
                                              <Chip
                                                  sx={{marginRight:'1%', marginTop:'2%', marginBottom:'1%', backgroundColor: '#d1d9ff'}}
                                                  label={data}
                                              />
                                              );
                                          })}

                                          </Box>


                                          



                                        </Stack>

                                        

                                        </Box>
                                        {
                                          QUESTIONS.length > 1 ?
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                title="Delete"
                                                onClick={() => handleRemoveFruit(item)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                          :
                                          null

                                        }


                                    </ListItem>
                                    
                                </Collapse>
                                ))}
                            </TransitionGroup>
                            </List>
                        </Box>
      

      
        

        

          </Box>
      </Dialog>





      <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete all the videos?"}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
              This action can not be undone, so please make sure you want to delete this profile
              </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleCloseDelete}>No</Button>
              <Button color="error" onClick={handleCloseDelete} autoFocus>
              Yes
              </Button>
              </DialogActions>
    </Dialog>


    <img
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: 0,
          margin: 0,
          height: "70%",
          width: "40%",
          zIndex: 1
        }}
        src={LogoManager}
      />

      <Snackbar
                        open={openLogoutEdit}
                        autoHideDuration={3000}
                        onClose={handleCloseLogoutEdit}
                        message="Changes have been saved."
                        key='2'
        />

      
      </>

}
      
  </>
  );
}

export default AdminSettings;
