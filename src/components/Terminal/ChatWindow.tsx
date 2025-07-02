
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { useTerminalStore } from '../../stores/terminalStore';

const ChatWindow = () => {
  const { closeChat } = useTerminalStore();
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'bot' }>>([
    { id: '1', text: 'Hello! I\'m Quasivo AI Assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message: "${input}". This is a demo chat interface for Quasivo. In a real implementation, this would connect to our AI system.`,
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <motion.div
      ref={dragRef}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 400, position.x + info.offset.x)),
          y: Math.max(0, Math.min(window.innerHeight - 500, position.y + info.offset.y))
        });
      }}
      className="w-96 h-[500px] bg-black border-2 border-terminal-green rounded-lg shadow-2xl font-mono"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-terminal-green/30 cursor-move">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-terminal-green" />
          <span className="text-terminal-green text-sm font-bold">QUASIVO CHAT</span>
        </div>
        <button
          onClick={closeChat}
          className="text-terminal-green/70 hover:text-terminal-green transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto h-[380px] space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded text-xs ${
                message.sender === 'user'
                  ? 'bg-terminal-green/20 text-terminal-green'
                  : 'bg-terminal-green/10 text-terminal-green/90'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-terminal-green/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border border-terminal-green/30 rounded px-2 py-1 text-terminal-green text-xs placeholder-terminal-green/50 focus:outline-none focus:border-terminal-green"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs hover:bg-terminal-green/30 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatWindow;
