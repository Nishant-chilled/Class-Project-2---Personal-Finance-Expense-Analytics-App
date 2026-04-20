import { useMemo } from 'react';
import { useTransactions } from './useTransactions';

export function useBudget() {
  const { budget, totals } = useTransactions();

  return useMemo(() => {
    const spent = totals.expenses;
    const monthlyBudget = Number(budget.monthlyBudget || 0);
    const remaining = monthlyBudget - spent;
    const usedPercent = monthlyBudget > 0 ? Math.min((spent / monthlyBudget) * 100, 100) : 0;

    return {
      monthlyBudget,
      spent,
      remaining,
      usedPercent,
    };
  }, [budget, totals]);
}
