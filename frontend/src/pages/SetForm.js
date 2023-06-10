import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, CssBaseline, Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { SetService, CategoryService } from '../services/CardService';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const levels = ['EASY', 'MEDIUM', 'HARD'];
const dataForm = {
  setUid: '',
  name: '',
  description: '',
  level: '',
  categoryId: 0,
  flashcards: [{word: '', meaning: '', example: ''}, {word: '', meaning: '', example: ''}, {word: '', meaning: '', example: ''}]
}

export default function SetForm() {
  const {state} = useLocation();
  console.log(state)
  const navigate = useNavigate();
  const [formData, setFormData] = useState(dataForm);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const categoryList = await CategoryService.getAll();
    setCategories(categoryList)   
    if(state) {
      const set = await SetService.get(state.setUid); 
      setFormData(set)
    }
  }

  const handleChangeInfo = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleGridChange = (event, index, field) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedGridList = [...prevFormData.flashcards];
      updatedGridList[index][field] = value;

      return {
        ...prevFormData,
        flashcards: updatedGridList
      };
    });
  };

  const handleGridAddRow = () => {
    setFormData((prevFormData) => {
      const updatedGridList = [...prevFormData.flashcards];
      updatedGridList.push({ word: '', meaning: '', example: '' });

      return {
        ...prevFormData,
        flashcards: updatedGridList
      };
    });
  };

  const handleGridRemoveRow = (index) => {
    setFormData((prevFormData) => {
      const updatedGridList = [...prevFormData.flashcards];
      updatedGridList.splice(index, 1);

      return {
        ...prevFormData,
        flashcards: updatedGridList
      };
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if(formData.setUid == ''){
      //Create new
      await SetService.new(formData);
    } else {
      // Update current set
      await SetService.update(formData.setUid, formData);
    }
    navigate('/library')
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" >
        <Paper spacing={1} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Set Information
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  value={formData.name}
                  label="Set name"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  value={formData.description}
                  label="Set description"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeInfo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="level"
                    value={formData.level}
                    onChange={handleChangeInfo}
                  >
                    {levels.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChangeInfo}                  
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            </Grid>
          <Typography component="h2" variant="h4" align="center">
            Card List
          </Typography>
            
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <strong>#</strong>
            </Grid>
            <Grid item xs={3}>
              <strong>Word</strong>
            </Grid>
            <Grid item xs={3}>
              <strong>Meaning</strong>
            </Grid>
            <Grid item xs={5}>
              <strong>Example</strong>
            </Grid>
            {formData.flashcards.map((gridItem, index) => (
              <React.Fragment key={index}>
                <Grid item xs={1}>
                  <strong>{index+1}</strong>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    value={gridItem.word}
                    onChange={(e) => handleGridChange(e, index, 'word')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    value={gridItem.meaning}
                    onChange={(e) => handleGridChange(e, index, 'meaning')}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    value={gridItem.example}
                    onChange={(e) => handleGridChange(e, index, 'example')}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
            <Grid item xs={12}>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleGridAddRow}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleGridRemoveRow}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Save
              </Button>
            </Box>
          </React.Fragment>
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}