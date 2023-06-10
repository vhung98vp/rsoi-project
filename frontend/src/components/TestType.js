import React, { useState } from 'react';
import { Typography, TextField, Alert, Button, Card, CardActionArea, CardContent} from '@mui/material';

const TestType = ({ content, submit }) => {
  const [formData, setFormData] = useState({
    answer: '',
    result: null,
    submit: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.submit) {
      setFormData((prevFormData) => ({...prevFormData, answer: '', result: null}))
      submit(formData.result);
    } else {
      const result = content.word.trim().toLowerCase() === formData.answer.trim().toLowerCase();
      setFormData((prevFormData) => ({...prevFormData, result: result}))
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      submit: !prevFormData.submit
    }));
  }

  return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea sx={{ height: '200px', width:'300px', alignContent: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="h2"> {content.meaning} </Typography>
                <TextField
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  label="Type word"
                  disabled={formData.submit}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
            </CardContent>
        </CardActionArea>
        <Button onClick={handleSubmit}>{formData.submit? 'Next' : 'Check'}</Button>
        {formData.result == true && <Alert severity="success">Correct!</Alert>}
        {formData.result == false && <Alert severity="error">Incorrect!</Alert>}
        
      </Card>  
  );
};


export default TestType;