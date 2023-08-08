import React from "react";
import { wrapper } from "@/config/redux.store";
import { getUsers, getRunningQueriesThunk } from "@/config/service/getUsers";
import CardUsers from "@/components/cardUsers";
import type IUsersResponse from "@/types/users.types";
import type { InferGetServerSidePropsType } from "next";
import styles from "@/styles/users.module.css";

const Index = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <hr className={styles.hardLine} />

      <div className={styles.container}>
        {users.map((value) => (
          <div key={value.id}>
            <CardUsers
              key={value.id}
              idUsers={value.id}
              name={value.name}
              username={value.username}
              email={value.email}
            />
            <hr className={styles.hardLineBreak} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = Number(context.query.page);
    const limit = Number(context.query.limit);

    store.dispatch(
      getUsers.initiate({
        limit: limit === null ? 10 : limit,
        page: page === null ? 1 : page,
      })
    );

    const value = await Promise.all(store.dispatch(getRunningQueriesThunk()));
    const data: IUsersResponse[] = value[0].data as IUsersResponse[];

    return {
      props: {
        users: data,
      },
    };
  }
);

export default Index;
