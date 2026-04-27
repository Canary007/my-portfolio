import { useState, useEffect } from 'react'

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [hoveredLink, setHoveredLink] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860)

  // 💡 React concept: useEffect runs side effects after render.
  // Angular parallel: ngOnInit + HostListener for scroll events.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // cleanup
  }, []) // empty array = run once on mount, like ngOnInit

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 860
      setIsMobile(mobile)
      if (!mobile) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.toLowerCase())
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    const updateActiveSection = () => {
      const navHeight = 80
      const scrollMarker = window.scrollY + navHeight + 16

      let bestMatch = sections[0].id

      sections.forEach((section) => {
        if (section.offsetTop <= scrollMarker) {
          bestMatch = section.id
        }
      })

      setActiveSection(bestMatch)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  const handleNavClick = (e, section) => {
    e.preventDefault()
    setMenuOpen(false)
    const sectionId = section.toLowerCase()
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      ...styles.nav,
      background: scrolled ? 'rgba(247,246,243,0.95)' : 'transparent',
      borderBottom: scrolled ? '0.5px solid #d3d1c7' : '0.5px solid transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
    }}>
      {/* Logo */}
      <div style={styles.logo}>DB</div>

      {/* Desktop nav links */}
      {!isMobile && (
        <ul style={styles.links}>
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                style={{
                  ...styles.link,
                  ...(activeSection === link.toLowerCase() ? styles.activeLink : {}),
                  ...(hoveredLink === link ? styles.hoverLink : {}),
                }}
                onClick={(e) => handleNavClick(e, link)}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink('')}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Hamburger button - mobile only */}
      {/* 💡 React concept: onClick updates state, re-render is automatic. Angular parallel: (click) binding */}
      {isMobile && (
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                ...styles.mobileLink,
                ...(activeSection === link.toLowerCase() ? styles.mobileActiveLink : {}),
              }}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.1rem 1.75rem',
    transition: 'background 0.3s, border-color 0.3s',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '20px',
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: '#2c2c2a',
  },
  links: {
    display: 'flex',
    gap: '1.35rem',
    marginLeft: '1.5rem',
    listStyle: 'none',
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  link: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#5f5e5a',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    transition: 'color 0.2s, opacity 0.2s',
    opacity: 0.85,
  },
  hoverLink: {
    color: '#3b6d11',
    opacity: 1,
  },
  activeLink: {
    color: '#3b6d11',
    opacity: 1,
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
  },
  hamburger: {
    display: 'inline-flex',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#2c2c2a',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#f7f6f3',
    borderBottom: '0.5px solid #d3d1c7',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 2rem',
    gap: '1rem',
  },
  mobileLink: {
    fontSize: '14px',
    color: '#2c2c2a',
    textDecoration: 'none',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '0.5rem 0',
    borderBottom: '0.5px solid #f1efe8',
  },
  mobileActiveLink: {
    color: '#3b6d11',
    fontWeight: 500,
  },
}
