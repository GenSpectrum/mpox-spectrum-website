export type IdentifierSelector = {
  strain?: string;
  sraAccession?: string;
};

export function addIdentifierSelectorToUrlSearchParam(selector: IdentifierSelector, params: URLSearchParams) {
  for (const k of ['strain', 'sraAccession'] as const) {
    const value = selector[k];
    if (value !== undefined) {
      params.set(k, value);
    }
  }
}
