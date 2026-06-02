// src/components/chat/ChatWindow.jsx
import { useEffect, useRef } from 'react'

// 💡 This component receives messages, loading state, and handlers as props.
//    It only renders — all logic lives in the useChat hook (Step 5).
export default function ChatWindow({ isOpen, messages, input, loading, onInput, onSend }) {

  // 💡 useRef gives you a direct reference to a DOM node.
  //    Angular parallel: @ViewChild
  const bottomRef = useRef(null)

  // 💡 Auto-scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) return null // 💡 Return null to render nothing

  return (
    <div style={styles.window}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.avatar}>DB</div>
        <div>
          <div style={styles.headerName}>Debleena Bose</div>
          <div style={styles.headerStatus}>
            <span style={styles.statusDot} /> AI Assistant · Always online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          // 💡 Using index as key is ok here since messages only append
          <div
            key={i}
            style={{
              ...styles.msgRow,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                ...styles.bubble,
                // 💡 Dynamic styles based on message role
                background: msg.role === 'user' ? '#3b6d11' : '#fff',
                color: msg.role === 'user' ? '#eaf3de' : '#2c2c2a',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div style={{ ...styles.msgRow, justifyContent: 'flex-start' }}>
            <div style={{ ...styles.bubble, background: '#fff', color: '#888780' }}>
              Typing...
            </div>
          </div>
        )}

        {/* Invisible div at bottom for auto-scroll */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          placeholder="Ask me anything..."
          value={input}
          // 💡 Controlled input: value comes from state, onChange updates it
          //    Angular parallel: [(ngModel)] two-way binding
          onChange={(e) => onInput(e.target.value)}
          // 💡 Send on Enter key
          onKeyDown={(e) => e.key === 'Enter' && !loading && onSend()}
        />
        <button
          style={{
            ...styles.sendBtn,
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
          onClick={onSend}
          disabled={loading || !input.trim()}
        >
          →
        </button>
      </div>
    </div>
  )
}

const styles = {
  window: {
    position: 'fixed',
    bottom: '6rem',
    right: '2rem',
    width: '360px',
    height: '500px',
    background: '#f7f6f3',
    border: '0.5px solid #d3d1c7',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 998,
    overflow: 'hidden',
  },
  header: {
    background: '#2c2c2a',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#3b6d11',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '14px',
    color: '#eaf3de',
    flexShrink: 0,
  },
  headerName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#f1efe8',
  },
  headerStatus: {
    fontSize: '11px',
    color: '#888780',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  statusDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#97c459',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  msgRow: {
    display: 'flex',
  },
  bubble: {
    maxWidth: '80%',
    padding: '0.65rem 1rem',
    borderRadius: '16px',
    fontSize: '13.5px',
    lineHeight: 1.6,
    border: '0.5px solid #d3d1c7',
  },
  inputArea: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderTop: '0.5px solid #d3d1c7',
    background: '#fff',
  },
  input: {
    flex: 1,
    border: '0.5px solid #d3d1c7',
    borderRadius: '20px',
    padding: '8px 14px',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    background: '#f7f6f3',
    color: '#2c2c2a',
  },
  sendBtn: {
    background: '#3b6d11',
    color: '#eaf3de',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
}