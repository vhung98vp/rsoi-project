import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

export default function Chart({activities}) {
  //const data = chartData.map(item => { return createData(item.time, item.amount)})
  const theme = useTheme();
  function countByMinute(requests){
    let countByMinute = {};

    for (let i = 0; i < requests.length; i++) {
      let request = requests[i];
      let minute = request.slice(0, 16); // Extract the hour part of the timestamp

      if (countByMinute[minute]) {
        countByMinute[minute] += 1;
      } else {
        countByMinute[minute] = 1;
      }
    }
    let result = [];
  
    for (let minute in countByMinute) {
      result.push({ time: minute.slice(11,16), amount: countByMinute[minute] });
    }  
    return result;
  }

  const data = countByMinute(activities.map(item => {return item.date}))
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Last hour
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Actions
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}