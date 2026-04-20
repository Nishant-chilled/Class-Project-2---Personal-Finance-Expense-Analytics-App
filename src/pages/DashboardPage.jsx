import { Link } from 'react-router-dom';
import BudgetCard from '../components/BudgetCard';
import { CategoryPieChart, IncomeExpenseBarChart } from '../components/Charts';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import { useBudget } from '../hooks/useBudget';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/currencyFormatter';
import { buildCategoryData, buildMonthlyData, getTopCategory } from './helpers';

function DashboardPage() {
  const { transactions, totals, deleteTransaction } = useTransactions();
  const budget = useBudget();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const categoryData = buildCategoryData(transactions);
  const monthlyData = buildMonthlyData(transactions);
  const topCategory = getTopCategory(categoryData);

  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Track your money with a simple and presentable finance dashboard."
        action={
          <Link to="/transactions/new" className="button primary">
            Add Transaction
          </Link>
        }
      />

      <div className="stats-grid">
        <StatCard label="Total Income" value={formatCurrency(totals.income)} helper="All income added" />
        <StatCard label="Total Expenses" value={formatCurrency(totals.expenses)} helper="Total spending" />
        <StatCard label="Net Balance" value={formatCurrency(totals.balance)} helper="Income - expenses" />
        <StatCard label="Top Category" value={topCategory.name} helper={formatCurrency(topCategory.value)} />
      </div>

      <div className="two-col-layout">
        <BudgetCard {...budget} />
        <CategoryPieChart data={categoryData.length ? categoryData : [{ name: 'No data', value: 1 }]} />
      </div>

      <div className="two-col-layout">
        <IncomeExpenseBarChart data={monthlyData} />
        <div className="card list-card">
          <div className="section-title-row">
            <h3>Recent Transactions</h3>
            <Link to="/transactions" className="text-link">
              View all
            </Link>
          </div>
          {recentTransactions.length ? (
            recentTransactions.map((item) => (
              <TransactionCard key={item.id} item={item} onDelete={deleteTransaction} />
            ))
          ) : (
            <p className="empty-state">No transactions yet. Add your first one.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
