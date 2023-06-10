import React, {useState, useEffect} from 'react';
import {FormControl, Box, Button, Card, CardActionArea, CardContent, CardActions, CardMedia, 
  Grid, Typography, Container, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CategoryService, SetService } from '../services/CardService';
import { LearnService } from '../services/LearnService';
import { getUser } from '../services/Storage';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const levels = ['All', 'EASY', 'MEDIUM', 'HARD']

export default function Library() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: 0,
    level: 'All'
  })
  const [categories, setCategories] = useState([]);
  const [sets, setSets] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [noticedSets, setNoticedSets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));

  useEffect(() => {
    fetchData();
  }, [])
  console.log(selectedSets)

  async function fetchData() {
    let username = getUser()
    console.log(username)
    const categoryList = await CategoryService.getAll();
    setCategories([{id: 0, name: 'All'}, ...categoryList])
    if(username != ''){
      const setList = await SetService.getAll(username);
      let learnedList = []
      learnedList = await SetService.getLearned();
      console.log(learnedList)
      learnedList = learnedList.filter(item => {return item.username != username})
      let noticeList = await LearnService.getNotice();
      console.log(noticeList)
      setNoticedSets(noticeList.map(item => {return item.setUid}))
      let fullList = setList.concat(learnedList)
      setSets(fullList)
      setSelectedSets(fullList)
    }
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

  const handleDialogClose = async (set) => {
    if (set) {
      console.log(selectedSet, selectedTime.toISOString())
      await LearnService.update(selectedSet, {action: 'NOTIFICATION', value: selectedTime.toISOString()})
    }
    setDialogOpen(false);
  };

  function handleNotice(setUid) {
    setSelectedSet(setUid)
    setDialogOpen(true);
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
              Your library
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              All your sets will be here.
            </Typography>
            <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)}>
              <DialogTitle>Notice</DialogTitle>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      ampm={false}
                      label="Select time"
                      value={selectedTime}
                      onChange={(newValue) => setSelectedTime(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
                <Button onClick={() => handleDialogClose(true)}>OK</Button>
              </DialogActions>
            </Dialog>
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
                      {noticedSets.includes(set.setUid) && <NotificationsIcon />}
                      <Typography>{set.username}</Typography>
                    </CardActions>
                    <CardActions>
                      <Button size="small" onClick={() => {navigate('/sets/learn', {state: { setUid: set.setUid }})}}>Learn</Button>
                      <Button size="small" onClick={() => {navigate('/sets/test', {state: { setUid: set.setUid }})}}>Test</Button>
                      <Button size="small" onClick={() => handleNotice(set.setUid)}>Notice</Button>
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