import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import PageHeader from '../components/PageHeader';
import { categories } from '../data/sampleData';
import { useTransactions } from '../hooks/useTransactions';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  amount: yup.number().typeError('Amount must be a number').positive('Enter a valid amount').required(),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  type: yup.string().oneOf(['income', 'expense']).required(),
  notes: yup.string().max(120, 'Keep notes short'),
  recurring: yup.boolean().default(false),
});

const defaultValues = {
  title: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  notes: '',
  recurring: false,
};

function AddTransactionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addTransaction, updateTransaction, getTransactionById } = useTransactions();
  const existingTransaction = id ? getTransactionById(id) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (existingTransaction) {
      reset(existingTransaction);
    }
  }, [existingTransaction, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
    };

    if (existingTransaction) {
      updateTransaction(id, payload);
      toast.success('Transaction updated');
    } else {
      addTransaction(payload);
      toast.success('Transaction added');
    }

    navigate('/transactions');
  };

  return (
    <section>
      <PageHeader
        title={existingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        subtitle="Use react-hook-form and yup validation to manage entries cleanly."
      />

      <div className="card form-card">
        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title</label>
            <input className="input" {...register('title')} />
            <small className="error-text">{errors.title?.message}</small>
          </div>

          <div>
            <label>Amount</label>
            <input className="input" {...register('amount')} />
            <small className="error-text">{errors.amount?.message}</small>
          </div>

          <div>
            <label>Category</label>
            <select className="input" {...register('category')}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <small className="error-text">{errors.category?.message}</small>
          </div>

          <div>
            <label>Date</label>
            <input className="input" type="date" {...register('date')} />
            <small className="error-text">{errors.date?.message}</small>
          </div>

          <div>
            <label>Transaction Type</label>
            <select className="input" {...register('type')}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <small className="error-text">{errors.type?.message}</small>
          </div>

          <div className="checkbox-row">
            <input type="checkbox" {...register('recurring')} />
            <label>Mark as recurring</label>
          </div>

          <div className="full-width">
            <label>Notes</label>
            <textarea rows="4" className="input" {...register('notes')} />
            <small className="error-text">{errors.notes?.message}</small>
          </div>

          <div className="full-width button-row">
            <button className="button primary" type="submit" disabled={isSubmitting}>
              {existingTransaction ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddTransactionPage;
