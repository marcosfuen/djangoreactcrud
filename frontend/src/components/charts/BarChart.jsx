import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// const chartSetting = {
// //   xAxis: [
// //     {
// //       label: 'rainfall (mm)',
// //     },
// //   ],
//   yAxis: [
//     {
//         label: 'cantidad',
//     },
//   ],
//   height: 300,
// };


export default function MyBarChart({dataset, xlabelName, series}) {

  return (
    <BarChart
      dataset={dataset}
      xAxis={[
        { 
        scaleType: 'band', 
        dataKey: xlabelName,
        tickLabelStyle: {
            textAnchor: 'start',            
          },
        }
    ]}
      series={series}
      width={500}
      height={300}
    //   layout="vertical"
    //   {...chartSetting}
    />
  );
}

