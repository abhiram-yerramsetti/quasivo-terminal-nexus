
import { useTerminalStore } from '../stores/terminalStore';

const commands = {
  help: () => `Available commands:
  
  about     - Learn about Quasivo
  projects  - View our projects  
  team      - Meet our team
  contact   - Get in touch
  chat      - Open chat interface
  clear     - Clear terminal
  help      - Show this help`,

  about: () => `QUASIVO - Pioneering AI-Driven OS Solutions

Quasivo is at the forefront of revolutionizing operating systems through 
artificial intelligence. We develop cutting-edge solutions that seamlessly 
integrate AI capabilities into core system operations, creating more 
intelligent, adaptive, and efficient computing experiences.

Our mission is to bridge the gap between traditional computing and the 
AI-powered future, delivering innovative tools that enhance productivity 
and streamline digital workflows for businesses and individuals alike.`,

  projects: () => `Current Projects:

▸ QuantumOS Alpha
  Next-generation AI-integrated operating system
  Status: In Development
  
▸ Neural Shell
  AI-powered command line interface
  Status: Beta Testing
  
▸ Adaptive Kernel
  Self-optimizing system kernel
  Status: Research Phase
  
▸ Smart Resource Manager
  Intelligent system resource allocation
  Status: Prototype`,

  team: () => `Our Team:

▸ Dr. Sarah Chen - CEO
  AI Research, Systems Architecture
  
▸ Marcus Rodriguez - CTO  
  Kernel Development, Low-level Systems
  
▸ Emily Watson - Lead AI Engineer
  Machine Learning, Neural Networks
  
▸ David Kim - Senior Systems Engineer
  Operating Systems, Performance Optimization`,

  contact: () => `Get in Touch:

▸ Email: contact@quasivo.ai
▸ LinkedIn: linkedin.com/company/quasivo
▸ GitHub: github.com/quasivo
▸ Office: San Francisco, CA

For partnerships and collaboration opportunities,
reach out to partnerships@quasivo.ai`,

  chat: () => {
    useTerminalStore.getState().openChat();
    return 'Opening chat interface...';
  },

  clear: () => {
    useTerminalStore.getState().clearOutput();
    return '';
  },
};

export const executeCommand = (input: string): string => {
  const command = input.toLowerCase().trim();
  
  if (command in commands) {
    return commands[command as keyof typeof commands]();
  }
  
  return `Command not found: '${input}'
Type 'help' to see available commands.`;
};
