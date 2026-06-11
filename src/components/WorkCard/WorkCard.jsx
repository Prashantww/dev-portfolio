import styles from "./WorkCard.module.css";

/**
 * WorkCard — a single card in the FeaturedWork grid.
 * Size is driven by inline style (width + height) passed from parent.
 * The card itself is purely presentational — sizing logic lives in FeaturedWork.
 */
export default function WorkCard({
  cardRef,
  onMouseEnter,
  onMouseLeave,
  style,
}) {
  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    ></div>
  );
}
