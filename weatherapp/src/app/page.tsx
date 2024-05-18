import styles from "./page.module.css";
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerMain}>
        <h1>Weather</h1>
        <h2>Select a city</h2>
        <GlobeAmericasIcon className={styles.icon} />
      </div>
      <div className={styles.buttonContainer}>
        <a href="/city" className={styles.linkButton}>Dalloy</a>
        <a href="/city2" className={styles.linkButton}>Fairbanks</a>
        <a href="/city3" className={styles.linkButton}>London</a>
        <a href="/city4" className={styles.linkButton}>Recife</a>
        <a href="/city5" className={styles.linkButton}>Vancouver</a>
        <a href="/city6" className={styles.linkButton}>Yakutsk</a>
      </div>
    </main>
  );
}
