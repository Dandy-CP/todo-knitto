import React from "react";
import { poppins } from "@/utils/fonts";
import styles from "@/styles/dashboard.module.css";

interface IFilter {
  tab: string;
  setPage: (page: number) => void;
  setTab: (tab: string) => void;
}

const Filter = ({ tab, setPage, setTab }: IFilter) => {
  return (
    <div className={styles.warpFilter}>
      <div
        onClick={() => {
          setPage(1);
          setTab("ALL");
        }}
      >
        <p
          className={poppins.className}
          style={{
            backgroundColor: tab === "ALL" ? "#1c1d2214" : "transparent",
          }}
        >
          All Todo
        </p>
      </div>

      <div
        onClick={() => {
          setPage(1);
          setTab("DONE");
        }}
      >
        <p
          className={poppins.className}
          style={{
            backgroundColor: tab === "DONE" ? "#1c1d2214" : "transparent",
          }}
        >
          Done
        </p>
      </div>

      <div
        onClick={() => {
          setPage(1);
          setTab("NOT DONE");
        }}
      >
        <p
          className={poppins.className}
          style={{
            backgroundColor: tab === "NOT DONE" ? "#1c1d2214" : "transparent",
          }}
        >
          Not Done
        </p>
      </div>

      <div
        onClick={() => {
          setPage(1);
          setTab("BOTH");
        }}
      >
        <p
          className={poppins.className}
          style={{
            backgroundColor: tab === "BOTH" ? "#1c1d2214" : "transparent",
          }}
        >
          Show Both
        </p>
      </div>
    </div>
  );
};

export default Filter;
