import React from 'react';
import { motion } from 'framer-motion';

const TestAnimation = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#0088cc',
          borderRadius: '10px',
          margin: '0 auto',
        }}
      />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        La animación funciona!
      </motion.h1>
    </div>
  );
};

export default TestAnimation; 