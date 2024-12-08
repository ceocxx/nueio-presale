// app/page.tsx
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to NUEIO Token Pre-Sale
        </h1>
        <p className={styles.description}>
          Participate in the NUEIO pre-sale and become a part of our community!
        </p>

        <div style={{ marginTop: '40px' }}>
          <Link href="/presale">
            <a style={{ fontSize: '20px', color: 'blue' }}>Go to Pre-Sale</a>
          </Link>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Link href="/governance">
            <a style={{ fontSize: '20px', color: 'blue' }}>Governance</a>
          </Link>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Link href="/vesting">
            <a style={{ fontSize: '20px', color: 'blue' }}>Vesting</a>
          </Link>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Link href="/staking">
            <a style={{ fontSize: '20px', color: 'blue' }}>Staking</a>
          </Link>
        </div>
      </main>
    </div>
  )
}