import { TopFilterArea } from '../components/TopFilterArea';
import { useExploreUrl } from '../helpers/explore-url';
import { GridCell, PackedGrid } from '../components/PackedGrid';
import { NamedCard } from '../components/NamedCard';
import { CountryTable } from '../widgets/CountryTable';
import { useQuery } from '../helpers/query-hook';
import { CountryCountSampleData } from '../data/CountryCountSampleDataset';
import { CoreMetrices } from '../widgets/CoreMetrices';
import { MutationData } from '../data/MutationDataset';
import { MutationList } from '../widgets/MutationList';
import { TopButtons } from '../components/TopButtons';
import { LapisNote } from '../components/LapisNote';
import { TimeBarChart } from '../widgets/TimeBarChart';
import { DateCountSampleData } from '../data/DateCountSampleDataset';

export const ExplorePage = () => {
  const { selector, setSelector } = useExploreUrl();

  const { data: dateCounts } = useQuery(signal => DateCountSampleData.fromApi(selector, signal), [selector]);

  const { data: monthCounts } = useQuery(
    signal => DateCountSampleData.monthCountFromApi(selector, signal),
    [selector]
  );

  const { data: yearCounts } = useQuery(
    signal => DateCountSampleData.yearCountFromApi(selector, signal),
    [selector]
  );

  const { data: countryCounts } = useQuery(
    signal => CountryCountSampleData.fromApi(selector, signal),
    [selector]
  );

  const { data: nucMutationCounts } = useQuery(
    signal => MutationData.fromApi(selector, 'nuc', signal),
    [selector]
  );

  /* --- Views --- */

  const topFilters = (
    <>
      <div className='m-8'>
        <TopFilterArea
          location={selector.location!}
          setLocation={newLocation => setSelector({ ...selector, location: newLocation })}
          variant={selector.variant!}
          setVariant={newVariant => setSelector({ ...selector, variant: newVariant })}
          host={selector.host!}
          setHost={newHost => setSelector({ ...selector, host: newHost })}
          dateRange={selector.dateRange!}
          setDateRange={newDateRange => setSelector({ ...selector, dateRange: newDateRange })}
        />
      </div>
    </>
  );

  const topButtons = (
    <div className='m-8'>
      <TopButtons selector={selector} />
    </div>
  );

  const mainContent =
    dateCounts && monthCounts && yearCounts && countryCounts && nucMutationCounts ? (
      <>
        <CoreMetrices countryCounts={countryCounts} />
        <PackedGrid maxColumns={2}>
          <GridCell minWidth={600}>
            <NamedCard title='Sequences over time'>
              <div style={{ height: 400 }}>
                <TimeBarChart dateCounts={dateCounts} monthCounts={monthCounts} yearCounts={yearCounts} />
              </div>
            </NamedCard>
          </GridCell>
          {!selector.location?.country && (
            <GridCell minWidth={600}>
              <NamedCard title='Geographic distribution'>
                <CountryTable countryCounts={countryCounts} />
              </NamedCard>
            </GridCell>
          )}
          <GridCell minWidth={600}>
            <NamedCard title='Nucleotide differences'>
              <MutationList mutations={nucMutationCounts} sequenceType={'nuc'} />
            </NamedCard>
          </GridCell>
        </PackedGrid>
      </>
    ) : (
      'Loading...'
    );

  return (
    <>
      <LapisNote />
      {topFilters}
      {topButtons}
      {mainContent}
    </>
  );
};
