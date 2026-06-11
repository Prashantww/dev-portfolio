import { forwardRef } from "react";
import styles from "./InfoCard.module.css";

const InfoCard = forwardRef(({ descRef, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.card} {...props}>
      <div className={styles.top}>
        <h2 className={styles.title}>Featured Work</h2>

        <p ref={descRef} className={styles.desc}>
          A handpicked collection of projects highlighting my focus on modern
          design, interaction, and frontend craftsmanship.
        </p>
      </div>

      <div className={styles.bottom}>
        <button className={styles.allWork}>
          All Work <span className={styles.dot} />
        </button>
      </div>
    </div>
  );
});

export default InfoCard;
