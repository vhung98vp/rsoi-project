import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, CssBaseline, Container, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { SetService } from '../services/CardService';
import { LearnService } from '../services/LearnService';
import { getUser } from '../services/Storage';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const cardForm = {word: '', meaning: '', example: ''}
const dataForm = {
  setUid: '',
  name: '',
  description: '',
  level: '',
  categoryId: 0,
  flashcards: [cardForm, cardForm, cardForm]
}
export default function SetInfo() {
  const {state} = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(dataForm);
  
  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const set = await SetService.get(state.setUid);    
    setFormData(set)
  }

  const handleEdit = () => {
    if(formData.username == getUser()) {
      navigate('/sets/form', {state})
    } else {
      alert("You don't have access right!")
    }
  }
  async function handleSave(setUid) {
    try{
      await LearnService.new(setUid)
      navigate('/library')
    } catch (e) {
      alert("You don't have access right!")
    }
  }
  async function handleDelete(setUid) {
    try {
      await SetService.delete(setUid)
      navigate('/library')
    } catch (e) {
      alert("You don't have access right!")
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" >
        <Paper spacing={1} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {formData.name}
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}> 
                {formData.description}
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
                  {gridItem.word}
                </Grid>
                <Grid item xs={3}>
                  {gridItem.meaning}
                </Grid>
                <Grid item xs={5}>
                  {gridItem.example}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
            <Grid item xs={12}>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => handleSave(formData.setUid)}
                sx={{ mt: 3, ml: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleEdit}
                sx={{ mt: 3, ml: 1 }}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => handleDelete(formData.setUid)}
                sx={{ mt: 3, ml: 1 }}
              >
                Delete
              </Button>
            </Box>
          </React.Fragment>
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}