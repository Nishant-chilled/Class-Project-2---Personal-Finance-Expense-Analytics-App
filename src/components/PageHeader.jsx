import { motion } from 'framer-motion';

function PageHeader({ title, subtitle, action }) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action}
    </motion.div>
  );
}

export default PageHeader;
