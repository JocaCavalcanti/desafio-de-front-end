
import styles from "./page.module.css";
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerMain}>
        <h1>Weather</h1>
        <h2>Select a city</h2>
        
        <GlobeAmericasIcon className={styles.icon} />
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/london"> 
          <span className={styles.linkButton}>Dalloy</span>
        </Link>
        <Link href="/dalloy"> 
          <span className={styles.linkButton}>Fairbanks</span>
        </Link>
        <Link href="/fairbanks"> 
          <span className={styles.linkButton}>London</span>
        </Link>
        <Link href="/recife"> 
          <span className={styles.linkButton}>Recife</span>
        </Link>
        <Link href="/vancouver"> 
          <span className={styles.linkButton}>Vancouver</span>
        </Link>
        <Link href="/yakutsk"> 
          <span className={styles.linkButton}>Yakutsk</span>
        </Link>
      </div>
    </main>
  );
}
