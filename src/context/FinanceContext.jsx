import { createContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sampleTransactions } from '../data/sampleData';

export const FinanceContext = createContext(null);

const TRANSACTIONS_KEY = 'finance-flow-transactions';
const BUDGET_KEY = 'finance-flow-budget';

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(TRANSACTIONS_KEY);
    return saved ? JSON.parse(saved) : sampleTransactions;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? JSON.parse(saved) : { monthlyBudget: 50000 };
  });

  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: uuidv4() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedTransaction, id } : item))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const getTransactionById = (id) => transactions.find((item) => item.id === id);

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const expenses = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const value = {
    transactions,
    budget,
    totals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    setBudget,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}
