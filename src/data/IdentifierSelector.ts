export type IdentifierSelector = {
  accession?: string[];
  strain?: string[];
  sraAccession?: string[];
};

export function addIdentifierSelectorToUrlSearchParam(selector: IdentifierSelector, params: URLSearchParams) {
  let commaSeparatedStr = '';
  for (const k of ['accession', 'strain', 'sraAccession'] as const) {
    const value = selector[k];
    if (value !== undefined) {
      for (let i of value) {
        commaSeparatedStr += ',' + i;
      }
      params.set(k, commaSeparatedStr);
    }
  }
}
