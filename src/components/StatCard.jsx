function StatCard({ label, value, helper }) {
  return (
    <div className="card stat-card">
      <p className="stat-card__label">{label}</p>
      <h3>{value}</h3>
      <span>{helper}</span>
    </div>
  );
}

export default StatCard;
