import styles from "./style.module.scss";
import Kanban from "../../components/kanban";
const Home = () => {
  return (
    <section className={styles.main}>
      <Kanban />
    </section>
  );
};

export default Home;
