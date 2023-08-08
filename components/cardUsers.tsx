import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/users.module.css";
import { poppins } from "@/utils/fonts";
import Avatar from "@/public/avatar.jpg";

interface IUsers {
  idUsers: number;
  name: string;
  username: string;
  email: string;
}

const CardUsers = ({ idUsers, name, username, email }: IUsers) => {
  return (
    <Link href={`/users/${idUsers}`}>
      <div className={styles.usersWrap}>
        <Image
          src={Avatar}
          alt=""
          width={36}
          height={36}
          className={styles.avatar}
        />
        <p className={poppins.className}>{name}</p>
        <p className={poppins.className}>{username}</p>
        <p className={poppins.className}>{email}</p>
      </div>
    </Link>
  );
};

export default CardUsers;
