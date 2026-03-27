import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const delay = 0.6;

    gsap.fromTo(
      badgeRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, delay, ease: "power3.out" },
    );

    gsap.fromTo(
      headingRef.current.querySelectorAll(`.${styles.line}`),
      { y: "100%" },
      { y: "0%", duration: 0.8, delay, stagger: 0.1, ease: "power3.out" },
    );

    gsap.fromTo(
      subRef.current.querySelectorAll(`.${styles.subInner}`),
      { y: "100%" },
      { y: "0%", duration: 0.7, delay, stagger: 0.1, ease: "power3.out" },
    );

    gsap.fromTo(
      buttonsRef.current.querySelectorAll(`.${styles.btn}`),
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        delay,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} data-theme="dark">
      {/* ── Left / text pane ───────────────────────────────────────────── */}
      <div className={styles.textPane}>
        {/* Badge */}
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.dot}>
            <span className={styles.dotInner} />
          </span>
          <span className={styles.badgeText}>NOW CREATING</span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className={styles.heading}>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>Hey, I'm Prashant&nbsp;Warghude</span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>
              I build clean &amp; interactive web interfaces
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className={styles.sub}>
          <span className={styles.lineWrapper}>
            <span className={styles.subInner}>
              The combination of my passion for design, code &amp;
            </span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.subInner}>
              interaction positions me in a unique place in the
            </span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.subInner}>web design world.</span>
          </span>
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Work</button>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            Contact
          </button>
        </div>
      </div>

      {/* ── Right / gallery pane — placeholder for now ─────────────────── */}
      <div className={styles.galleryPane}>{/* gallery goes here */}</div>
    </section>
  );
}
