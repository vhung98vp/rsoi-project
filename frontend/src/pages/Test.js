import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Box, Alert } from '@mui/material';
import { SetService } from '../services/CardService';
import TestType from '../components/TestType';
import { LearnService } from '../services/LearnService';
import { getToken } from '../services/Storage';

const cardForm = [{word: '', meaning: '', example: ''}]
export default function Test() {
  const {state} = useLocation();
  const navigate = useNavigate();
  if (!getToken(false)){
    return <Alert severity="error">You must login first </Alert>
  }
  const [cards, setCards] = useState(cardForm)
  const [cardId, setCardId] = useState(0);
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const set = await SetService.get(state.setUid);
    console.log(set)
    setCards(set.flashcards)
  }

  const handleAnswer = async (answer) => {
    setAnswers([...answers, answer])
    if (cardId < cards.length-1) {
      setCardId(cardId + 1)
    } else {
      let ans = [...answers, answer]
      const rate = Math.round(ans.filter(item => item == true).length / ans.length)
      await LearnService.update(state.setUid, {action: 'TEST', value: new Date().toISOString(), rate: rate})
      navigate('/library')
    }
  }
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }} >
      <Container maxWidth="md">
        <Grid container alignItems="center" justifyContent="center">
          <TestType content={cards[cardId]} submit={(result) => {handleAnswer(result)}}/>
        </Grid>
      </Container>
    </Box>
  );
};
