import { ExternalLink } from './ExternalLink';
import { getLinkTo } from '../data/api-lapis';
import { LapisSelector } from '../data/LapisSelector';
import { Link, useLocation } from 'react-router-dom';
import { NextcladeIntegration } from '../services/external-integrations/NextcladeIntegration';
import { TaxoniumIntegration } from '../services/external-integrations/TaxoniumIntegration';
import { downloadAcknowledgementTable } from '../helpers/acknowledgement-pdf';
import { useQuery } from '../helpers/query-hook';
import { ContributorsSampleData } from '../data/ContributorsSampleDataset';
import { Button as MuiButton, MenuItem } from '@mui/material';
import React from 'react';
import { SplitButton } from './SplitButton';

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
      <MuiButton variant='contained' color='secondary' size='small'>
        Download FASTA (aligned)
      </MuiButton>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('fasta', selector, undefined, true)}>
      <MuiButton variant='contained' color='secondary' size='small'>
        Download FASTA (unaligned)
      </MuiButton>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('details', selector, undefined, true, 'csv')}>
      <MuiButton variant='contained' color='secondary' size='small'>
        Download metadata
      </MuiButton>
    </ExternalLink>,
    <SplitButton
      mainButton={
        <MuiButton
          variant='contained'
          color='secondary'
          size='small'
          disabled={!contributors}
          onClick={() => contributors && downloadAcknowledgementTable(contributors)}
        >
          Download acknowledgement table
        </MuiButton>
      }
      subButtons={[
        <ExternalLink url={getLinkTo('contributors', selector, undefined, true, 'csv')}>
          <MenuItem>Download CSV</MenuItem>
        </ExternalLink>,
      ]}
    />,
    <ExternalLink url={NextcladeIntegration.getLink(selector)}>
      <MuiButton variant='contained' color='secondary' size='small'>
        Open in Nextclade
      </MuiButton>
    </ExternalLink>,
    <ExternalLink url={TaxoniumIntegration.getLink(selector)}>
      <MuiButton variant='contained' color='secondary' size='small'>
        Open in Taxonium
      </MuiButton>
    </ExternalLink>,
  ];
  if (!hideSequenceTableButton) {
    buttons.unshift(
      <Link to={`../samples${searchString}`}>
        <MuiButton variant='contained' color='primary' size='small'>
          Browse sequences
        </MuiButton>
      </Link>
    );
  }

  return (
    <div className='flex flex-row flex-wrap'>
      {buttons.map((button, index) => (
        <div className='mx-4 my-1' style={{ zIndex: 10 }} key={index}>
          {button}
        </div>
      ))}
    </div>
  );
};
