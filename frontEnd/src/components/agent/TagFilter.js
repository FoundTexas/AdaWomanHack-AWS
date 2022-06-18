import React, { useState, useEffect } from "react";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAuth } from "../auth";
import axios from "axios";

export default function Tags({ selectedTagList, setSelectedTagList }) {

  const auth = useAuth();

  const [tagList, setTagList] = useState([]);

  // Get tags
  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + auth.user.token
      },
      url: 'https://azul-api.ccmchallenges.com/employees/survey',
    })
    .then(function (response) {
     const questions = JSON.parse(response.data.survey);
     let tags = [];
     questions.forEach(item => {
      item.Answers.forEach(answer => {
        tags.push(answer);
      })
      setTagList(tags);
     })
      })
  }, []);
  
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={tagList}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Tags"
            placeholder="Filter by tag"
          />
        )}
        onChange={(event, value) => setSelectedTagList(value)}
      />
    </Stack>
  );
}
