import { UnifiedDay } from '../helpers/date-cache';

export type DateRangeSelector = {
  dateFrom?: UnifiedDay;
  dateTo?: UnifiedDay;
};

export function addDateRangeSelectorToUrlSearchParams(selector: DateRangeSelector, params: URLSearchParams) {
  const { dateFrom, dateTo } = selector;
  if (dateFrom) {
    params.set('dateFrom', dateFrom.string);
  }
  if (dateTo) {
    params.set('dateTo', dateTo.string);
  }
}
