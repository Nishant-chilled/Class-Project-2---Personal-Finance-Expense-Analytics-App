import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export function useTransactions() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useTransactions must be used inside FinanceProvider');
  }
  return context;
}
