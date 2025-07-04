import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const myData = [
    {
        month: 'January',
        attendece1: 10,
        attendece2: 5,
        attendece3: 8,

    },
    {
        month: 'Febrruari',
        attendece1: 12,
        attendece2: 15,
        attendece3: 9,

    },
    {
        month: 'March',
        attendece1: 20,
        attendece2: 13,
        attendece3: 2,

    }

]

export default function MyBasicLineChart() {
  return (
    <LineChart
      dataset={myData}
      xAxis={[{ 
        dataKey: 'month',
        scaleType: 'point',
      }]}
      series={[
        {
            dataKey: 'attendece1', label: 'Attendece-1' 
        },
        {
            dataKey: 'attendece2', label: 'Attendece-2' 
        },
        {
            dataKey: 'attendece3', label: 'Attendece-3' 
        },
      ]}
      height={300}
    />
  );
}
