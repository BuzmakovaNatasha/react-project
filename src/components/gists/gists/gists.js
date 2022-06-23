import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGists } from "../../../store/gists";
import styles from "./gists.module.scss";

export const Gists = () => {
  const dispatch = useDispatch();
  const { gists, error, pending } = useSelector((state) => state.gists);

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  if (pending) {
    return (
      <div>
        <h1>isLoading .....</h1>
      </div>
    );
  }
  return (
    <div className={styles.content}>
      {Array.from({ length: 10 })
        .map((_, index) => index + 1)
        .map((item) => (
          <button onClick={() => dispatch(getGists(item))} key={item}>
            {item}
          </button>
        ))}

      {error ? (
        <h1>Error !!!!!</h1>
      ) : (
        <>
          {gists.map((gist, index) => (
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
