import { useParams } from 'react-router';
import { LapisSelector } from '../data/LapisSelector';
import { useQuery } from '../helpers/query-hook';
import { DetailsSampleData } from '../data/DetailsSampleDataset';
import { TopButtons } from '../components/TopButtons';
import { potentiallyPartialDateToString } from '../helpers/date-cache';
import { MutationList } from '../widgets/MutationList';
import { MutationData } from '../data/MutationDataset';
import { NamedCard } from '../components/NamedCard';
import { ExternalLink, LinkStyle } from '../components/ExternalLink';
import { ContributorsSampleData } from '../data/ContributorsSampleDataset';

export const SamplePage = () => {
  let { sampleName } = useParams();
  const selector: LapisSelector = {
    identifier: {
      accession: sampleName,
    },
  };
  const { data } = useQuery(signal => DetailsSampleData.fromApi(selector, signal), [selector]);
  const { data: nucMutationCounts } = useQuery(
    signal => MutationData.fromApi(selector, 'nuc', signal),
    [selector]
  );
  const { data: contributors } = useQuery(
    signal => ContributorsSampleData.fromApi(selector, signal),
    [selector]
  );

  if (!data || !nucMutationCounts || !contributors) {
    return <>Loading...</>;
  }

  const entry = data.payload[0];
  if (!entry) {
    // TODO Show a better error/404 page.
    return <>The sample does not exist.</>;
  }

  const location = [entry.region, entry.country].filter(x => x).join('/');
  const information = [potentiallyPartialDateToString(entry), location].filter(x => x?.length).join(' - ');

  return (
    <div className='mx-2 md:mx-8 my-2'>
      <h1>{entry.strain}</h1>
      <div>
        <ExternalLink
          url={'https://www.ncbi.nlm.nih.gov/nuccore/' + entry.accession}
          style={LinkStyle.SimpleBlue}
        >
          {entry.accession}
        </ExternalLink>{' '}
        - {information}
      </div>
      <div>
        <strong>Clade:</strong> {entry.clade ?? 'unknown'}
      </div>
      <div>
        <strong>Host:</strong> {entry.host ?? 'unknown'}
      </div>
      <div>
        <strong>Submission date:</strong> {entry.dateSubmitted?.string ?? 'unknown'}
      </div>
      <div>
        <strong>Authors:</strong> {contributors.payload[0].authors ?? 'unknown'}
      </div>
      <div>
        <strong>Institution:</strong> {contributors.payload[0].institution ?? 'unknown'}
      </div>
      <div className='mt-4'>
        <TopButtons selector={selector} hideSequenceTableButton={true} />
      </div>
      <NamedCard title='Nucleotide differences'>
        <MutationList mutations={nucMutationCounts} sequenceType={'nuc'} hideProportions={true} />
      </NamedCard>
    </div>
  );
};
