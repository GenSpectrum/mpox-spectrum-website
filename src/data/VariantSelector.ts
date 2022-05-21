export type VariantSelector = {
  clade?: string;
  nucMutations: string[];
};

export function addVariantSelectorToUrlSearchParams(
  selector: VariantSelector,
  params: URLSearchParams,
  index?: number
) {
  if (selector.nucMutations?.length) {
    const nucMutationsKey = index && index > 0 ? `nucMutations${index}` : 'nucMutations';
    params.set(nucMutationsKey, selector.nucMutations.join(','));
  }
  for (const k of ['clade'] as const) {
    const value = selector[k];
    if (value !== undefined) {
      const key = index && index > 0 ? `${k}${index}` : k;
      params.set(key, value);
    }
  }
}
