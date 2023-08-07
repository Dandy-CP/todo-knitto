import React from "react";
import Image from "next/image";
import { wrapper } from "@/config/redux.store";
import {
  getUsersById,
  getRunningQueriesThunk,
} from "@/config/service/getUsers";
import { poppins } from "@/utils/fonts";
import type { InferGetStaticPropsType } from "next";
import IUsersResponse from "@/types/users.types";
import styles from "@/styles/users.module.css";

const UsersView = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <hr className={styles.hardLine} />

      {data.map((value) => (
        <div key={value.id} className={styles.container}>
          <div className={styles.profileInfoWrap}>
            <Image
              src={"https://i.pravatar.cc/300"}
              alt=""
              width={100}
              height={100}
              className={styles.avatar}
            />

            <div>
              <h1 className={poppins.className}>{value.name}</h1>
              <p className={poppins.className}>{value.username}</p>
              <p className={poppins.className}>{value.email}</p>
            </div>
          </div>

          <div className={styles.profileWrap}>
            <div style={{ marginTop: 20 }}>
              <h3 className={poppins.className}>Address </h3>
              <p className={poppins.className}>
                Street: {value.address.street}
              </p>
              <p className={poppins.className}>Suite: {value.address.suite}</p>
              <p className={poppins.className}>City: {value.address.city}</p>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 className={poppins.className}>Company </h3>
              <p className={poppins.className}>
                Company Name: {value.company.name}
              </p>
              <p className={poppins.className}>{value.company.catchPhrase}</p>
              <p className={poppins.className}>{value.company.bs}</p>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 className={poppins.className}>Number Phone</h3>
              <p className={poppins.className}>Phone Number: {value.phone}</p>
              <p className={poppins.className}>Website: {value.website}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: IUsersResponse[] = await res.json();

  const pathSlug = data.map((value) => ({
    params: { idUsers: String(value.id) },
  }));

  return {
    paths: pathSlug,
    fallback: "blocking",
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const slug = Number(context.params?.idUsers);

    store.dispatch(getUsersById.initiate(slug));

    const value = await Promise.all(store.dispatch(getRunningQueriesThunk()));
    const data: IUsersResponse[] = value[0].data as IUsersResponse[];

    return {
      props: {
        data: data,
      },
      revalidate: 10,
    };
  }
);

export default UsersView;
