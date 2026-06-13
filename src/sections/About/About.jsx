import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const RESUME_URL =
  "https://drive.google.com/file/d/1fJRmTUsSEpMKmcKKEdoA9iJypIL-4H2C/view";

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = headingRef.current.querySelectorAll(`.${styles.line}`);
    const body = bodyRef.current;
    const card = cardRef.current;

    // ── Initial states ───────────────────────────────────────────────────────
    gsap.set(lines, { y: "100%" });
    gsap.set(body, { opacity: 0, y: 24 });
    gsap.set(card, { opacity: 0, y: 32 });

    // ── Reveal on scroll ─────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    tl.to(lines, {
      y: "0%",
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
    })
      .to(
        body,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-theme="light">
      <div className={styles.left}>
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <h2 ref={headingRef} className={styles.heading}>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>Who I Am &amp;</span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>What I Do</span>
          </span>
        </h2>

        {/* ── Body text ─────────────────────────────────────────────────── */}
        <p ref={bodyRef} className={styles.body}>
          I'm Prashant Warghude, a 3rd-year AI &amp; ML student from Pune,
          passionate about creating modern, aesthetic, and animated web
          experiences. I specialize in frontend development and am learning
          backend to go full-stack. With a background in video editing, I bring
          a strong sense of design and motion to craft visually engaging
          interfaces.
        </p>
      </div>

      <div className={styles.right}>
        {/* ── Resume card ───────────────────────────────────────────────── */}
        <div ref={cardRef} className={styles.resumeCard}>
          <div className={styles.cardTop}>
            <h3 className={styles.cardTitle}>
              Interested in my work beyond the screen?
            </h3>
            <p className={styles.cardDesc}>
              Download my resume to get a detailed overview of my skills,
              experience, and journey as a frontend developer.
            </p>
          </div>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
          >
            RESUME <span className={styles.dot} />
          </a>
        </div>
      </div>
    </section>
  );
}
