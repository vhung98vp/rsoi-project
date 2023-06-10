import React, {useState, useEffect} from 'react';
import {FormControl, Box, Button, Card, CardActionArea, CardContent, CardActions, CardMedia, 
  Grid, Typography, Container, InputLabel, Select, MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CategoryService, SetService } from '../services/CardService';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const levels = ['All', 'EASY', 'MEDIUM', 'HARD']

export default function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: 0,
    level: 'All'
  })
  const [categories, setCategories] = useState([]);
  const [sets, setSets] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const categoryList = await CategoryService.getAll();
    const setList = await SetService.getAll();
    setCategories([{id: 0, name: 'All'}, ...categoryList])
    setSets(setList)
    setSelectedSets(setList)
  }

  const handleChangeFilter = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
    let selected = sets;
    if(name == 'category'){
      if (value > 0) {
        selected = selected.filter(item => {return item.categoryId == value})
      }
      if (filter.level != 'All') {
        selected = selected.filter(item => {return item.level == filter.level})
      }
    } else {
      if (filter.category > 0) {
        selected = selected.filter(item => {return item.categoryId == filter.category})
      }
      if (value != 'All') {
        selected = selected.filter(item => {return item.level == value})
      }      
    }
    setSelectedSets(selected);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom>
              Home
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Explore sets in systems.
            </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="level"
                    value={filter.level}
                    onChange={handleChangeFilter}
                  >
                    {levels.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={filter.category}
                  onChange={handleChangeFilter}                  
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}> 
                <Button variant="contained" onClick={() => {navigate('/sets/form')}}>New Set</Button>
              </Grid>
            </Grid>
          </React.Fragment>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {selectedSets.map((set) => (
              <Grid item key={set.name} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea
                    onClick={() => {navigate('/sets/info', {state: {setUid: set.setUid}})}}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {set.name}
                      </Typography>
                      <Typography>
                        {set.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Typography>{set.username}</Typography>
                    </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}