import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { poppins } from "@/utils/fonts";
import styles from "@/styles/Layout.module.css";
import DotIcon from "@/public/icons/Ovals.svg";
import LogoIcon from "@/public/icons/Logo.svg";
import CalendarIcon from "@/public/icons/calendar.svg";
import { IconHome2, IconUsers } from "@tabler/icons-react";
import "react-toastify/dist/ReactToastify.css";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const route = useRouter();
  const dateToday = new Date().toLocaleDateString();

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.blackSide}>
        <Image src={DotIcon} alt="" />
        <Image src={LogoIcon} alt="" />
        <div
          style={{
            backgroundColor: route.pathname.includes("dashboard")
              ? "gray"
              : "transparent",
            borderRadius: 100,
            padding: 5,
            cursor: "pointer",
          }}
          onClick={() => {
            route.push("/dashboard?tab=ALL&limit=10&page=1");
          }}
        >
          <IconHome2 color="white" size={25} />
        </div>

        <div
          style={{
            backgroundColor: route.pathname.includes("users")
              ? "gray"
              : "transparent",
            borderRadius: 100,
            padding: 5,
            cursor: "pointer",
          }}
          onClick={() => {
            route.push("/users?limit=10&page=1");
          }}
        >
          <IconUsers color="white" size={25} />
        </div>
      </div>

      <div className={styles.sideBarContent}>
        <div className={styles.titleSideBar}>
          <h1 className={poppins.className}>To Do Task</h1>
        </div>

        <div className={styles.taskListOptions}>
          <h1 className={poppins.className}>Running Todo Task</h1>
        </div>
      </div>

      <div className={styles.wrapLayout}>
        <div className={styles.headerBar}>
          <h1 className={poppins.className}>Welcome Back </h1>

          <div className={styles.headerBarInformation}>
            <Image src={CalendarIcon} alt="" />
            <p className={poppins.className}>{dateToday}</p>
            <Image
              src={"https://i.pravatar.cc/300"}
              alt=""
              width={36}
              height={36}
              className={styles.avatar}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
