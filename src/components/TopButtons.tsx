import { Button, ButtonVariant } from '../helpers/ui';
import { ExternalLink } from './ExternalLink';
import { getLinkTo } from '../data/api-lapis';
import { LapisSelector } from '../data/LapisSelector';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  selector: LapisSelector;
};

export const TopButtons = ({ selector }: Props) => {
  const searchString = useLocation().search;
  const buttons = [
    <Link to={`../samples${searchString}`}>
      <Button variant={ButtonVariant.PRIMARY}>See sequence table</Button>
    </Link>,
    <ExternalLink url={getLinkTo('fasta-aligned', selector, undefined, true)}>
      <Button variant={ButtonVariant.SECONDARY}>Download FASTA (aligned)</Button>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('fasta', selector, undefined, true)}>
      <Button variant={ButtonVariant.SECONDARY}>Download FASTA (unaligned)</Button>
    </ExternalLink>,
    <ExternalLink url={getLinkTo('details', selector, undefined, true, 'csv')}>
      <Button variant={ButtonVariant.SECONDARY}>Download metadata</Button>
    </ExternalLink>,
  ];

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
