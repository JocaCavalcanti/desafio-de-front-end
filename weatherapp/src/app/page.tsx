import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerMain}>
        <h1>Weather</h1>
        <h2>Select a city</h2>
        <FontAwesomeIcon icon={faEarthAmericas} />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonArounder}>City 1</button>
        <button className={styles.buttonArounder}>City 2</button>
        <button className={styles.buttonArounder}>City 3</button>
        <button className={styles.buttonArounder}>City 4</button>
        <button className={styles.buttonArounder}>City 5</button>
        <button className={styles.buttonArounder}>City 6</button>
      </div>
    </main>
  );
}
