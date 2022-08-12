import { LineageCountSampleDataset } from '../data/LineageCountSampleDataset';
import { Utils } from '../helpers/Utils';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';

type LineageBarChartProps = {
  lineageCounts: LineageCountSampleDataset;
};

export const LineageBarChart = ({ lineageCounts }: LineageBarChartProps) => {
  const data = useMemo(
    () =>
      Utils.sortByField(
        lineageCounts.payload.filter(l => !!l.lineage),
        x => x.lineage
      ),
    [lineageCounts]
  );

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey='lineage' type='category' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='count' fill='#228b22' />
      </BarChart>
    </ResponsiveContainer>
  );
};
