import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Filters from '../components/Filters';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import TransactionCard from '../components/TransactionCard';
import { useDebounce } from '../hooks/useDebounce';
import { useTransactions } from '../hooks/useTransactions';

function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    startDate: '',
    endDate: '',
    sortBy: 'date-desc',
  });

  const debouncedSearch = useDebounce(search);

  const filteredTransactions = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    const result = transactions.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.notes.toLowerCase().includes(query);

      const matchesCategory = filters.category === 'all' || item.category === filters.category;
      const matchesType = filters.type === 'all' || item.type === filters.type;
      const matchesStartDate = !filters.startDate || item.date >= filters.startDate;
      const matchesEndDate = !filters.endDate || item.date <= filters.endDate;

      return matchesSearch && matchesCategory && matchesType && matchesStartDate && matchesEndDate;
    });

    const sorted = [...result];
    switch (filters.sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-desc':
        sorted.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;
      case 'amount-asc':
        sorted.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;
      case 'category-asc':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sorted;
  }, [transactions, debouncedSearch, filters]);

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section>
      <PageHeader
        title="Transactions"
        subtitle="Search, filter, sort, edit, and delete transaction records."
        action={
          <Link to="/transactions/new" className="button primary">
            New Transaction
          </Link>
        }
      />

      <div className="card controls-card">
        <SearchBar value={search} onChange={setSearch} />
        <Filters filters={filters} onChange={handleFilterChange} />
      </div>

      <div className="list-card">
        {filteredTransactions.length ? (
          filteredTransactions.map((item) => (
            <TransactionCard key={item.id} item={item} onDelete={handleDelete} />
          ))
        ) : (
          <div className="card empty-box">
            <p className="empty-state">No matching transactions found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionsPage;
