import React, { FC, ReactNode } from "react";
import { poppins } from "@/utils/fonts";
import styles from "@/styles/boxWrap.module.css";
import { IconPlus } from "@tabler/icons-react";

interface IBoxWrap {
  children?: ReactNode;
  title: string;
  modalAdd: (isOpen: boolean) => void;
}

const BoxDashWrap: FC<IBoxWrap> = ({ children, title, modalAdd }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerCardBox}>
        <p className={poppins.className}>{title}</p>

        {title !== "Completed" && (
          <div
            className={styles.subCard}
            onClick={() => {
              modalAdd(true);
            }}
          >
            <IconPlus color="black" size={18} />
            <p className={poppins.className}>Add New Task</p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default BoxDashWrap;
