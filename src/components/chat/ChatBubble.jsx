// src/components/chat/ChatBubble.jsx

// 💡 This is a presentational component — it receives props and renders UI.
//    No state lives here. Angular parallel: a "dumb" component with @Input/@Output.
export default function ChatBubble({ isOpen, onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          ...styles.bubble,
          // 💡 Spread operator merges style objects.
          //    Conditional style based on isOpen prop.
          background: isOpen ? '#2c2c2a' : '#3b6d11',
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* 💡 Ternary for conditional rendering */}
        {isOpen ? (
          <span style={styles.icon}>✕</span>
        ) : (
          <span style={styles.icon}>💬</span>
        )}
  
        {/* Unread dot — shown only when chat is closed */}
        {!isOpen && <span style={styles.dot} />}
      </button>
    )
  }
  
  const styles = {
    bubble: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      zIndex: 999,
      transition: 'background 0.2s, transform 0.2s',
    },
    icon: {
      fontSize: '22px',
      lineHeight: 1,
    },
    dot: {
      position: 'absolute',
      top: '6px',
      right: '6px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#97c459',
      border: '2px solid white',
    },
  }