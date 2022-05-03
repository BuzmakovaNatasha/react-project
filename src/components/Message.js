import React from "react";
import styles from "./message.module.css";

export function Message(props) {
  return <div className={styles.msg}>{props.text}</div>;
}
