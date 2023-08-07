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
      <p
        className={poppins.className}
        style={{
          backgroundColor: tab === "ALL" ? "#1c1d2214" : "transparent",
        }}
        onClick={() => {
          setPage(1);
          setTab("ALL");
        }}
      >
        All Todo
      </p>
      <p
        className={poppins.className}
        style={{
          backgroundColor: tab === "DONE" ? "#1c1d2214" : "transparent",
        }}
        onClick={() => {
          setPage(1);
          setTab("DONE");
        }}
      >
        Done
      </p>
      <p
        className={poppins.className}
        style={{
          backgroundColor: tab === "NOT DONE" ? "#1c1d2214" : "transparent",
        }}
        onClick={() => {
          setPage(1);
          setTab("NOT DONE");
        }}
      >
        Not Done
      </p>
      <p
        className={poppins.className}
        style={{
          backgroundColor: tab === "BOTH" ? "#1c1d2214" : "transparent",
        }}
        onClick={() => {
          setPage(1);
          setTab("BOTH");
        }}
      >
        Show Both
      </p>
    </div>
  );
};

export default Filter;
