import { globalDateCache, UnifiedDay } from '../helpers/date-cache';

export type FullSampleAggEntry = {
  date: UnifiedDay | null;
  year: number | null;
  month: number | null;
  region: string | null;
  country: string | null;
  division: string | null;
  host: string | null;
  clade: string | null;
  lineage: string | null;
  count: number;
};

export type FullSampleAggEntryField =
  | 'date'
  | 'region'
  | 'country'
  | 'division'
  | 'host'
  | 'clade'
  | 'lineage'
  | 'count';

export type FullSampleAggEntryRaw = Omit<FullSampleAggEntry, 'date'> & {
  date: string | null;
};

export function parseFullSampleAggEntry(raw: FullSampleAggEntryRaw): FullSampleAggEntry {
  return {
    ...raw,
    date: raw.date ? globalDateCache.getDay(raw.date) : null,
  };
}
