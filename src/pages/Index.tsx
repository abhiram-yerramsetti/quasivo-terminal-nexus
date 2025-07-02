
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '../stores/terminalStore';
import TerminalOutput from '../components/Terminal/TerminalOutput';
import CommandInput from '../components/Terminal/CommandInput';
import BootSequence from '../components/Terminal/BootSequence';
import ChatWindow from '../components/Terminal/ChatWindow';

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { output, isChatOpen } = useTerminalStore();

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  if (isBooting) {
    return <BootSequence />;
  }

  return (
    <div className="min-h-screen bg-black font-mono text-terminal-green overflow-hidden relative">
      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-10">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-terminal-green to-transparent bg-repeat" 
             style={{ backgroundSize: '100% 4px', backgroundImage: 'linear-gradient(transparent 50%, rgba(57, 255, 20, 0.1) 50%)' }}>
        </div>
      </div>

      <div 
        ref={terminalRef}
        className="h-screen flex flex-col p-4 md:p-6 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-terminal-green/30"
      >
        {/* Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="text-terminal-green/60 text-sm mb-2">
            QUASIVO TERMINAL v2.1.0 - © 2024 Quasivo Technologies
          </div>
          <div className="text-terminal-green/40 text-xs mb-4">
            Type 'help' to see available commands
          </div>
        </motion.div>

        {/* Terminal Output */}
        <div className="flex-1 min-h-0">
          <TerminalOutput />
        </div>

        {/* Command Input */}
        <div className="mt-4">
          <CommandInput />
        </div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && <ChatWindow />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
