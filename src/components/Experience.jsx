import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { experience } from '../data/portfolio'

const fallbackExperience = [
  {
    company: 'Indian Political Action Committee (IPAC)',
    role: 'AngularJS Lead / Lead Associate',
    period: 'Dec 2022 - Present',
    current: true,
    bullets: [
      'Architected modular Angular apps for scale and maintainability.',
      'Led frontend quality initiatives with reviews, tests, and release checks.',
    ],
    tags: ['Angular', 'RxJS', 'NgRx', 'CI/CD'],
  },
]

const roles = experience?.length ? experience : fallbackExperience

export default function Experience() {
  const [selectedRole, setSelectedRole] = useState(null)

  useEffect(() => {
    if (!selectedRole) return undefined

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedRole(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [selectedRole])

  return (
    <section id="experience" style={styles.section}>
      <div style={styles.container}>
        <p style={{ ...styles.kicker, ...styles.fadeUp, animationDelay: '0.05s' }}>Experience</p>
        <h2 style={{ ...styles.title, ...styles.fadeUp, animationDelay: '0.12s' }}>Building products with ownership</h2>

        <div style={styles.timeline}>
          {roles.map((role, index) => (
            <article
              key={`${role.company}-${role.period}`}
              style={{ ...styles.item, ...styles.fadeUp, animationDelay: `${0.18 + index * 0.1}s` }}
              onClick={() => setSelectedRole(role)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedRole(role)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${role.role} at ${role.company}`}
            >
              <div style={styles.header}>
                <div>
                  <h3 style={styles.role}>{role.role}</h3>
                  <p style={styles.company}>{role.company}</p>
                </div>
                <div style={styles.periodWrap}>
                  {role.current && <span style={styles.badge}>Current</span>}
                  <span style={styles.period}>{role.period}</span>
                </div>
              </div>

              <ul style={styles.bulletList}>
                {(role.bullets || []).slice(0, 2).map((bullet) => (
                  <li key={`${role.company}-${bullet}`} style={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>

              {(role.bullets || []).length > 2 && (
                <p style={styles.moreHint}>Click to view full experience details</p>
              )}

              <div style={styles.tagWrap}>
                {(role.tags || []).map((tag) => (
                  <span key={`${role.company}-${tag}`} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedRole &&
        createPortal(
          <div style={styles.modalOverlay} onClick={() => setSelectedRole(null)} role="presentation">
            <div
              style={styles.modalCard}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedRole.role} details`}
            >
              <div style={styles.modalHeader}>
                <div>
                  <h3 style={styles.modalRole}>{selectedRole.role}</h3>
                  <p style={styles.modalCompany}>{selectedRole.company}</p>
                </div>
                <button style={styles.closeBtn} onClick={() => setSelectedRole(null)} aria-label="Close details popup">
                  ×
                </button>
              </div>

              <div style={styles.modalPeriodWrap}>
                {selectedRole.current && <span style={styles.badge}>Current</span>}
                <span style={styles.period}>{selectedRole.period}</span>
              </div>

              <ul style={styles.modalBulletList}>
                {(selectedRole.bullets || []).map((bullet) => (
                  <li key={`${selectedRole.company}-${selectedRole.period}-${bullet}`} style={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div style={styles.tagWrap}>
                {(selectedRole.tags || []).map((tag) => (
                  <span key={`${selectedRole.company}-${selectedRole.period}-${tag}`} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

const styles = {
  section: {
    background: '#ffffff',
    padding: '5rem 1.75rem',
    borderTop: '0.5px solid #e7e3d9',
    borderBottom: '0.5px solid #e7e3d9',
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
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    border: '0.5px solid #d3d1c7',
    borderRadius: '10px',
    padding: '1.25rem',
    background: '#faf8f3',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '0.9rem',
    flexWrap: 'wrap',
  },
  role: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#2c2c2a',
    marginBottom: '0.25rem',
  },
  company: {
    fontSize: '14px',
    color: '#5f5e5a',
  },
  periodWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  badge: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#3b6d11',
    background: '#eaf3de',
    border: '0.5px solid #c0dd97',
    borderRadius: '20px',
    padding: '0.2rem 0.55rem',
  },
  period: {
    fontSize: '12px',
    color: '#888780',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  bulletList: {
    marginLeft: '1rem',
    marginBottom: '1rem',
    color: '#3f3d38',
    lineHeight: 1.7,
    fontSize: '14px',
  },
  bullet: {
    marginBottom: '0.35rem',
  },
  moreHint: {
    marginBottom: '1rem',
    fontSize: '12px',
    color: '#6f6b61',
    letterSpacing: '0.03em',
  },
  tagWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.45rem',
  },
  tag: {
    fontSize: '12px',
    border: '0.5px solid #d3d1c7',
    color: '#5f5e5a',
    borderRadius: '20px',
    padding: '0.3rem 0.65rem',
    background: '#fff',
  },
  fadeUp: {
    opacity: 0,
    transform: 'translateY(16px)',
    animation: 'fadeUp 0.6s ease forwards',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(20, 20, 18, 0.58)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflowY: 'auto',
    zIndex: 220,
  },
  modalCard: {
    width: 'min(860px, 100%)',
    maxHeight: '86vh',
    overflowY: 'auto',
    borderRadius: '12px',
    background: '#fffdf8',
    border: '1px solid #d9d3c6',
    padding: '1.3rem 1.4rem',
    boxShadow: '0 14px 42px rgba(0, 0, 0, 0.24)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '0.65rem',
  },
  modalRole: {
    fontSize: '22px',
    color: '#2c2c2a',
    marginBottom: '0.2rem',
  },
  modalCompany: {
    fontSize: '14px',
    color: '#5f5e5a',
  },
  closeBtn: {
    background: '#f1eee5',
    border: '0.5px solid #d3d1c7',
    color: '#2c2c2a',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    fontSize: '20px',
    lineHeight: 1,
    cursor: 'pointer',
  },
  modalPeriodWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.9rem',
  },
  modalBulletList: {
    marginLeft: '1rem',
    marginBottom: '1rem',
    color: '#3f3d38',
    lineHeight: 1.7,
    fontSize: '14px',
  },
}
