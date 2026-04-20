import { useEffect, useState } from 'react';
import { CategoryPieChart, IncomeExpenseBarChart, MonthlyTrendChart } from '../components/Charts';
import PageHeader from '../components/PageHeader';
import { useTransactions } from '../hooks/useTransactions';
import { fetchExchangeRates } from '../services/api';
import { buildCategoryData, buildMonthlyData } from './helpers';

function AnalyticsPage() {
  const { transactions } = useTransactions();
  const [exchangeInfo, setExchangeInfo] = useState({ loading: true, usd: null, error: '' });

  const categoryData = buildCategoryData(transactions);
  const monthlyData = buildMonthlyData(transactions);

  useEffect(() => {
    let ignore = false;

    async function loadRates() {
      try {
        const data = await fetchExchangeRates('INR');
        if (!ignore) {
          setExchangeInfo({ loading: false, usd: data?.rates?.USD || null, error: '' });
        }
      } catch (error) {
        if (!ignore) {
          setExchangeInfo({ loading: false, usd: null, error: 'Could not load exchange rate.' });
        }
      }
    }

    loadRates();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <PageHeader
        title="Analytics"
        subtitle="Visualize category-wise spending, trends, and monthly comparisons."
      />

      <div className="api-banner card">
        <h3>API Integration</h3>
        {exchangeInfo.loading && <p>Loading exchange rate...</p>}
        {!exchangeInfo.loading && exchangeInfo.usd && (
          <p>Current conversion snapshot: 1 INR ≈ {exchangeInfo.usd.toFixed(4)} USD</p>
        )}
        {!exchangeInfo.loading && exchangeInfo.error && <p>{exchangeInfo.error}</p>}
      </div>

      <div className="analytics-grid">
        <CategoryPieChart data={categoryData.length ? categoryData : [{ name: 'No data', value: 1 }]} />
        <MonthlyTrendChart data={monthlyData} />
        <IncomeExpenseBarChart data={monthlyData} />
      </div>
    </section>
  );
}

export default AnalyticsPage;
