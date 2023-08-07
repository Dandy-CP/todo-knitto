import React, { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { poppins } from "@/utils/fonts";
import styles from "@/styles/pagination.module.css";

interface IPagination {
  disabled: boolean;
  onChange: (page: number) => void;
  totalPage: number;
  activePage: number;
}

const Pagination = ({
  disabled,
  onChange,
  totalPage,
  activePage,
}: IPagination) => {
  const [CurrentPage, setCurrentPage] = useState(activePage);

  useEffect(() => {
    if (activePage !== CurrentPage) {
      setCurrentPage(activePage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const handleIncrement = () => {
    if (disabled) return;

    if (CurrentPage < totalPage) {
      setCurrentPage(CurrentPage + 1);
      if (typeof onChange === "function") {
        onChange(CurrentPage + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (disabled) return;

    if (CurrentPage > 1) {
      setCurrentPage(CurrentPage - 1);
      if (typeof onChange === "function") {
        onChange(CurrentPage - 1);
      }
    }
  };

  const handleToEndPage = () => {
    if (disabled) return;

    setCurrentPage(totalPage);
    if (typeof onChange === "function") {
      onChange(totalPage);
    }
  };

  const handleToStartPage = () => {
    if (disabled) return;

    setCurrentPage(1);
    if (typeof onChange === "function") {
      onChange(1);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.buttonPagination}
        disabled={CurrentPage === 1}
        onClick={handleDecrement}
      >
        <IconChevronLeft />
      </button>

      <p
        className={poppins.className}
        onClick={handleToStartPage}
        style={{
          cursor: "pointer",
        }}
      >
        {CurrentPage}
      </p>

      <p className={poppins.className}>/</p>

      <p
        className={poppins.className}
        style={{
          cursor: "pointer",
        }}
        onClick={handleToEndPage}
      >
        {totalPage || 1}
      </p>

      <button
        className={styles.buttonPagination}
        disabled={CurrentPage === (totalPage || 1)}
        onClick={handleIncrement}
      >
        <IconChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
