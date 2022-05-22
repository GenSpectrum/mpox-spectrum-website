import { UnifiedDay } from '../helpers/date-cache';

export type DetailsSampleEntry = {
  strain: string;
  sraAccession: string | null;
  date: UnifiedDay | null;
  region: string | null;
  country: string | null;
  clade: string | null;
  host: string | null;
};
