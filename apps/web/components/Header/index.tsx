import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.institutionName}>Associação Lar dos Idosos de Nazário</span>
        <div className={styles.userPlaceholder}>
          <div className={styles.avatar}>A</div>
        </div>
      </div>
    </header>
  );
}