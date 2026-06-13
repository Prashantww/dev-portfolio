import styles from "./Footer.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1fJRmTUsSEpMKmcKKEdoA9iJypIL-4H2C/view";
const LINKEDIN_URL = "https://www.linkedin.com/in/prashant-warghude-79969b2b1/";
const TWITTER_URL = "https://x.com/prashant_kvian";
const INSTAGRAM_URL = "https://www.instagram.com/prashant_kvian/";

export default function Footer() {
  return (
    <footer className={styles.footer} data-theme="dark">
      {/* ── DESKTOP: big email hero area ──────────────────────────────────── */}
      <div className={styles.hero}>
        {/* Top right: location + year */}
        <div className={styles.meta}>
          <span>Maharashtra, India</span>
          <span>2026</span>
        </div>

        {/* Center: CTA + email */}
        <div className={styles.cta}>
          <p className={styles.ctaLabel}>Looking for new talent?</p>
          <a href="mailto:prashant1warghude@gmail.com" className={styles.email}>
            prashant1warghude@gmail.com
          </a>
          <div className={styles.heroLinks}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroLink}
            >
              LinkedIn
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroLink}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* ── TABLET + MOBILE: site index / social / contact grid ──────────── */}
      <div className={styles.grid}>
        <div className={styles.col}>
          <span className={styles.colTitle}>Site Index</span>
          <a href="#home" className={styles.colLink}>
            Home
          </a>
          <a href="#work" className={styles.colLink}>
            Work
          </a>
          <a href="#about" className={styles.colLink}>
            About
          </a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Social</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.colLink}
          >
            LinkedIn
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.colLink}
          >
            Twitter / X
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.colLink}
          >
            Instagram
          </a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Contact</span>
          <a href="tel:+919356810372" className={styles.colLink}>
            (+91) 9356810372
          </a>
          <a
            href="mailto:prashant1warghude@gmail.com"
            className={styles.colLink}
          >
            prashant1warghude@gmail.com
          </a>
        </div>
      </div>

      {/* ── Bottom bar (tablet + mobile) ──────────────────────────────────── */}
      <div className={styles.bottom}>
        <div className={styles.bottomResume}>
          <span>For a detailed look at my work and experience </span>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            view my Resume
          </a>
        </div>
        <p className={styles.copy}>© 2026 Prashant | Maharashtra, India</p>
      </div>
    </footer>
  );
}
