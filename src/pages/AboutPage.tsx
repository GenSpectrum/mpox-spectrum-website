import { ExternalLink } from '../components/ExternalLink';

export const AboutPage = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 md:px-8'>
      <h1>Mpox-Spectrum</h1>
      <p>
        Mpox-Spectrum is being developed and maintained in the{' '}
        <ExternalLink url='https://bsse.ethz.ch/cevo'>
          Computational Evolution group of ETH Zürich
        </ExternalLink>{' '}
        in Switzerland (Chaoran Chen and Tanja Stadler). The monkeypox data is pre-processed and aligned by
        members of the <ExternalLink url='(https://nextstrain.org/'>NextStrain team</ExternalLink> (Emma
        Hodcroft, Cornelius Roemer, Richard Neher). We acknowledge the teams around the world sharing data
        openly on genbank in real time during this outbreak. We express our sincere gratitude.
      </p>
    </div>
  );
};
