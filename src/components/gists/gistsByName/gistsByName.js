import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { getGistsByName } from "../../../store/gists";
import { Input } from "@mui/material";
import styles from "./gistsByName.module.scss";

const searchGistsDebounced = debounce((query, dispatch) => {
  dispatch(getGistsByName(query));
}, 1000);

export const GistsByName = () => {
  const [value, setValue] = useState("bogdanq");

  const dispatch = useDispatch();
  const { gistsByName, errorByName, pendingByName } = useSelector(
    (state) => state.gists
  );

  useEffect(() => {
    if (!!value) {
      searchGistsDebounced(value, dispatch);
    }
  }, [value, dispatch]);

  if (pendingByName) {
    return (
      <div>
        <h1>isLoading .....</h1>
      </div>
    );
  }
  return (
    <div className={styles.content}>
      <Input
        placeholder="Введите имя..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorByName ? (
        <h1>Error !!!!!</h1>
      ) : (
        <>
          {gistsByName.map((gist, index) => (
            <div key={index}>
              <h2>
                {gist.description || (
                  <span style={{ fontWeight: "bold" }}>no description</span>
                )}
              </h2>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
