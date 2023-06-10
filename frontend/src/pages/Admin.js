import React, {useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, Box, Toolbar, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Alert, Button} from '@mui/material';
import Chart from '../components/Chart';
import { UserService } from '../services/UserService';
import {StatisticService} from '../services/StatisticService'; 
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const role = await UserService.getRole();
      if(role && role.admin) {
        setIsAdmin(true)
        const res = await StatisticService.getAll(currentPage, 10);
        setActivities(res.items)
      }
    }
  
    fetchData();
  }, [])

  const handleSelectTime = async() => {
    setCurrentPage(currentPage + 1)
    const res = await StatisticService.getAll(currentPage + 1, 10);
    setActivities(activities.concat(res.items))
    console.log(currentPage)
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />   
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Toolbar />    
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> 
        {isAdmin ?
            <Grid container spacing={3}>
              <Grid item xs={12}>                
                  <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                  <Chart activities={activities}/>
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
                  <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom >
                    Activities
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>DateTime</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>URL</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activities.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.method}</TableCell>
                          <TableCell>{row.url}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button color="primary" onClick={handleSelectTime} sx={{ mt: 3 }}>
                    See more
                  </Button>
                </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
            :
            <Alert severity="error" align="center">You don't have access right </Alert>
            }
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}