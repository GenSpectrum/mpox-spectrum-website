import { Button, ButtonVariant } from '../helpers/ui';
import { ExternalLink } from './ExternalLink';
import { getLinkTo } from '../data/api-lapis';
import { LapisSelector } from '../data/LapisSelector';
import { Link, useLocation } from 'react-router-dom';
import { NextcladeIntegration } from '../services/external-integrations/NextcladeIntegration';
import { TaxoniumIntegration } from '../services/external-integrations/TaxoniumIntegration';
import { downloadAcknowledgementTable } from '../helpers/acknowledgement-pdf';
import { useQuery } from '../helpers/query-hook';
import { ContributorsSampleData } from '../data/ContributorsSampleDataset';

type Props = {
  selector: LapisSelector;
  hideSequenceTableButton?: boolean;
};

export const TopButtons = ({ selector, hideSequenceTableButton = false }: Props) => {
  const searchString = useLocation().search;
  const { data: contributors } = useQuery(
    signal => ContributorsSampleData.fromApi(selector, signal),
    [selector]
  );

  const buttons = [
    <ExternalLink url={getLinkTo('fasta-aligned', selector, undefined, true)}>
      <Button variant={ButtonVariant.SECONDARY}>Download FASTA (aligned)</Button>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('fasta', selector, undefined, true)}>
      <Button variant={ButtonVariant.SECONDARY}>Download FASTA (unaligned)</Button>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('details', selector, undefined, true, 'csv')}>
      <Button variant={ButtonVariant.SECONDARY}>Download metadata</Button>
    </ExternalLink>,
    <Button
      disabled={!contributors}
      onClick={() => contributors && downloadAcknowledgementTable(contributors)}
      variant={ButtonVariant.SECONDARY}
    >
      Download acknowledgement table
    </Button>,
    <ExternalLink url={NextcladeIntegration.getLink(selector)}>
      <Button variant={ButtonVariant.SECONDARY}>Open in Nextclade</Button>
    </ExternalLink>,
    <ExternalLink url={TaxoniumIntegration.getLink(selector)}>
      <Button variant={ButtonVariant.SECONDARY}>Open in Taxonium</Button>
    </ExternalLink>,
  ];
  if (!hideSequenceTableButton) {
    buttons.unshift(
      <Link to={`../samples${searchString}`}>
        <Button variant={ButtonVariant.PRIMARY}>Browse sequences</Button>
      </Link>
    );
  }

  return (
    <div className='flex flex-row flex-wrap'>
      {buttons.map((button, index) => (
        <div className='mx-4 my-1' key={index}>
          {button}
        </div>
      ))}
    </div>
  );
};
