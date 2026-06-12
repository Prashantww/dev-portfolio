import styles from "./WorkCard.module.css";

export default function WorkCard({
  project,
  cardRef,
  mobile = false,
  className = "",
  ...props
}) {
  return (
    <div
      ref={cardRef}
      className={`
        ${styles.card}
        ${mobile ? styles.mobile : ""}
        ${className}
      `}
      {...props}
    >
      <img src={project.image} alt={project.title} className={styles.image} />

      <div className={styles.overlay}>
        <div className={styles.tags}>
          <span>{project.title}</span>

          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
