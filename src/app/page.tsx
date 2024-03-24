import styles from './page.module.css'
import Banner from '@/components/Banner'
import { TravelCard } from '@/components/TravelCard'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Banner/> 
        <TravelCard></TravelCard>
      </div>
    </main>
  )
}
