import WorkCard from "../../../components/WorkCard/WorkCard";
import styles from "./FeaturedWorkMobile.module.css";
import { projects } from "../../../data/projects";

const PROJECTS = [1, 2, 3, 4];

export default function FeaturedWorkMobile() {
  return (
    <section className={styles.section} data-theme="dark">
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Work</h2>

        <p className={styles.description}>
          A handpicked collection of projects highlighting my focus on modern
          design, interaction, and frontend craftsmanship.
        </p>
      </div>

      <div className={styles.scroller}>
        {projects.map((project) => (
          <WorkCard key={project.title} project={project} mobile />
        ))}
      </div>

      <button className={styles.allWork}>
        All Work <span className={styles.dot} />
      </button>
    </section>
  );
}
