import { format } from 'date-fns';
import { FiEdit2, FiRepeat, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

function TransactionCard({ item, onDelete }) {
  return (
    <div className="transaction-card card">
      <div>
        <div className="transaction-card__top">
          <h4>{item.title}</h4>
          {item.recurring && (
            <span className="pill recurring-pill">
              <FiRepeat /> Recurring
            </span>
          )}
        </div>
        <p className="muted-text">{item.category}</p>
        <p className="muted-text">{format(new Date(item.date), 'dd MMM yyyy')}</p>
        {item.notes && <p className="notes-text">{item.notes}</p>}
      </div>

      <div className="transaction-card__right">
        <strong className={item.type === 'income' ? 'amount income' : 'amount expense'}>
          {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
        </strong>
        <span className={`pill ${item.type === 'income' ? 'pill-income' : 'pill-expense'}`}>
          {item.type}
        </span>
        <div className="action-row">
          <Link to={`/transactions/${item.id}/edit`} className="icon-button">
            <FiEdit2 />
          </Link>
          <button type="button" className="icon-button danger" onClick={() => onDelete(item.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
