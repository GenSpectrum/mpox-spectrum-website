import { TopFilterArea } from '../components/TopFilterArea';
import { useExploreUrl } from '../helpers/explore-url';
import { GridCell, PackedGrid } from '../components/PackedGrid';
import { NamedCard } from '../components/NamedCard';
import { CountryTable } from '../widgets/CountryTable';
import { useQuery } from '../helpers/query-hook';
import { CountryCountSampleData } from '../data/CountryCountSampleDataset';

export const ExplorePage = () => {
  const { selector, setSelector } = useExploreUrl();

  const { data: countryCounts } = useQuery(
    signal => CountryCountSampleData.fromApi(selector, signal),
    [selector]
  );

  /* --- Views --- */

  const topFilters = (
    <>
      <div className='m-8'>
        <TopFilterArea
          location={selector.location!}
          setLocation={newLocation => setSelector({ ...selector, location: newLocation })}
        />
      </div>
    </>
  );

  const mainContent = countryCounts ? (
    <>
      <PackedGrid maxColumns={2}>
        <GridCell minWidth={600}>
          <NamedCard title='Sequences over time'>Plot</NamedCard>
        </GridCell>
        {!selector.location?.country && (
          <GridCell minWidth={600}>
            <NamedCard title='Geographic distribution'>
              <CountryTable countryCounts={countryCounts} />
            </NamedCard>
          </GridCell>
        )}
        <GridCell minWidth={600}>
          <NamedCard title='Mutations'>Mutation list</NamedCard>
        </GridCell>
      </PackedGrid>
    </>
  ) : (
    'Loading...'
  );

  return (
    <>
      {topFilters}
      {mainContent}
    </>
  );
};
