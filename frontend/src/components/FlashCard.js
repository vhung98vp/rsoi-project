import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActionArea} from '@mui/material';

const Flashcard = ({ content }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} onClick={handleFlip}>
        <CardActionArea sx={{ height: '200px', width:'300px', alignContent: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                {isFlipped ? content.meaning : content.word}
                </Typography>
                <Typography variant="body1">
                {isFlipped ? '' : content.example}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>  
  );
};


export default Flashcard;