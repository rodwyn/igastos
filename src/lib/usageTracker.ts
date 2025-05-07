// src/lib/usageTracker.ts
const USAGE_KEY = 'api_usage_usd';

export const getUsage = (): number => {
  return parseFloat(localStorage.getItem(USAGE_KEY) || '0');
};

export const addUsage = (amount: number) => {
  const current = getUsage();
  const updated = current + amount;
  localStorage.setItem(USAGE_KEY, updated.toString());
};

export const resetUsage = () => {
  localStorage.setItem(USAGE_KEY, '0');
};
