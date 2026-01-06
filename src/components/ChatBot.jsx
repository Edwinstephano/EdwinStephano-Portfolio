import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { responsePatterns, defaultResponses, quickActions } from '../data/chatbotKnowledge'
import Fuse from 'fuse.js'

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [soundEnabled, setSoundEnabled] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    // Load messages from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('chatbot_messages')
        if (saved) {
            const parsed = JSON.parse(saved)
            setMessages(parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) })))
        } else {
            setMessages([{
                type: 'bot',
                text: "Hi! 👋 I'm Edwin's AI assistant. I can answer questions about his skills, projects, and experience. How can I help you?",
                timestamp: new Date()
            }])
        }
    }, [])

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatbot_messages', JSON.stringify(messages))
        }
    }, [messages])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    // Play sound
    const playSound = () => {
        if (soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWm98OScTgwOUKjo77RgGwU7k9r0yXkpBSh+zPLaizsKGGS56+mnUhQKQ5zd8sFuJAUuhM/z2Ik3CBlpu+3nn04MDlCo6O+0YBsFO5Pa9Ml5KQUofszy2os7ChhluevrqFIUCkOc3fLBbiQFLoTP89iJNwgZabvt559ODA5QqOjvtGAbBTuT2vTJeSkFKH7M8tqLOwoYZbnr66hSFApDnN3ywW4kBS6Ez/PYiTcIGWm77eefTgwOUKjo77RgGwU7k9r0yXkpBSh+zPLaizsKGGW56+uoUhQKQ5zd8sFuJAUuhM/z2Ik3CBlpu+3nn04MDlCo6O+0YBsFO5Pa9Ml5KQUofszy2os7ChhluevrqFIUCkOc3fLBbiQFLoTP89iJNwgZabvt559ODA5QqOjvtGAbBTuT2vTJeSkFKH7M8tqLOwoYZbnr66hSFApDnN3ywW4kBS6Ez/PYiTcIGWm77eefTgwOUKjo77RgGwU7k9r0yXkpBSh+zPLaizsKGGW56+uoUhQKQ5zd8sFuJAUuhM/z2Ik3CBlpu+3nn04MDlCo6O+0YBsFO5Pa9Ml5KQUofszy')
            audio.volume = 0.3
            audio.play().catch(() => { })
        }
    }

    // Fuzzy Search with Fuse.js
    const findResponse = (userMessage) => {
        // 1. Fuse.js Fuzzy Search
        // flatten patterns for searching
        const searchItems = responsePatterns.map((pattern, index) => ({
            ...pattern,
            id: index
        }))

        // Configure Fuse options
        const fuse = new Fuse(searchItems, {
            keys: ['keywords'],
            threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
            ignoreLocation: true
        })

        const result = fuse.search(userMessage)

        if (result.length > 0) {
            // Get best match
            const pattern = result[0].item
            const responses = pattern.responses
            return {
                text: responses[Math.floor(Math.random() * responses.length)],
                suggestions: pattern.suggestions || []
            }
        }

        // Fallback or very loose match
        return {
            text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
            suggestions: []
        }
    }

    const handleSend = (text = input) => {
        if (!text.trim()) return

        const userMessage = {
            type: 'user',
            text: text.trim(),
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)
        playSound()

        const thinkingTime = 500 + Math.random() * 1000
        setTimeout(() => {
            const response = findResponse(text)
            const botMessage = {
                type: 'bot',
                text: response.text,
                suggestions: response.suggestions,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
            playSound()
        }, thinkingTime)
    }

    const exportConversation = () => {
        const text = messages.map(m =>
            `[${m.timestamp.toLocaleTimeString()}] ${m.type === 'user' ? 'You' : 'Bot'}: ${m.text}`
        ).join('\n\n')
        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `chat-${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    const clearConversation = () => {
        if (confirm('Clear all messages?')) {
            const welcome = {
                type: 'bot',
                text: "Hi! 👋 I'm Edwin's AI assistant. How can I help you?",
                timestamp: new Date()
            }
            setMessages([welcome])
            localStorage.removeItem('chatbot_messages')
        }
    }

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text)
        alert('Copied to clipboard!')
    }

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
                {!isOpen && messages.length === 1 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">1</motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed bottom-24 right-6 z-[100] flex h-[500px] w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary to-primary/80 px-4 py-3 rounded-t-2xl">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-bold">ES</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">Edwin&apos;s AI Assistant</h3>
                                <p className="text-xs text-white/80">{isTyping ? 'Typing...' : 'Online'}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-white/80 hover:text-white" title={soundEnabled ? 'Mute' : 'Unmute'}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {soundEnabled ? <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /> : <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />}
                                    </svg>
                                </button>
                                <button onClick={exportConversation} className="text-white/80 hover:text-white" title="Export chat">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                </button>
                                <button onClick={clearConversation} className="text-white/80 hover:text-white" title="Clear chat">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs opacity-60">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <button onClick={() => copyMessage(msg.text)} className="text-xs opacity-60 hover:opacity-100" title="Copy">📋</button>
                                        </div>
                                        {msg.suggestions && msg.suggestions.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {msg.suggestions.map((s, i) => (
                                                    <button key={i} onClick={() => handleSend(s)} className="text-xs px-2 py-1 rounded bg-white/20 hover:bg-white/30">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            {[0, 0.2, 0.4].map((delay, i) => (
                                                <motion.span key={i} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay }} className="h-2 w-2 rounded-full bg-slate-400" />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 2 && !isTyping && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action, idx) => (
                                        <button key={idx} onClick={() => handleSend(action.query)} className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="border-t border-slate-200 dark:border-slate-700 p-4">
                            <div className="flex gap-2">
                                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} placeholder="Ask me anything..." className="flex-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                <motion.button onClick={() => handleSend()} disabled={!input.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-center">Press Esc to close • {messages.length} messages</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
