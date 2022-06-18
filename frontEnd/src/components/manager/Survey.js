import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import { array } from 'i/lib/util';

const TAGS = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
];

export default function Survey() {
  const [tagsInQueue, setTagsInQueue] = React.useState(TAGS.slice(0, 1));

  const handleAddTags = () => {
    /*const nextHiddenItem = TAGS.find((i) => !tagsInQueue.includes(i));
    if (nextHiddenItem) {
        setTagsInQueue((prev) => [nextHiddenItem, ...prev]);
    }*/
    console.log(chipData)
  };

  const handleRemoveFruit = (item) => {
    setTagsInQueue((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addTagButton = (
    <Button
      variant="contained"
      disabled={tagsInQueue.length >= TAGS.length}
      onClick={handleAddTags}
    >
      Save Tags
    </Button>
  );


  const [chipData, setChipData] = React.useState([[]]);

  //var chipsData[QUESTIONS] = new array;


  // This come from the select form onChange
{/*}  const handleSelect = e => {
    setChipData([...chipData, { key: e.target.value, label: e.target.value }]);
  };*/}

  const handleSelect = (e, item) => {
    setChipData([...chipData, { key: e.target.value, label: e.target.value }]);
  };

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
  };


  return (
    <div>
        <br></br>
      {addTagButton}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {tagsInQueue.map((item) => (
              <Collapse key={item}>

                    <ListItem
                        secondaryAction={
                            <IconButton
                            edge="end"
                            aria-label="delete"
                            title="Delete"
                            onClick={() => handleRemoveFruit(item)}
                            >
                            <DeleteIcon />
                            </IconButton>
                        }
                        >

                        <Stack spacing={3} direction="row">
                        {/*
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                            >
                            <TextField fullWidth label="Tags" id="Tags" color="primary" focused />
                        </Box>
                          */}

                       {/* <TextField select value={userValues} onChange={e => handleSelect(e)}>
                            {userArray.map(option => (
                            <MenuItem key={option.key} value={option.label}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                            */}

                        <TextField
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSelect(e, item)
                                    //console.log(chipData);
                                   // chipsData[parseInt(item)].push(e.target.value);
                                    //console.log(chipsData);

                                }
                            }}
                            label="Tags"
                           
                            color="secondary" focused


                            />
                        
                        
                        
                        {chipData.map((data, index) => {
                            return (
                            <Chip
                                key={data.key + index}
                                label={data.label}
                                onDelete={handleDelete(data)}
                            />
                            );
                        })}

                        
                        </Stack>

                        </ListItem>
                  
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
}
