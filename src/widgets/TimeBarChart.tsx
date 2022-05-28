import {
  DateCountSampleData,
  DateCountSampleDataset,
  YearCountSampleDataset,
} from '../data/DateCountSampleDataset';
import { globalDateCache } from '../helpers/date-cache';
import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import dayjs from 'dayjs';

type Props = {
  dateCounts: DateCountSampleDataset;
  yearCounts: YearCountSampleDataset;
};

export const TimeBarChart = ({ dateCounts, yearCounts }: Props) => {
  const { notEnoughData, yearly, weekly, weeklyTicks } = useMemo(() => {
    const dates = dateCounts.payload.filter(e => e.date).map(e => e.date!);
    const range = globalDateCache.rangeFromDays(dates);
    if (!range) {
      return { notEnoughData: true };
    }
    if (range.min.dayjs.isAfter(dayjs('2022-01-01'))) {
      // Show weekly if only looking at 2022
      return {
        notEnoughData: false,
        weekly: DateCountSampleData.toWeekCountSampleEntries(dateCounts.payload)
          .filter(x => x.week)
          .map(x => ({
            week: x.week!,
            weekNumber: x.week!.isoWeek,
            count: x.count,
          })),
        weeklyTicks: [range.min.isoWeek.isoWeek, range.max.isoWeek.isoWeek],
      };
    } else {
      return {
        notEnoughData: false,
        yearly: yearCounts.payload,
      };
    }
  }, [dateCounts, yearCounts]);

  if (notEnoughData) {
    return <>There is not enough data to draw a plot.</>;
  }

  if (yearly) {
    return (
      <>
        <ResponsiveContainer>
          <BarChart data={yearly}>
            <XAxis dataKey='year' type='number' domain={['dataMin', 'dataMax']} />
            <YAxis />
            <Tooltip />
            <Bar dataKey='count' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }

  if (weekly && weeklyTicks) {
    const formatXAxis = (tickItem: any) => {
      return 'Week ' + tickItem;
    };
    return (
      <>
        <ResponsiveContainer>
          <BarChart data={weekly}>
            <XAxis
              dataKey='weekNumber'
              type='number'
              domain={['dataMin', 'dataMax']}
              ticks={weeklyTicks}
              tickFormatter={formatXAxis}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey='count' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }

  return <>Unexpected error.</>;
};
