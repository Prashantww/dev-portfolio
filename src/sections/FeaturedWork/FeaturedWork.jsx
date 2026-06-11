import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import WorkCard from "../../components/WorkCard/WorkCard";
import InfoCard from "../../components/InfoCard/InfoCard";
import styles from "./FeaturedWork.module.css";

// ── Card size definitions ────────────────────────────────────────────────────
const RATIO = {
  small: 284 / 202,
  medium: 336 / 202,
  large: 497 / 404,
};

const BASE_WIDTH = {
  small: 202,
  medium: 202,
  large: 404,
};

function getDimensions(size, scaleFactor = 1) {
  const w = BASE_WIDTH[size] * scaleFactor;
  const h = w * RATIO[size];
  return { width: w, height: h };
}

// ── Default sizes ────────────────────────────────────────────────────────────
// 5 total: infoCard (always large by default) + 4 work cards
const DEFAULT_WORK_SIZES = ["medium", "small", "small", "small"];
const DEFAULT_INFO_SIZE = "large";
const CARD_COUNT = 4; // work cards only
const GAP = 10;
const ANIM_DURATION = 1;
const ANIM_EASE = "power3.out";

// ── Hover size resolver ──────────────────────────────────────────────────────
// info card is conceptually at index -1
// work cards are at index 0–3
function getHoverSizes(hoveredWorkIndex) {
  // Info card: distance = hoveredWorkIndex + 1
  const infoDist = hoveredWorkIndex + 1;
  const infoSize = infoDist === 1 ? "medium" : "small";

  // Work cards
  const workSizes = DEFAULT_WORK_SIZES.map((_, i) => {
    const dist = Math.abs(i - hoveredWorkIndex);
    if (dist === 0) return "large";
    if (dist === 1) return "medium";
    return "small";
  });

  return { infoSize, workSizes };
}

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef(
    Array.from({ length: CARD_COUNT }, () => ({ current: null })),
  );
  const currentWorkSizes = useRef([...DEFAULT_WORK_SIZES]);
  const currentInfoSize = useRef(DEFAULT_INFO_SIZE);

  // ── Scale factor ─────────────────────────────────────────────────────────────
  const getScaleFactor = useCallback((infoSize, workSizes) => {
    const sectionWidth = sectionRef.current?.offsetWidth ?? 1200;
    const totalBaseWidth =
      BASE_WIDTH[infoSize] +
      workSizes.reduce((sum, size) => sum + BASE_WIDTH[size], 0);
    const totalGaps = GAP * (CARD_COUNT + 2); // 4 gaps for 5 items
    return (sectionWidth - totalGaps) / totalBaseWidth;
  }, []);

  // ── Animate to sizes ─────────────────────────────────────────────────────────
  const animateToSizes = useCallback(
    (infoSize, workSizes) => {
      currentInfoSize.current = infoSize;
      currentWorkSizes.current = workSizes;
      const scale = getScaleFactor(infoSize, workSizes);

      // Info card
      const { width: iW, height: iH } = getDimensions(infoSize, scale);
      gsap.to(infoRef.current, {
        width: iW,
        height: iH,
        duration: ANIM_DURATION,
        ease: ANIM_EASE,
        overwrite: "auto",
      });

      gsap.to(descRef.current, {
        opacity: infoSize === "large" ? 1 : 0,
        y: infoSize === "large" ? 0 : -10,
        duration: ANIM_DURATION,
        ease: ANIM_EASE,
        overwrite: "auto",
      });

      // Work cards
      cardRefs.current.forEach(({ current: card }, i) => {
        if (!card) return;
        const { width, height } = getDimensions(workSizes[i], scale);
        gsap.to(card, {
          width,
          height,
          duration: ANIM_DURATION,
          ease: ANIM_EASE,
          overwrite: "auto",
        });
      });
    },
    [getScaleFactor],
  );

  // ── Set sizes instantly (no animation) ───────────────────────────────────────
  const setToSizes = useCallback(
    (infoSize, workSizes) => {
      currentInfoSize.current = infoSize;
      currentWorkSizes.current = workSizes;
      const scale = getScaleFactor(infoSize, workSizes);

      const { width: iW, height: iH } = getDimensions(infoSize, scale);
      gsap.set(infoRef.current, { width: iW, height: iH });

      cardRefs.current.forEach(({ current: card }, i) => {
        if (!card) return;
        const { width, height } = getDimensions(workSizes[i], scale);
        gsap.set(card, { width, height });
      });
    },
    [getScaleFactor],
  );

  // ── Init ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setToSizes(DEFAULT_INFO_SIZE, DEFAULT_WORK_SIZES);
    const onResize = () =>
      setToSizes(currentInfoSize.current, currentWorkSizes.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setToSizes]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleCardEnter = useCallback(
    (i) => {
      const { infoSize, workSizes } = getHoverSizes(i);
      animateToSizes(infoSize, workSizes);
    },
    [animateToSizes],
  );

  const handleCardLeave = useCallback(() => {
    animateToSizes(DEFAULT_INFO_SIZE, DEFAULT_WORK_SIZES);
  }, [animateToSizes]);

  const handleInfoEnter = useCallback(() => {
    animateToSizes(DEFAULT_INFO_SIZE, DEFAULT_WORK_SIZES);
  }, [animateToSizes]);

  const handleInfoLeave = useCallback(() => {
    animateToSizes(DEFAULT_INFO_SIZE, DEFAULT_WORK_SIZES);
  }, [animateToSizes]);
  return (
    <section ref={sectionRef} className={styles.section} data-theme="dark">
      <div className={styles.cards}>
        <InfoCard
          ref={infoRef}
          descRef={descRef}
          onMouseEnter={handleInfoEnter}
          onMouseLeave={handleCardLeave}
        />
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <WorkCard
            key={i}
            cardRef={cardRefs.current[i]}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={handleCardLeave}
          />
        ))}
      </div>
    </section>
  );
}
