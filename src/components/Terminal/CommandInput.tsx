
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '../../stores/terminalStore';
import { executeCommand } from '../../commands/commandHandler';

const CommandInput = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addOutput, addToHistory, commandHistory, historyIndex, setHistoryIndex } = useTerminalStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      addToHistory(input.trim());
      const response = executeCommand(input.trim());
      addOutput(input.trim(), response);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      useTerminalStore.getState().clearOutput();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <span className="text-terminal-green font-bold">$</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-terminal-green font-mono text-base caret-terminal-green"
          placeholder=""
          spellCheck={false}
          autoComplete="off"
        />
        {/* Blinking cursor when input is empty */}
        {!input && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute left-0 text-terminal-green pointer-events-none"
          >
            ▋
          </motion.span>
        )}
      </div>
    </form>
  );
};

export default CommandInput;
