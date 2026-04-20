import { formatCurrency } from '../utils/currencyFormatter';

function BudgetCard({ monthlyBudget, spent, remaining, usedPercent }) {
  return (
    <div className="card budget-card">
      <div className="budget-card__top">
        <div>
          <p className="muted-text">Monthly Budget</p>
          <h3>{formatCurrency(monthlyBudget)}</h3>
        </div>
        <div>
          <p className="muted-text">Used</p>
          <h3>{usedPercent.toFixed(1)}%</h3>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${usedPercent}%` }} />
      </div>

      <div className="budget-stats">
        <div>
          <p className="muted-text">Spent</p>
          <strong>{formatCurrency(spent)}</strong>
        </div>
        <div>
          <p className="muted-text">Remaining</p>
          <strong>{formatCurrency(remaining)}</strong>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
