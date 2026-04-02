import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

// ── Dummy image seeds ────────────────────────────────────────────────────────
const COL1 = [
  "/heroImages/img1.jpg",
  "/heroImages/img2.jpg",
  "/heroImages/img3.jpg",
  "/heroImages/img4.jpg",
  "/heroImages/img5.jpg",
  "/heroImages/img3.jpg",
];

const COL2 = [
  "/heroImages/img1.jpg",
  "/heroImages/img2.jpg", // can reuse if you have fewer
  "/heroImages/img4.jpg",
  "/heroImages/img3.jpg",
  "/heroImages/img1.jpg",
  "/heroImages/img5.jpg",
];

// same for ROW1, ROW2 on mobile
const ROW1 = [...COL1];
const ROW2 = [...COL2];

// ── Desktop: vertical scrolling column ──────────────────────────────────────
function VerticalColumn({ seeds, direction = "up", speed = 40 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const getHeight = () => track.scrollHeight / 2;

    if (direction === "down") {
      gsap.set(track, { y: -getHeight() });
    }

    const tween = gsap.to(track, {
      y: direction === "up" ? `-=${getHeight()}` : `+=${getHeight()}`,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => {
          const h = getHeight();
          if (direction === "up") {
            return ((parseFloat(y) % h) - h) % -h;
          } else {
            return (((-parseFloat(y) % h) + h) % h) * -1;
          }
        }),
      },
    });

    return () => tween.kill();
  }, [direction, speed]);

  const allSeeds = [...seeds, ...seeds];

  return (
    <div className={styles.verticalColumn}>
      <div ref={trackRef} className={styles.verticalTrack}>
        {allSeeds.map((seed, i) => (
          <div key={i} className={styles.desktopItem}>
            <img src={seed} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mobile: horizontal scrolling row ────────────────────────────────────────
function HorizontalRow({ seeds, direction = "left", speed = 30 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const getWidth = () => track.scrollWidth / 2;

    if (direction === "right") {
      gsap.set(track, { x: -getWidth() });
    }

    const tween = gsap.to(track, {
      x: direction === "left" ? `-=${getWidth()}` : `+=${getWidth()}`,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const w = getWidth();
          if (direction === "left") {
            return ((parseFloat(x) % w) - w) % -w;
          } else {
            return (((-parseFloat(x) % w) + w) % w) * -1;
          }
        }),
      },
    });

    return () => tween.kill();
  }, [direction, speed]);

  const allSeeds = [...seeds, ...seeds];

  return (
    <div className={styles.horizontalRow}>
      <div ref={trackRef} className={styles.horizontalTrack}>
        {allSeeds.map((seed, i) => (
          <div key={i} className={styles.mobileItem}>
            <img src={seed} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
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
      {/* ── Left / text pane ─────────────────────────────────────────────── */}
      <div className={styles.textPane}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.dot}>
            <span className={styles.dotInner} />
          </span>
          <span className={styles.badgeText}>NOW CREATING</span>
        </div>

        <h1 ref={headingRef} className={styles.heading}>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>Hey, I'm Prashant&nbsp;Warghude</span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.line}>
              I build clean &amp; interactive web&nbsp;interfaces
            </span>
          </span>
        </h1>

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

        <div ref={buttonsRef} className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Work</button>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            Contact
          </button>
        </div>
      </div>

      {/* ── Desktop: vertical gallery ─────────────────────────────────────── */}
      <div className={styles.desktopGallery}>
        <VerticalColumn seeds={COL1} direction="up" speed={45} />
        <VerticalColumn seeds={COL2} direction="down" speed={40} />
      </div>

      {/* ── Mobile: horizontal gallery ───────────────────────────────────── */}
      <div className={styles.mobileGallery}>
        <HorizontalRow seeds={ROW1} direction="left" speed={30} />
        <HorizontalRow seeds={ROW2} direction="right" speed={26} />
      </div>
    </section>
  );
}
