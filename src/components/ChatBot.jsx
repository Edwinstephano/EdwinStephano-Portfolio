import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { responsePatterns, defaultResponses, quickActions } from '../data/chatbotKnowledge'

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! 👋 I'm Edwin's AI assistant. I can answer questions about his skills, projects, and experience. How can I help you?",
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Find best matching response
    const findResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase()

        // Find matching pattern
        for (const pattern of responsePatterns) {
            const hasKeyword = pattern.keywords.some(keyword =>
                lowerMessage.includes(keyword.toLowerCase())
            )

            if (hasKeyword) {
                // Return random response from matching pattern
                const responses = pattern.responses
                return responses[Math.floor(Math.random() * responses.length)]
            }
        }

        // No match found, return default response
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
    }

    // Handle sending message
    const handleSend = (text = input) => {
        if (!text.trim()) return

        // Add user message
        const userMessage = {
            type: 'user',
            text: text.trim(),
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Show typing indicator
        setIsTyping(true)

        // Simulate thinking time (500-1500ms)
        const thinkingTime = 500 + Math.random() * 1000
        setTimeout(() => {
            // Get bot response
            const botResponse = findResponse(text)

            const botMessage = {
                type: 'bot',
                text: botResponse,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
        }, thinkingTime)
    }

    // Handle quick action click
    const handleQuickAction = (query) => {
        handleSend(query)
    }

    // Handle key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Notification badge (optional) */}
                {!isOpen && messages.length === 1 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold"
                    >
                        1
                    </motion.span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary to-primary/80 px-4 py-3 rounded-t-2xl">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                                ES
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">Edwin's AI Assistant</h3>
                                <p className="text-xs text-white/80">
                                    {isTyping ? 'Typing...' : 'Online'}
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.type === 'user'
                                                ? 'bg-primary text-white'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        <p className="mt-1 text-xs opacity-60">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                className="h-2 w-2 rounded-full bg-slate-400"
                                            />
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                className="h-2 w-2 rounded-full bg-slate-400"
                                            />
                                            <motion.span
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                className="h-2 w-2 rounded-full bg-slate-400"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (show only at start) */}
                        {messages.length <= 2 && !isTyping && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickAction(action.query)}
                                            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="border-t border-slate-200 dark:border-slate-700 p-4">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <motion.button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
