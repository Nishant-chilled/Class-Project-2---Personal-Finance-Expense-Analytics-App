import { format } from 'date-fns';

export function buildCategoryData(transactions) {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

export function buildMonthlyData(transactions) {
  const grouped = transactions.reduce((acc, item) => {
    const month = format(new Date(item.date), 'MMM');
    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }
    if (item.type === 'income') {
      acc[month].income += Number(item.amount);
    } else {
      acc[month].expenses += Number(item.amount);
    }
    return acc;
  }, {});

  return Object.values(grouped);
}

export function getTopCategory(categoryData) {
  if (!categoryData.length) {
    return { name: 'No expenses', value: 0 };
  }

  return categoryData.reduce((top, current) => (current.value > top.value ? current : top));
}
