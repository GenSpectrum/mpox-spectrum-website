export type IdentifierSelector = {
  accession?: string;
  strain?: string;
  sraAccession?: string;
};

export function addIdentifierSelectorToUrlSearchParam(selector: IdentifierSelector, params: URLSearchParams) {
  for (const k of ['accession', 'strain', 'sraAccession'] as const) {
    const value = selector[k];
    if (value !== undefined) {
      params.set(k, value);
    }
  }
}
