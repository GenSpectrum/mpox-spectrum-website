import { Alert, AlertVariant } from '../helpers/ui';
import { ExternalLink } from './ExternalLink';

export const LapisNote = () => {
  return (
    <>
      <Alert variant={AlertVariant.WARNING}>
        MpoxSpectrum uses all monkeypox data on{' '}
        <ExternalLink url='https://www.ncbi.nlm.nih.gov/genbank/'>
          <span className='underline'>NCBI GenBank</span>
        </ExternalLink>{' '}
        and from authors who shared them directly with us. Please note that we cannot provide sequences which
        are from databases not in the public domain (such as e.g. GISAID EpiPox) due to re-sharing
        restrictions. The data presented on this dashboard are also available through a public web API: visit
        the{' '}
        <ExternalLink url='https://mpox-lapis.genspectrum.org'>
          <span className='underline'>Mpox-LAPIS documentation</span>
        </ExternalLink>{' '}
        for details.
      </Alert>
    </>
  );
};
