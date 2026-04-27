import { projects } from '../data/portfolio'

const fallbackProjects = [
  {
    number: '01',
    featured: true,
    name: 'Cornea Dashboard',
    description: 'A large-scale analytics dashboard focused on high-quality decision support.',
    stat: 'PAN-India scale',
    tags: ['Angular', 'Data Visualisation', 'Role-based Access'],
  },
]

const projectList = projects?.length ? projects : fallbackProjects

export default function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <div style={styles.container}>
        <p style={{ ...styles.kicker, ...styles.fadeUp, animationDelay: '0.05s' }}>Projects</p>
        <h2 style={{ ...styles.title, ...styles.fadeUp, animationDelay: '0.12s' }}>
          Selected work with
          <em style={styles.titleEm}> real impact</em>
        </h2>

        <div style={styles.grid}>
          {projectList.map((project, index) => (
            <article
              key={`${project.number}-${project.name}`}
              style={{ ...styles.card, ...styles.fadeUp, animationDelay: `${0.18 + index * 0.09}s` }}
            >
              <div style={styles.rowTop}>
                <span style={styles.number}>{project.number}</span>
                {project.featured && <span style={styles.featured}>Featured</span>}
              </div>

              <h3 style={styles.name}>{project.name}</h3>
              <p style={styles.description}>{project.description}</p>

              {!!project.stat && <p style={styles.stat}>{project.stat}</p>}

              <div style={styles.tagWrap}>
                {(project.tags || []).map((tag) => (
                  <span key={`${project.name}-${tag}`} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
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
    fontSize: 'clamp(34px, 5vw, 46px)',
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
    gap: '0.75rem',
  },
  rowTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    fontSize: '13px',
    color: '#888780',
    letterSpacing: '0.08em',
  },
  featured: {
    fontSize: '11px',
    color: '#3b6d11',
    border: '0.5px solid #c0dd97',
    background: '#eaf3de',
    borderRadius: '20px',
    padding: '0.2rem 0.55rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: '20px',
    color: '#2c2c2a',
    fontWeight: 500,
  },
  description: {
    color: '#5f5e5a',
    fontSize: '14px',
    lineHeight: 1.7,
  },
  stat: {
    color: '#3b6d11',
    fontWeight: 500,
    fontSize: '13px',
  },
  tagWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.45rem',
    marginTop: '0.2rem',
  },
  tag: {
    fontSize: '12px',
    color: '#5f5e5a',
    border: '0.5px solid #d3d1c7',
    background: '#faf8f3',
    borderRadius: '20px',
    padding: '0.3rem 0.65rem',
  },
  fadeUp: {
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeUp 0.6s ease forwards',
  },
}
