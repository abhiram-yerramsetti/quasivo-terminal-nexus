
import { create } from 'zustand';

interface TerminalOutput {
  id: string;
  command: string;
  response: string;
  timestamp: Date;
}

interface TerminalStore {
  output: TerminalOutput[];
  commandHistory: string[];
  historyIndex: number;
  isChatOpen: boolean;
  addOutput: (command: string, response: string) => void;
  clearOutput: () => void;
  addToHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;
  openChat: () => void;
  closeChat: () => void;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  output: [],
  commandHistory: [],
  historyIndex: -1,
  isChatOpen: false,

  addOutput: (command: string, response: string) => {
    const newEntry: TerminalOutput = {
      id: Date.now().toString(),
      command,
      response,
      timestamp: new Date(),
    };
    set((state) => ({
      output: [...state.output, newEntry],
    }));
  },

  clearOutput: () => {
    set({ output: [] });
  },

  addToHistory: (command: string) => {
    const { commandHistory } = get();
    const newHistory = [...commandHistory, command];
    set({
      commandHistory: newHistory,
      historyIndex: -1,
    });
  },

  setHistoryIndex: (index: number) => {
    set({ historyIndex: index });
  },

  openChat: () => {
    set({ isChatOpen: true });
  },

  closeChat: () => {
    set({ isChatOpen: false });
  },
}));
