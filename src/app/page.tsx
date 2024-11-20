import styles from "./page.module.scss";
import LineDrawer from "~/LineDrawer";

export default function Home() {
  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div>
            <LineDrawer size={4} width={100} position={{y: -2}} delay={1000} duration={100} direction="right" />
            <LineDrawer size={4} width={20} position={{x: 100}} delay={1200} duration={100} direction="down" />
            <LineDrawer size={4} width={100} position={{y: -18}} delay={1400} duration={100} direction="left" />
          </div>
        </main>
      </div>
  );
}
