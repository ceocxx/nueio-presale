// app/presale/page.tsx
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Connection, clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import styles from '../../styles/Home.module.css'
import { getCurrentPrice, getCurrentStage } from '../../utils/pricing'
import { PRESALE_CONFIG } from '../../config/presaleConfig'
import { program, provider } from '../../lib/anchor'
import { useRouter } from 'next/router'

const Presale = () => {
  const { publicKey, sendTransaction } = useWallet()
  const router = useRouter()
  const { ref } = router.query // Referral code from URL
  const [connection, setConnection] = useState<Connection | null>(null)
  const [tokensSold, setTokensSold] = useState<number>(0)
  const [currentPrice, setCurrentPrice] = useState<number>(PRESALE_CONFIG.startingPrice)
  const [stage, setStage] = useState<number>(1)
  const [referrer, setReferrer] = useState<PublicKey | null>(null)

  useEffect(() => {
    const conn = new Connection(clusterApiUrl('devnet'), 'confirmed') // Use 'mainnet-beta' for production
    setConnection(conn)

    // Fetch tokens sold from the smart contract
    const fetchTokensSold = async () => {
      try {
        const presaleAccount = await program.account.presale.fetch(
          new PublicKey('PRESALE_ACCOUNT_PUBLIC_KEY') // Replace with actual presale account public key
        )
        setTokensSold(presaleAccount.tokensSold.toNumber())
        setStage(getCurrentStage(presaleAccount.tokensSold.toNumber()))
        setCurrentPrice(getCurrentPrice(presaleAccount.tokensSold.toNumber()))
      } catch (error) {
        console.error('Error fetching presale account:', error)
      }
    }

    fetchTokensSold()

    // Handle referral code
    if (ref && typeof ref === 'string') {
      try {
        const refPubKey = new PublicKey(ref)
        setReferrer(refPubKey)
      } catch (error) {
        console.error('Invalid referral code')
      }
    }
  }, [ref])

  const handleBuy = async () => {
    if (!publicKey || !connection) {
      alert('Please connect your wallet.')
      return
    }

    const amountStr = prompt('Enter the number of NUEIO tokens you want to buy:')
    if (!amountStr) return

    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount.')
      return
    }

    const totalPrice = currentPrice * amount
    const lamports = totalPrice * LAMPORTS_PER_SOL

    // Replace with your presale account public key
    const presaleAccount = new PublicKey('PRESALE_ACCOUNT_PUBLIC_KEY') // Replace with actual presale account

    try {
      const tx = await program.methods.buyTokens(new anchor.BN(amount), referrer)
        .accounts({
          presale: presaleAccount,
          buyer: publicKey,
          // Add other necessary accounts like presale_token_account, buyer_token_account, referrer_token_account
          // These need to be defined based on your smart contract
        })
        .rpc()

      console.log('Transaction successful:', tx)
      alert(`Transaction successful! Signature: ${tx}`)

      // Update tokens sold
      setTokensSold(tokensSold + amount)
      setStage(getCurrentStage(tokensSold + amount))
      setCurrentPrice(getCurrentPrice(tokensSold + amount))

      // Handle Referral Bonus
      if (referrer) {
        // TODO: Implement referral bonus distribution via smart contract or backend
        alert(`Referral bonus of ${(totalPrice * PRESALE_CONFIG.referralBonus).toFixed(3)} SOL awarded to referrer.`)
      }
    } catch (error) {
      console.error('Transaction failed:', error)
      alert('Transaction failed!')
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          NUEIO Token Pre-Sale
        </h1>
        <p className={styles.description}>
          Sale Period: {PRESALE_CONFIG.saleStartDate.toDateString()} - {PRESALE_CONFIG.saleEndDate.toDateString()}
        </p>
        <p className={styles.description}>
          Tokens Sold: {tokensSold} / {PRESALE_CONFIG.presaleAllocation}
        </p>
        <p className={styles.description}>
          Current Stage: {stage} / {PRESALE_CONFIG.stages}
        </p>
        <p className={styles.description}>
          Current Price: {currentPrice.toFixed(3)} SOL per NUEIO
        </p>

        {referrer && (
          <p className={styles.description}>
            Referred by: {referrer.toBase58()}
          </p>
        )}

        <button onClick={handleBuy}>
          Buy NUEIO
        </button>
      </main>
    </div>
  )
}

export default Presale