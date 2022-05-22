export type OrderAndLimitConfig = {
  orderBy?: 'arbitrary' | 'random';
  limit?: number;
};

export function addOrderAndLimitToSearchParams(
  params: URLSearchParams,
  orderAndLimitConfig: OrderAndLimitConfig
) {
  if (orderAndLimitConfig) {
    const { orderBy, limit } = orderAndLimitConfig;
    if (orderBy) {
      params.set('orderBy', orderBy);
    }
    if (limit) {
      params.set('limit', limit.toString());
    }
  }
}
