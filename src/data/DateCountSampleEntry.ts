import { UnifiedDay, UnifiedIsoWeek } from '../helpers/date-cache';

export type DateCountSampleEntry = {
  date: UnifiedDay | null;
  count: number;
};

export type MonthCountSampleEntry = {
  year: number | null;
  month: number | null;
  count: number;
};

export type YearCountSampleEntry = {
  year: number | null;
  count: number;
};

export type WeekCountSampleEntry = {
  week: UnifiedIsoWeek | null;
  count: number;
};
