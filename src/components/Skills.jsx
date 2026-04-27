import { skills as skillGroups } from '../data/portfolio'

const fallbackSkills = [
  {
    category: 'Core Frontend',
    primary: ['Angular', 'TypeScript', 'JavaScript'],
    secondary: ['HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    category: 'Engineering Practices',
    primary: ['RxJS', 'NgRx', 'TDD'],
    secondary: ['Code Reviews', 'CI/CD', 'Accessibility'],
  },
]

const groups = skillGroups?.length ? skillGroups : fallbackSkills

export default function Skills() {
  return (
    <section id="skills" style={styles.section}>
      <div style={styles.container}>
        <p style={{ ...styles.kicker, ...styles.fadeUp, animationDelay: '0.05s' }}>Skill Set</p>
        <h2 style={{ ...styles.title, ...styles.fadeUp, animationDelay: '0.12s' }}>
          Tools I use to build
          <em style={styles.titleEm}> reliable products</em>
        </h2>

        <div style={styles.grid}>
          {groups.map((group, index) => (
            <article
              key={group.category}
              style={{ ...styles.card, ...styles.fadeUp, animationDelay: `${0.18 + index * 0.08}s` }}
            >
              <h3 style={styles.cardTitle}>{group.category}</h3>

              <div style={styles.listWrap}>
                {group.primary?.map((item) => (
                  <span key={`${group.category}-${item}`} style={styles.primaryPill}>
                    {item}
                  </span>
                ))}
              </div>

              {!!group.secondary?.length && (
                <div style={styles.listWrap}>
                  {group.secondary.map((item) => (
                    <span key={`${group.category}-secondary-${item}`} style={styles.secondaryPill}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: '#f7f6f3',
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
    color: '#888780',
    marginBottom: '0.75rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(34px, 5vw, 48px)',
    fontWeight: 400,
    color: '#2c2c2a',
    marginBottom: '2rem',
  },
  titleEm: {
    fontStyle: 'italic',
    color: '#3b6d11',
    marginLeft: '0.4rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: '#ffffff',
    border: '0.5px solid #d3d1c7',
    borderRadius: '10px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  cardTitle: {
    fontSize: '13px',
    color: '#5f5e5a',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  listWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  primaryPill: {
    background: '#eaf3de',
    color: '#3b6d11',
    border: '0.5px solid #c0dd97',
    borderRadius: '20px',
    fontSize: '12px',
    padding: '0.35rem 0.7rem',
  },
  secondaryPill: {
    background: '#fff',
    color: '#5f5e5a',
    border: '0.5px solid #d3d1c7',
    borderRadius: '20px',
    fontSize: '12px',
    padding: '0.35rem 0.7rem',
  },
  fadeUp: {
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeUp 0.6s ease forwards',
  },
}
