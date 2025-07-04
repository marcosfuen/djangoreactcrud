import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function MyPieChart({myData}) {
  return (
    <PieChart
      series={[
        {
            // arcLabel: (item) => `${item.value}`,
            data: myData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            // outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            // startAngle: -45,
            // endAngle: 225,
            // cx: 150,
            // cy: 150,
        },
      ]}
      width={200}
      height={200}
    />
  );
}
