import { info } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <p style={{ ...styles.kicker, ...styles.fadeUp, animationDelay: '0.05s' }}>Contact</p>
        <h2 style={{ ...styles.title, ...styles.fadeUp, animationDelay: '0.12s' }}>
          Let us build something
          <em style={styles.titleEm}> meaningful</em>
        </h2>

        <p style={{ ...styles.subtitle, ...styles.fadeUp, animationDelay: '0.2s' }}>
          I am open to frontend leadership roles and impactful product teams.
        </p>

        <div style={{ ...styles.card, ...styles.fadeUp, animationDelay: '0.28s' }}>
          <a href={`mailto:${info.email}`} style={styles.email}>
            {info.email}
          </a>
          <p style={styles.meta}>
            {info.phone} · {info.location}
          </p>

          <div style={styles.actions}>
            <a href={`mailto:${info.email}`} style={styles.primaryBtn}>
              Send Email
            </a>
            <a href={info.linkedin} target="_blank" rel="noreferrer" style={styles.secondaryBtn}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: '#2c2c2a',
    padding: '5rem 1.75rem',
    animation: 'sectionPop 0.6s ease both',
  },
  container: {
    maxWidth: '1080px',
    margin: '0 auto',
  },
  kicker: {
    fontSize: '11px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#b7b7ac',
    marginBottom: '0.75rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(34px, 5vw, 46px)',
    fontWeight: 400,
    color: '#f7f6f3',
    marginBottom: '0.8rem',
  },
  titleEm: {
    fontStyle: 'italic',
    color: '#97c459',
    marginLeft: '0.4rem',
  },
  subtitle: {
    color: '#d6d5cd',
    fontSize: '14px',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    maxWidth: '520px',
  },
  card: {
    border: '0.5px solid #55554f',
    background: '#343430',
    borderRadius: '10px',
    padding: '1.4rem',
    maxWidth: '520px',
  },
  email: {
    color: '#97c459',
    fontSize: '20px',
    fontFamily: "'Cormorant Garamond', serif",
    textDecoration: 'none',
  },
  meta: {
    marginTop: '0.4rem',
    color: '#d6d5cd',
    fontSize: '13px',
  },
  actions: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    background: '#3b6d11',
    color: '#eaf3de',
    textDecoration: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '2px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  secondaryBtn: {
    border: '0.5px solid #97c459',
    color: '#97c459',
    textDecoration: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '2px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  fadeUp: {
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeUp 0.65s ease forwards',
  },
}
