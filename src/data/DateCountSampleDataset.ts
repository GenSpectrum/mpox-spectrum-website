import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { DateCountSampleEntry, YearCountSampleEntry } from './DateCountSampleEntry';
import { fetchDateCountSamples } from './api-lapis';
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
}
