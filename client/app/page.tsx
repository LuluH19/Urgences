import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Urgences</h1>
        <p className={styles.description}>
          Application de gestion des urgences
        </p>
      </div>
    </main>
  )
}

