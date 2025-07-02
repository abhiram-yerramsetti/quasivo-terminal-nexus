
import { motion } from 'framer-motion';
import { useTerminalStore } from '../../stores/terminalStore';
import TypewriterText from './TypewriterText';

const TerminalOutput = () => {
  const { output } = useTerminalStore();

  return (
    <div className="space-y-4">
      {output.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          {/* Command Echo */}
          <div className="flex items-center space-x-2">
            <span className="text-terminal-green/70">$</span>
            <span className="text-terminal-green">{entry.command}</span>
          </div>
          
          {/* Response */}
          <div className="pl-4 border-l border-terminal-green/20">
            <TypewriterText 
              text={entry.response} 
              delay={100}
              speed={20}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TerminalOutput;
