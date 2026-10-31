import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/** Fades content up when it enters the viewport. Content stays visible if JS motion fails. */
export function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export function SectionHead({ eyebrow, title, script, align = 'center' }) {
  return (
    <motion.header
      className={`section-head align-${align}`}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {eyebrow && <motion.p variants={rise} className="eyebrow">{eyebrow}</motion.p>}
      {script && <motion.p variants={rise} className="script section-script">{script}</motion.p>}
      <motion.h2 variants={rise} className="section-title">{title}</motion.h2>
    </motion.header>
  );
}
