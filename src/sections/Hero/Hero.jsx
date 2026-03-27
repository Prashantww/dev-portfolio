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
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.6, // let navbar animate in first
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
    )
      .fromTo(
        // animate each line of the heading individually
        headingRef.current.querySelectorAll(`.${styles.line}`),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.3",
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        buttonsRef.current.querySelectorAll(`.${styles.btn}`),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3",
      );
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} data-theme="dark">
      {/* ── Left / text pane ───────────────────────────────────────────── */}
      <div className={styles.textPane}>
        {/* Badge */}
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.dot} />
          <span className={styles.badgeText}>NOW CREATING</span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className={styles.heading}>
          <span className={styles.line}>Hey, I'm Prashant Warghude</span>
          <span className={styles.line}>I build clean &amp; interactive </span>
          <span className={styles.line}>web interfaces</span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className={styles.sub}>
          The combination of my passion for design, code &amp; interaction
          positions me in a unique place in the web design world.
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
