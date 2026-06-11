import styles from "./WorkCard.module.css";

export default function WorkCard({
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
    />
  );
}
