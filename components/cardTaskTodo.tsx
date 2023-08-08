import React from "react";
import styles from "@/styles/cardTaskTodo.module.css";
import { poppins } from "@/utils/fonts";
import { IconList } from "@tabler/icons-react";

interface IDataCard {
  title: string;
  status: boolean;
}

const CardTaskTodo = ({ title, status }: IDataCard) => {
  return (
    <div className={styles.container}>
      <p className={poppins.className}>{title}</p>

      <div className={styles.progress}>
        <div className={styles.progressWrap}>
          <IconList color="gray" size={16} />
          <p className={poppins.className}>Progress</p>
        </div>

        <div>
          <p className={poppins.className}>{status ? "100%" : `${0}%`}</p>
        </div>
      </div>

      <div className={styles.progressBarGrayStack}>
        <div
          style={{
            width: status ? "100%" : "0%",
            height: 4,
            borderRadius: 16,
            backgroundColor: status ? "#78D700" : "#ffa048",
          }}
        ></div>
      </div>

      {status ? (
        <div className={styles.badgeStatusDone}>
          <p className={poppins.className}>DONE</p>
        </div>
      ) : (
        <div className={styles.badgeStatusNotDone}>
          <p className={poppins.className}>NOT DONE</p>
        </div>
      )}
    </div>
  );
};

export default CardTaskTodo;
