import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBubble from './components/chat/ChatBubble'
import ChatWindow from './components/chat/ChatWindow'
import { useChat } from './hooks/useChat'

export default function App() {
    // 💡 Custom hook called at the top level — gives us all chat state + handlers
    const { isOpen, toggleChat, messages, input, setInput, loading, sendMessage } = useChat()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

            {/* 💡 Chat UI is always mounted but ChatWindow returns null when !isOpen */}
            <ChatBubble isOpen={isOpen} onClick={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        input={input}
        loading={loading}
        onInput={setInput}
        onSend={sendMessage}
      />
    </>
  )
}