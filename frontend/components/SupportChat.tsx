'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SUGGESTED_QUESTIONS = [
    'How does Clario work?',
    'What are the pricing plans?',
    'How do writers get paid?',
    'What makes Clario different?',
];

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: 'user', content: text.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setHasUnread(false);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            const data = await res.json();
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I could not process that.' }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setHasUnread(false);
                }}
                className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #a855f7, #f15bb5)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X size={24} color="#fff" />
                ) : (
                    <MessageCircle size={24} color="#fff" />
                )}
                {/* Unread indicator */}
                {hasUnread && !isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-400">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                    </span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 z-[9998] flex flex-col overflow-hidden shadow-2xl"
                        style={{
                            width: 380,
                            height: 520,
                            borderRadius: '1.75rem',
                            background: '#fff',
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center gap-3 px-5 py-4"
                            style={{
                                background: 'linear-gradient(to right, #a855f7, #f15bb5)',
                            }}
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                                <Bot size={18} color="#fff" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Clario Support</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                    </span>
                                    <p className="text-[11px] text-white/80">AI Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#fafafa' }}>
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                                        <Sparkles size={20} className="text-purple-500" />
                                    </div>
                                    <p className="text-sm text-gray-500">How can I help you today?</p>
                                    <div className="flex flex-col gap-2 w-full">
                                        {SUGGESTED_QUESTIONS.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => sendMessage(q)}
                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left text-xs text-gray-600 transition-all hover:border-purple-300 hover:bg-purple-50"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.role === 'user'
                                                ? 'bg-gray-900 text-white rounded-br-sm'
                                                : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-1 rounded-2xl bg-white border border-gray-200 px-4 py-3 rounded-bl-sm">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="inline-block h-2 w-2 rounded-full bg-gray-400"
                                                style={{
                                                    animation: 'bounce-dot 1.4s infinite ease-in-out',
                                                    animationDelay: `${i * 0.16}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                                placeholder="Type a message..."
                                className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-200"
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-white transition-all hover:bg-purple-600 disabled:opacity-50"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
