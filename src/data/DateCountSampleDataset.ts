import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { DateCountSampleEntry, WeekCountSampleEntry, YearCountSampleEntry } from './DateCountSampleEntry';
import { fetchDateCountSamples, fetchYearCountSamples } from './api-lapis';
import { Utils } from '../helpers/Utils';

export type DateCountSampleDataset = Dataset<LapisSelector, DateCountSampleEntry[]>;

export type YearCountSampleDataset = Dataset<LapisSelector, YearCountSampleEntry[]>;

export class DateCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<DateCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchDateCountSamples(selector, signal),
    };
  }

  static async yearCountFromApi(
    selector: LapisSelector,
    signal?: AbortSignal
  ): Promise<YearCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchYearCountSamples(selector, signal),
    };
  }

  static toYearCountSampleEntries(dateCountSampleEntries: DateCountSampleEntry[]): YearCountSampleEntry[] {
    const grouped = Utils.groupBy(dateCountSampleEntries, e => e.date?.dayjs.year() ?? -1);
    const result = [];
    for (let [year, e] of grouped.entries()) {
      result.push({
        year: year !== -1 ? year : null,
        count: e.reduce((prev, curr) => prev + curr.count, 0),
      });
    }
    return result;
  }

  static toWeekCountSampleEntries(dateCountSampleEntries: DateCountSampleEntry[]): WeekCountSampleEntry[] {
    const grouped = Utils.groupBy(dateCountSampleEntries, e => e.date?.isoWeek ?? -1);
    const result = [];
    for (let [week, e] of grouped.entries()) {
      result.push({
        week: week !== -1 ? week : null,
        count: e.reduce((prev, curr) => prev + curr.count, 0),
      });
    }
    return result;
  }
}
