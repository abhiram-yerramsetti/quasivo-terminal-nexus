
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const bootMessages = [
  "Initializing Quasivo Terminal...",
  "Loading system modules...",
  "Establishing secure connection...",
  "Ready."
];

const BootSequence = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < bootMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-terminal-green text-2xl mb-8"
        >
          QUASIVO
        </motion.div>
        
        <div className="space-y-2">
          {bootMessages.slice(0, currentMessage + 1).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.7 }}
              className="text-terminal-green/80 text-sm"
            >
              {message}
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-terminal-green text-xl mt-8"
        >
          ▋
        </motion.div>
      </div>
    </div>
  );
};

export default BootSequence;
