// src/components/Hero.jsx
import { info } from '../data/portfolio'

// 💡 A React component is just a function that returns JSX.
//    Angular parallel: @Component class with a template.
export default function Hero() {

  const handleScroll = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // 💡 JSX looks like HTML but it's JavaScript.
    //    Key difference: use className instead of class,
    //    and camelCase for CSS properties (backgroundColor not background-color).
    <section id="hero" style={styles.section}>

      {/* Tag pill */}
      <span style={{ ...styles.tag, ...styles.fadeUp, animationDelay: '0.05s' }}>Available for new opportunities</span>

      {/* 💡 Curly braces {} let you embed JS expressions inside JSX.
              Angular parallel: {{ }} interpolation */}
      <h1 style={{ ...styles.name, ...styles.fadeUp, animationDelay: '0.12s' }}>
        {info.name.split(' ')[0]}
        <br />
        <em style={styles.nameEm}>{info.name.split(' ')[1]}</em>
      </h1>

      <p style={{ ...styles.subtitle, ...styles.fadeUp, animationDelay: '0.2s' }}>
        AngularJS Lead & Senior Frontend Developer with 5+ years crafting
        scalable, high-performance web applications and modular UI systems.
      </p>

      {/* CTA Buttons */}
      <div style={{ ...styles.ctas, ...styles.fadeUp, animationDelay: '0.28s' }}>
        <button
          style={styles.btnPrimary}
          onClick={() => handleScroll('projects')}
          // 💡 onMouseEnter/Leave for hover since inline styles can't use :hover
          onMouseEnter={e => e.currentTarget.style.background = '#27500a'}
          onMouseLeave={e => e.currentTarget.style.background = '#3b6d11'}
        >
          View Projects
        </button>
        <button
          style={styles.btnSecondary}
          onMouseEnter={e => e.currentTarget.style.background = '#eaf3de'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Download CV
        </button>
      </div>

      {/* Stats row */}
      {/* 💡 .map() renders a list. Always include a unique `key` prop.
              Angular parallel: *ngFor="let s of stats; trackBy: trackFn" */}
      <div style={{ ...styles.statsRow, ...styles.fadeUp, animationDelay: '0.36s' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <div style={styles.statNumber}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Skills strip */}
      <div style={{ ...styles.skillsStrip, ...styles.fadeUp, animationDelay: '0.42s' }}>
        {skills.map((skill) => (
          <span key={skill} style={styles.pill}>{skill}</span>
        ))}
      </div>

    </section>
  )
}

// 💡 Keep data close to where it's used, or import from portfolio.js
const stats = [
  { value: '5+', label: 'Years exp.' },
  { value: '10+',  label: 'Projects'   },
  { value: '3',  label: 'Companies'  },
]

const skills = ['Angular 17+', 'TypeScript', 'RxJS', 'NgRx', 'CI/CD']

// 💡 Style objects in React = plain JS objects.
//    Angular parallel: styles defined in component's styleUrls.
//    Tip: extract styles below the component to keep JSX readable.
const styles = {
  section: {
    minHeight: '100vh',
    background: '#f7f6f3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '8rem 3rem 4rem',
    maxWidth: '700px',
    margin: '0 auto',
    animation: 'heroEnter 0.7s ease both',
  },
  tag: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#3b6d11',
    background: '#eaf3de',
    padding: '5px 14px',
    borderRadius: '20px',
    marginBottom: '1.5rem',
    width: 'fit-content',
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(48px, 8vw, 72px)', // 💡 clamp() = responsive font sizing
    fontWeight: 300,
    lineHeight: 1.05,
    margin: '0 0 1rem',
    color: '#2c2c2a',
  },
  nameEm: {
    fontStyle: 'italic',
    color: '#3b6d11',
  },
  subtitle: {
    fontSize: '15px',
    color: '#5f5e5a',
    lineHeight: 1.7,
    maxWidth: '480px',
    margin: '0 0 2.5rem',
  },
  ctas: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#3b6d11',
    color: '#eaf3de',
    border: 'none',
    padding: '13px 28px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'background 0.2s',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#3b6d11',
    border: '0.5px solid #3b6d11',
    padding: '13px 28px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'background 0.2s',
  },
  statsRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  statCard: {
    background: '#fff',
    border: '0.5px solid #d3d1c7',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    textAlign: 'center',
    minWidth: '100px',
  },
  statNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '36px',
    fontWeight: 300,
    color: '#3b6d11',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '11px',
    color: '#888780',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  skillsStrip: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    fontSize: '11px',
    color: '#3b6d11',
    background: '#eaf3de',
    border: '0.5px solid #c0dd97',
    padding: '5px 12px',
    borderRadius: '20px',
    letterSpacing: '0.03em',
  },
  fadeUp: {
    opacity: 0,
    transform: 'translateY(18px)',
    animation: 'fadeUp 0.65s ease forwards',
  },
}