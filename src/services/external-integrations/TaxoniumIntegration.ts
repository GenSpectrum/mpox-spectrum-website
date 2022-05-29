import { LapisSelector } from '../../data/LapisSelector';

export class TaxoniumIntegration {
  static getLink({ identifier, variant, location, host }: LapisSelector): string {
    const baseUrl = 'https://mpx.taxonium.org/';
    const params = new URLSearchParams();

    params.set(
      'color',
      JSON.stringify({
        field: 'none',
      })
    );
    // The variant
    const searchList = [];
    if (identifier?.strain) {
      searchList.push(createField('name', identifier.strain));
    }
    if (identifier?.sraAccession) {
      searchList.push(createField('meta_sraAccession', identifier.sraAccession));
    }
    if (variant?.clade) {
      searchList.push(createField('meta_clade', variant.clade));
    }
    if (location?.region) {
      searchList.push(createField('meta_region', location.region));
    }
    if (location?.country) {
      searchList.push(createField('meta_country', location.country));
    }
    if (host && host[0]) {
      searchList.push(createField('meta_host', host[0]));
    }
    params.set(
      'srch',
      JSON.stringify([
        {
          key: 'search_root',
          type: 'boolean',
          method: 'boolean',
          text: '',
          gene: 'S',
          position: 484,
          new_residue: 'any',
          min_tips: 0,
          boolean_method: 'and',
          subspecs: searchList,
        },
      ])
    );
    params.set('enabled', '{"aa1":true,"search_root":true}');
    return `${baseUrl}?${params.toString()}`;
  }
}

function createField(type: string, text: string) {
  return {
    key: 'search' + Math.random(),
    type,
    method: 'text_exact',
    text,
    gene: 'S',
    position: 484,
    new_residue: 'any',
    min_tips: 0,
    controls: true,
  };
}
