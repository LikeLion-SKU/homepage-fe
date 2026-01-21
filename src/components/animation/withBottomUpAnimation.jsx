// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

export function withBottomUpAnimation(Component, styling) {
  const pageVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  if (typeof styling !== 'undefined') {
    return function ({ ...props }) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            style={styling}
            variants={pageVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            exit="exit"
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            <Component {...props} />
          </motion.div>
        </AnimatePresence>
      );
    };
  }
  return function ({ ...props }) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          variants={pageVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          exit="exit"
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <Component {...props} />
        </motion.div>
      </AnimatePresence>
    );
  };
}
