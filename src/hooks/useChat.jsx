// src/hooks/useChat.js
import { useState } from 'react'

export function useChat() {
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Debleena's AI assistant. Feel free to ask me anything about her skills, experience, or projects! 👋",
    },
  ])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)

  const toggleChat = () => setIsOpen((prev) => !prev)

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      // 💡 This calls your Vercel serverless function at /api/chat
      //    Works both locally (with vercel dev) and in production
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't process that. Please try again!",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return { isOpen, toggleChat, messages, input, setInput, loading, sendMessage }
}