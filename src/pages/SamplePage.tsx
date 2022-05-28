import { useParams } from 'react-router';
import { LapisSelector } from '../data/LapisSelector';
import { useQuery } from '../helpers/query-hook';
import { DetailsSampleData } from '../data/DetailsSampleDataset';
import { TopButtons } from '../components/TopButtons';
import { potentiallyPartialDateToString } from '../helpers/date-cache';
import { MutationList } from '../widgets/MutationList';
import { MutationData } from '../data/MutationDataset';
import { NamedCard } from '../components/NamedCard';

export const SamplePage = () => {
  let { sampleName } = useParams();
  const selector: LapisSelector = {
    identifier: {
      strain: sampleName,
    },
  };
  const { data } = useQuery(signal => DetailsSampleData.fromApi(selector, signal), [selector]);
  const { data: nucMutationCounts } = useQuery(
    signal => MutationData.fromApi(selector, 'nuc', signal),
    [selector]
  );

  if (!data || !nucMutationCounts) {
    return <>Loading...</>;
  }

  const entry = data.payload[0];
  if (!entry) {
    // TODO Show a better error/404 page.
    return <>The sample does not exist.</>;
  }

  const location = [entry.region, entry.country].filter(x => x).join('/');
  const information = [
    entry.sraAccession,
    potentiallyPartialDateToString(entry),
    location,
    entry.host,
    entry.clade,
  ]
    .filter(x => x?.length)
    .join(' - ');

  return (
    <div className='mx-2 md:mx-8 my-2'>
      <h1>{sampleName}</h1>
      <div>{information}</div>
      <div className='mt-4'>
        <TopButtons selector={selector} hideSequenceTableButton={true} />
      </div>
      <NamedCard title='Mutations'>
        <MutationList mutations={nucMutationCounts} sequenceType={'nuc'} hideProportions={true} />
      </NamedCard>
    </div>
  );
};
