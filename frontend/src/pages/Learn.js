import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Box, Button, Alert } from '@mui/material';
import Flashcard from '../components/FlashCard';
import { SetService } from '../services/CardService';
import { LearnService } from '../services/LearnService';
import { getToken } from '../services/Storage';

const cardForm = [{word: '', meaning: '', example: ''}]

export default function Learn() {
  const {state} = useLocation();
  const navigate = useNavigate();
  if (!getToken(false)){
    return <Alert severity="error">You must login first </Alert>
  }
  const [cards, setCards] = useState(cardForm)
  const [cardId, setCardId] = useState(0);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if(!state) {
      navigate('/')
    } else {
      const set = await SetService.get(state.setUid);
      setCards(set.flashcards)
    }
  }

  const handleNext = async () => {
    if (cardId < cards.length-1) {
      setCardId(cardId + 1)
    } else {
      await LearnService.update(state.setUid, {action: 'LEARN', value: new Date().toISOString()})
      navigate('/library')
    }
  }
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }} >
      <Container maxWidth="md">
        <Grid container alignItems="center" justifyContent="center">
          <Flashcard content={cards[cardId]} />
        </Grid>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </Box>
  );
};
