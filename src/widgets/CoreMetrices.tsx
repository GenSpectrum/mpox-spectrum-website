import { CountryCountSampleDataset } from '../data/CountryCountSampleDataset';
import { useMemo } from 'react';
import { GridCell, PackedGrid } from '../components/PackedGrid';
import { Card } from '../components/NamedCard';
import Metric from '../components/Metrics';

type Props = {
  countryCounts: CountryCountSampleDataset;
};

export const CoreMetrices = ({ countryCounts }: Props) => {
  const { numberSequences, numberCountries } = useMemo(() => {
    let numberSequences = 0;
    let numberCountries = 0;
    for (let { country, count } of countryCounts.payload) {
      numberSequences += count;
      if (country) {
        numberCountries++;
      }
    }
    return { numberSequences, numberCountries };
  }, [countryCounts]);

  return (
    <>
      <PackedGrid maxColumns={3}>
        <GridCell minWidth={150}>
          <Card>
            <Metric
              value={numberSequences}
              title='Number sequences'
              helpText='The number of sequenced samples'
            />
          </Card>
        </GridCell>
        <GridCell minWidth={150}>
          <Card>
            <Metric
              value={numberCountries}
              title='Number countries'
              helpText='The number of countries that submitted sequences'
            />
          </Card>
        </GridCell>
      </PackedGrid>
    </>
  );
};
