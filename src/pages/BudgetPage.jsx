import { useState } from 'react';
import { toast } from 'react-toastify';
import BudgetCard from '../components/BudgetCard';
import PageHeader from '../components/PageHeader';
import { useBudget } from '../hooks/useBudget';
import { useTransactions } from '../hooks/useTransactions';

function BudgetPage() {
  const { budget, setBudget } = useTransactions();
  const budgetData = useBudget();
  const [value, setValue] = useState(budget.monthlyBudget);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudget({ monthlyBudget: Number(value || 0) });
    toast.success('Budget updated');
  };

  return (
    <section>
      <PageHeader
        title="Budget Tracking"
        subtitle="Set a monthly budget and track how much is used and how much remains."
      />

      <div className="two-col-layout">
        <BudgetCard {...budgetData} />
        <div className="card form-card">
          <h3>Update Monthly Budget</h3>
          <form onSubmit={handleSubmit} className="budget-form">
            <label>Budget Amount</label>
            <input
              className="input"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
            />
            <button className="button primary" type="submit">
              Save Budget
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BudgetPage;
