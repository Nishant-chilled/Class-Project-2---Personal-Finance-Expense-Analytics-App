import { categories } from '../data/sampleData';

function Filters({ filters, onChange }) {
  return (
    <div className="filters-grid">
      <select
        className="input"
        value={filters.category}
        onChange={(e) => onChange('category', e.target.value)}
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select className="input" value={filters.type} onChange={(e) => onChange('type', e.target.value)}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        className="input"
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange('startDate', e.target.value)}
      />

      <input
        className="input"
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange('endDate', e.target.value)}
      />

      <select className="input" value={filters.sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
        <option value="category-asc">Category A-Z</option>
      </select>
    </div>
  );
}

export default Filters;
