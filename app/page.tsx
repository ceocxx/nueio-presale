import Head from 'next/head'
import styles from '../app/globals.css'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NUEIO Token Pre-Sale</title>
        <meta name="description" content="Pre-sale website for NUEIO token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
      </main>
    </div>
  )
}

export default Home