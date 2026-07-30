import React from 'react';

import { Sparkles, Send, X, Bot, User, Trash2, Home } from 'lucide-react';
import { getSmartPropertyRecommendations } from "@/src/services/geminiService";
import { DUMMY_PROPERTIES } from "@/src/constants";


interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Namaste! I'm your PropScroll AI guide. Describe exactly what you're looking for, and I'll sift through our verified feed to find your perfect match." }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const aiResponse = await getSmartPropertyRecommendations(userText, DUMMY_PROPERTIES);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my property database. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: "Chat cleared. How can I help you find a home today?" }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F2540]/60 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-500">
        {/* Header - Modern Gradient */}
        <div className="bg-gradient-to-r from-[#0F2540] via-[#1a3b5c] to-[#008C99] p-8 text-white flex justify-between items-center relative">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <Sparkles size={24} className="text-[#FCC02E] animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">PropScroll AI</h2>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/70 font-medium">Assistant is Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={clearChat} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white" title="Clear Chat">
              <Trash2 size={20} />
            </button>
            <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] space-x-4 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  m.role === 'user' ? 'bg-[#D63528]' : 'bg-[#0F2540]'
                }`}>
                  {m.role === 'user' ? <User size={18} className="text-white" /> : <Home size={18} className="text-[#008C99]" />}
                </div>
                <div className={`p-6 rounded-[1.5rem] text-sm md:text-base leading-relaxed shadow-sm transition-all ${
                  m.role === 'user' 
                  ? 'bg-white text-[#0F2540] rounded-tr-none border border-gray-100' 
                  : 'bg-[#0F2540] text-white/95 rounded-tl-none font-light'
                }`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-3' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0F2540] flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-[#008C99]" />
                </div>
                <div className="bg-[#0F2540] text-white p-5 rounded-[1.5rem] rounded-tl-none flex space-x-2 items-center">
                  <span className="w-1.5 h-1.5 bg-[#FCC02E] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#FCC02E] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#FCC02E] rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input - Floats above bottom */}
        <div className="p-6 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations..."
              className="w-full bg-gray-100 border-2 border-transparent rounded-[1.5rem] pl-6 pr-16 py-5 outline-none focus:border-[#008C99] focus:bg-white transition-all text-[#0F2540] font-medium"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-3 bg-[#D63528] text-white p-3 rounded-2xl hover:bg-[#b02b21] transition-all disabled:opacity-50 disabled:scale-100 hover:scale-105 active:scale-95 shadow-lg shadow-red-100"
            >
              <Send size={22} className="stroke-[2.5]" />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
            Real Estate AI trained on verified Indian Market data
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
