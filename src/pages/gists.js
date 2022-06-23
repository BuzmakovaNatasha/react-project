import { Gists } from "../components/gists/gists/gists";
import { GistsByName } from "../components/gists/gistsByName/gistsByName";
import styles from "./gists.module.scss";

export const GistsPage = () => {
  return (
    <div>
      <h1>Gists page</h1>
      <div className={styles.wrapper}>
        <Gists />
        <GistsByName />
      </div>
    </div>
  );
};
