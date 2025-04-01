import { motion } from "framer-motion";

export const AnimatedFormField = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
};
