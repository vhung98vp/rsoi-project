import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box, CssBaseline, Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CategoryService } from '../services/CardService';
import { UserService } from '../services/UserService';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const dataForm = {
  id: null,
  name: '',
}

export default function Category() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState(dataForm);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const categoryList = await CategoryService.getAll();
    setCategories(categoryList)  
    const role = await UserService.getRole();
    if(role && role.admin) {
      setIsAdmin(true)
    }
  }

  const handleChangeInfo = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  function handleEdit(item) {
    setFormData(item)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if(formData.name != ''){
        if(formData.id == null) {
            await CategoryService.new({name: formData.name})
        } else {
            await CategoryService.update(formData.id, {name: formData.name})
        }
        setFormData(dataForm)
    }
    const categoryList = await CategoryService.getAll();
    setCategories(categoryList)  
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Paper spacing={1} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ p: 2 }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                Category
            </Typography>
          </Box>
          <React.Fragment>       
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <strong>#</strong>
            </Grid>
            <Grid item xs={6}>
              <strong>Name</strong>
            </Grid>
            <Grid item xs={4}>
            {isAdmin &&
              <strong>Action</strong>
              }
            </Grid>
            {categories.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={2}>
                  <strong>{index+1}</strong>
                </Grid>
                <Grid item xs={6}>
                    {item.name}
                </Grid>
                <Grid item xs={4}>
                    {isAdmin &&
                    <Button
                        variant="contained"
                        onClick={() => handleEdit(item)}
                    >
                        Edit
                    </Button>
                    }
                </Grid>
              </React.Fragment>
            ))}
            </Grid>
          {isAdmin && <Grid container spacing={3}>
              <Grid item xs={8}>
                <TextField
                  required
                  id="name"
                  name="name"
                  value={formData.name}
                  label="New category"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeInfo}
                />
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Save
                </Button>
                </Box>
              </Grid>
             </Grid>
            }
            
          </React.Fragment>
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}