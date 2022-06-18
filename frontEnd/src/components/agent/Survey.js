import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Box, Typography, Checkbox, FormGroup } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth";
import Alert from '@mui/material/Alert';


export default function Survey({ status, closeTicket }) {
  const auth = useAuth();
  const [ratingElements, setRatingElements] = useState([]);
  let values = []

  //Get survey questions.
  useEffect(() => {
    axios.get('https://azul-api.ccmchallenges.com/employees/survey', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(res => {
      console.log(res);
      
      if (res !== null){
        const survey = JSON.parse(res.data.survey);
        setRatingElements(survey);
        ratingElements.forEach(element => values.push({question: element.Question, answer: []}));
        auth.answers(values)
      }
    });
  }, [])

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Rate call
      </Typography>
      <Box component="form" onSubmit={closeTicket}>
      {ratingElements.map((element) => {
        return (
          <Box component="div">
            <FormControl>
              <FormLabel>{element.Question}</FormLabel>
              {element.Type === "Single answer question" && (
                <RadioGroup name={element.Question} row>
                  {element.Answers.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              )}
              {element.Type === "Multiple answer question" && (
                <FormGroup name={element.Question} row>
                  {element.Answers.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Checkbox name={element.Question} />}
                      label={option}
                    />
                  ))}
                </FormGroup>
              )}
            </FormControl>
          </Box>
        );
      })}
        <Box component="div" mt={4}>
          {status === "recording" ? (
              <Alert severity="warning">Click on 'Stop sharing' to end video!</Alert>
          ) : (
          <Button variant="outlined" type="submit">
            Close ticket
          </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
