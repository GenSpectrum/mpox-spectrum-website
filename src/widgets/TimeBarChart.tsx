import {
  DateCountSampleData,
  DateCountSampleDataset,
  MonthCountSampleDataset,
  YearCountSampleDataset,
} from '../data/DateCountSampleDataset';
import { globalDateCache } from '../helpers/date-cache';
import { useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import { MonthCountSampleEntry, WeekCountSampleEntry } from '../data/DateCountSampleEntry';
import { Alert, AlertVariant } from '../helpers/ui';

type Props = {
  dateCounts: DateCountSampleDataset;
  monthCounts: MonthCountSampleDataset;
  yearCounts: YearCountSampleDataset;
};

export const TimeBarChart = ({ dateCounts, monthCounts, yearCounts }: Props) => {
  const [weekOrMonth, setWeekOrMonth] = useState<'week' | 'month'>('week');
  const { notEnoughData, yearly, monthly, monthlyTicks, weekly, weeklyTicks } = useMemo(() => {
    const dates = dateCounts.payload.filter(e => e.date).map(e => e.date!);
    const range = globalDateCache.rangeFromDays(dates);
    if (!range) {
      return {
        notEnoughData: true,
        yearly: undefined,
        monthly: undefined,
        monthlyTicks: undefined,
        weekly: undefined,
        weeklyTicks: undefined,
      };
    }
    const result = {
      notEnoughData: false,
      yearly: yearCounts.payload,
      monthly: undefined as MonthCountSampleEntry[] | undefined,
      monthlyTicks: undefined as [number, number] | undefined,
      weekly: undefined as WeekCountSampleEntry[] | undefined,
      weeklyTicks: undefined as [number, number] | undefined,
    };
    // Show weekly and monthly if only looking at 2022
    if (range.min.dayjs.isAfter(dayjs('2022-01-01'))) {
      result.weekly = DateCountSampleData.toWeekCountSampleEntries(dateCounts.payload)
        .filter(x => x.week)
        .map(x => ({
          week: x.week!,
          weekNumber: x.week!.isoWeek,
          count: x.count,
        }));
      result.weeklyTicks = [range.min.isoWeek.isoWeek, range.max.isoWeek.isoWeek];
      result.monthly = monthCounts.payload;
      result.monthlyTicks = [range.min.dayjs.month() + 1, range.max.dayjs.month()];
    }
    return result;
  }, [dateCounts, monthCounts, yearCounts]);

  if (notEnoughData) {
    return <>There is not enough data to draw a plot.</>;
  }

  let chart = <></>;

  if (monthly && monthlyTicks && weekOrMonth === 'month') {
    const formatXAxis = (tickItem: any) => {
      return 'Month ' + tickItem;
    };
    chart = (
      <ResponsiveContainer>
        <BarChart data={monthly}>
          <XAxis
            dataKey='month'
            type='number'
            domain={['dataMin', 'dataMax']}
            ticks={monthlyTicks}
            tickFormatter={formatXAxis}
          />
          <YAxis />
          <Tooltip labelFormatter={(value: unknown) => 'Month ' + value} />
          <Bar dataKey='count' fill='#228b22' />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (weekly && weeklyTicks && weekOrMonth === 'week') {
    const formatXAxis = (tickItem: any) => {
      return 'Week ' + tickItem;
    };
    chart = (
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
          <Tooltip labelFormatter={(value: unknown) => 'Week ' + value} />
          <Bar dataKey='count' fill='#228b22' />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (yearly) {
    chart = (
      <ResponsiveContainer>
        <BarChart data={yearly}>
          <XAxis dataKey='year' type='number' domain={['dataMin', 'dataMax']} />
          <YAxis />
          <Tooltip />
          <Bar dataKey='count' fill='#228b22' />
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    return <>Unexpected error.</>;
  }

  const weekMonthSwitch = (
    <div className='mb-4'>
      <button
        className={weekOrMonth === 'week' ? ' font-bold' : 'underline'}
        onClick={() => setWeekOrMonth('week')}
      >
        Weekly bars
      </button>{' '}
      |{' '}
      <button
        className={weekOrMonth === 'month' ? ' font-bold' : 'underline'}
        onClick={() => setWeekOrMonth('month')}
      >
        Monthly bars
      </button>
    </div>
  );

  return (
    <div className='h-full flex flex-col'>
      <Alert variant={AlertVariant.INFO}>
        <b>Note:</b> There are many sequences for which we only know the year or the year and the month. If
        the exact date of a sequence is unavailable, it is excluded from the weekly chart. If the exact month
        is unknown, it is also excluded from the monthly chart.
      </Alert>
      {weekly && weekMonthSwitch}
      <div className='flex-grow'>{chart}</div>
    </div>
  );
};
