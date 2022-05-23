import { UnifiedDay } from "../helpers/date-cache";

export type DateCountSampleEntry = {
  date: UnifiedDay | null;
  count: number;
};

export type YearCountSampleEntry = {
  year: number | null;
  count: number;
}
