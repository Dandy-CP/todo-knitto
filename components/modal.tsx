import React, { ReactNode } from "react";
import Modal from "react-modal";
import styles from "@/styles/modal.module.css";

interface IModal {
  children?: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
}

const customStyles = {
  content: {
    width: "60%",
    height: 500,
    borderRadius: 16,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalIndex = ({ children, modalIsOpen, setModalIsOpen }: IModal) => {
  return (
    <div className={styles.content}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        style={customStyles}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalIndex;
