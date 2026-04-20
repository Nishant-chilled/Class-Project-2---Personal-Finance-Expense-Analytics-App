import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { FiBarChart2, FiCreditCard, FiDollarSign, FiHome, FiPlusCircle } from 'react-icons/fi';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AddTransactionPage from './pages/AddTransactionPage';
import BudgetPage from './pages/BudgetPage';
import AnalyticsPage from './pages/AnalyticsPage';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/transactions', label: 'Transactions', icon: <FiCreditCard /> },
  { to: '/transactions/new', label: 'Add', icon: <FiPlusCircle /> },
  { to: '/budget', label: 'Budget', icon: <FiDollarSign /> },
  { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand__logo">₹</div>
            <div>
              <h1>Finance Flow</h1>
              <p>Simple personal finance tracker</p>
            </div>
          </div>
          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/new" element={<AddTransactionPage />} />
          <Route path="/transactions/:id/edit" element={<AddTransactionPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
