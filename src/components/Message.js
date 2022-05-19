import React from "react";
import styles from "./message.module.scss";

export function Message(props) {
  return <div className={styles.msg}>{props.text}</div>;
}
