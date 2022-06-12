import { ExternalLink, LinkStyle } from '../components/ExternalLink';

export const AboutPage = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 md:px-8'>
      <h1>Mpox-Spectrum</h1>
      <p>
        Mpox-Spectrum is being developed and maintained in the{' '}
        <ExternalLink url='https://bsse.ethz.ch/cevo' style={LinkStyle.SimpleBlue}>
          Computational Evolution group of ETH Zürich
        </ExternalLink>{' '}
        in Switzerland (Chaoran Chen and Tanja Stadler). The monkeypox data is pre-processed and aligned by
        members of the{' '}
        <ExternalLink url='https://nextstrain.org/' style={LinkStyle.SimpleBlue}>
          NextStrain team
        </ExternalLink>
        . We acknowledge the teams around the world sharing data openly on GenBank in real time during this
        outbreak. We express our sincere gratitude.
      </p>
      <p>
        If you would like to reference MpoxSpectrum and LAPIS in scientific works, please cite our preprint:
      </p>
      <div className='p-4 mt-4 mb-6 bg-gray-100 rounded-xl'>
        Chen, C., Roemer, C. & Stadler, T. "LAPIS is a fast web API for massive open virus sequencing
        databases" arXiv (2022); doi:{' '}
        <ExternalLink url='https://doi.org/10.48550/arXiv.2206.01210' style={LinkStyle.SimpleBlue}>
          10.48550/arXiv.2206.01210
        </ExternalLink>
        .
      </div>
    </div>
  );
};
