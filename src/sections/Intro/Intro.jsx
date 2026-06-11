import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Intro.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const titleCardRef = useRef(null);
  const descCardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const titleCard = titleCardRef.current;
    const descCard = descCardRef.current;

    const isMobile = window.innerWidth <= 768;
    const lineSelector = isMobile
      ? `.${styles.mobLine}`
      : `.${styles.deskLine}`;
    const lines = heading.querySelectorAll(lineSelector);

    // ── Heading reveal (all screen sizes) ───────────────────────────────────
    gsap.set(lines, { y: "30px", filter: "blur(10px)" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          once: true,
          // markers: true,
          scrub: 1,
        },
      })
      .to(lines, {
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.5,

        ease: "power3.out",
      });

    // ── Pin + card animations (desktop only) ────────────────────────────────
    if (!isMobile) {
      gsap.set(titleCard, { y: 500 });
      gsap.set(descCard, { y: 550 });

      // Smooth scale on pin enter/leave
      // gsap.set(section, { scale: 1, opacity: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 3,
            // markers: true,
          },
        })
        .to(titleCard, { y: 0, duration: 0.4 }, 0)
        .to(descCard, { y: 0, duration: 0.4 }, 0.05)
        .to(titleCard, { y: -420, duration: 0.6, ease: "none" }, 0.4)
        .to(descCard, { y: -470, duration: 0.6, ease: "none" }, 0.4);
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-theme="light">
      <div className={styles.wrap}>
        <h2 ref={headingRef} className={styles.heading}>
          {/* Desktop: 2 lines */}
          <span className={`${styles.headingLine} ${styles.deskLine}`}>
            Crafting modern
          </span>
          <span className={`${styles.headingLine} ${styles.deskLine}`}>
            digital <span className={styles.highlight}>experiences</span>
          </span>

          {/* Mobile / tablet: 4 lines */}
          <span className={`${styles.headingLine} ${styles.mobLine}`}>
            Crafting
          </span>
          <span className={`${styles.headingLine} ${styles.mobLine}`}>
            modern
          </span>
          <span className={`${styles.headingLine} ${styles.mobLine}`}>
            digital
          </span>
          <span className={`${styles.headingLine} ${styles.mobLine}`}>
            <span className={styles.highlight}>experiences</span>
          </span>
        </h2>

        <div
          ref={titleCardRef}
          className={`${styles.card} ${styles.titleCard}`}
        >
          Freelance Frontend Developer
        </div>

        <div ref={descCardRef} className={`${styles.card} ${styles.descCard}`}>
          The combination of my passion for design, code &amp; interaction
          positions me in a unique place in the web design world.
        </div>
      </div>
    </section>
  );
}
