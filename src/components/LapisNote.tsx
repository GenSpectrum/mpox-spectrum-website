import { Alert, AlertVariant } from '../helpers/ui';
import { ExternalLink } from './ExternalLink';

export const LapisNote = () => {
  return (
    <>
      <Alert variant={AlertVariant.WARNING}>
        The data presented on this dashboard are also available through a public web API: visit the{' '}
        <ExternalLink url='https://mpox-lapis.genspectrum.org'>
          <span className='underline'>Mpox-LAPIS documentation</span>
        </ExternalLink>{' '}
        for details.
      </Alert>
    </>
  );
};
