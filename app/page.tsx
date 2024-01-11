import styles from "./page.module.css";

import Gallery from "./gallery";

export default function Home() {
  return (
    <main className={styles.main}>
      <Gallery />
    </main>
  );
}
