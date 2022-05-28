import { UnifiedDay } from '../helpers/date-cache';

export type DateRangeSelector = {
  dateFrom?: UnifiedDay;
  dateTo?: UnifiedDay;
  yearFrom?: number;
  yearTo?: number;
  yearMonthFrom?: string;
  yearMonthTo?: string;
};

export function addDateRangeSelectorToUrlSearchParams(selector: DateRangeSelector, params: URLSearchParams) {
  const { dateFrom, dateTo } = selector;
  if (dateFrom) {
    params.set('dateFrom', dateFrom.string);
  }
  if (dateTo) {
    params.set('dateTo', dateTo.string);
  }
  for (let attr of ['yearFrom', 'yearTo', 'yearMonthFrom', 'yearMonthTo'] as const) {
    if (selector[attr]) {
      params.set(attr, selector[attr]!.toString());
    }
  }
}
