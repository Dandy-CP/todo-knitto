import React, { useState, useEffect } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { wrapper } from "@/config/redux.store";
import {
  getToDoList,
  getToDoByStatus,
  getRunningQueriesThunk,
  usePostNewTodoMutation,
} from "@/config/service/getTodo";
import ModalIndex from "@/components/modal";
import BoxDashWrap from "@/components/boxDashWrap";
import CardTaskTodo from "@/components/cardTaskTodo";
import Pagination from "@/components/pagination";
import Filter from "@/components/filter";
import type { InferGetServerSidePropsType } from "next";
import type ITodoResponse from "@/types/todo.types";
import { poppins } from "@/utils/fonts";
import styles from "@/styles/dashboard.module.css";
import stylesModal from "@/styles/modal.module.css";
import "react-toastify/dist/ReactToastify.css";

interface ILocalTodo {
  title: string;
  completed: boolean;
  id: number;
}

const Index = ({
  listToDo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [localTodo, setLocalTodo] = useState<ILocalTodo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [tab, setTab] = useState<string>("ALL");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [todoInput, setTodoInput] = useState<string>("");
  const [createTodo] = usePostNewTodoMutation();

  const handleSubmit = async () => {
    if (todoInput.length === 0) {
      toast.error("Todo tidak boleh kosong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const payload = {
      title: todoInput,
      completed: false,
    };

    await toast
      .promise(createTodo(payload), {
        pending: "Please Wait....",
        success: "Success Add Todo",
        error: "Gagal menambahkan Todo",
      })
      .then((res: any) => {
        setModalIsOpen(false);
        setTodoInput("");
        setLocalTodo((prev) => [...prev, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Router.replace(`?tab=${tab}&limit=10&page=${page}`);
  }, [page, tab]);

  return (
    <main>
      <div className={styles.containerFilter}>
        <Filter tab={tab} setPage={setPage} setTab={setTab} />
        <hr className={styles.hardLine} />
      </div>

      <div className={styles.mainContent}>
        {tab !== "BOTH" && (
          <BoxDashWrap
            title={tab === "DONE" ? "Completed" : "Todo"}
            modalAdd={setModalIsOpen}
          >
            {tab !== "DONE" &&
              page === 1 &&
              localTodo.map((value, index) => (
                <CardTaskTodo
                  key={index}
                  title={value.title}
                  status={value.completed}
                />
              ))}

            {listToDo.map((value) => (
              <CardTaskTodo
                key={value.id}
                title={value.title}
                status={value.completed}
              />
            ))}
          </BoxDashWrap>
        )}

        {tab === "BOTH" && (
          <>
            <BoxDashWrap title="Todo" modalAdd={setModalIsOpen}>
              {page === 1 &&
                localTodo.map((value, index) => (
                  <CardTaskTodo
                    key={index}
                    title={value.title}
                    status={value.completed}
                  />
                ))}

              {listToDo
                .filter((value) => value.completed === false)
                .map((data) => (
                  <CardTaskTodo
                    key={data.id}
                    title={data.title}
                    status={data.completed}
                  />
                ))}
            </BoxDashWrap>
            <BoxDashWrap title="Completed" modalAdd={setModalIsOpen}>
              {listToDo
                .filter((value) => value.completed === true)
                .map((data) => (
                  <CardTaskTodo
                    key={data.id}
                    title={data.title}
                    status={data.completed}
                  />
                ))}
            </BoxDashWrap>
          </>
        )}
      </div>
      <Pagination
        onChange={setPage}
        disabled={false}
        totalPage={
          tab === "ALL" ? 20 : tab === "DONE" ? 9 : tab === "NOT DONE" ? 11 : 20
        }
        activePage={page}
      />

      <ModalIndex modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <h1
          style={{ textAlign: "center", fontSize: 23, marginBottom: 20 }}
          className={poppins.className}
        >
          Add New Todo Task
        </h1>

        <hr className={styles.hardLine} />

        <div className={stylesModal.containerContent}>
          <input
            type="text"
            placeholder="Todo Name"
            className={stylesModal.input}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
          />

          <button
            className={stylesModal.buttonSubmit}
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </ModalIndex>

      <ToastContainer />
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const tab = context.query.tab;
    const page = Number(context.query.page);
    const limit = Number(context.query.limit);

    if (tab === "ALL" || tab === "BOTH" || tab === undefined) {
      store.dispatch(
        getToDoList.initiate({
          limit: limit === undefined ? 10 : limit,
          page: page === undefined ? 1 : page,
        })
      );
    }

    if (tab === "DONE" || tab === "NOT DONE") {
      store.dispatch(
        getToDoByStatus.initiate({
          status: tab === "DONE" ? true : false,
          limit: limit === undefined ? 10 : limit,
          page: page === undefined ? 1 : page,
        })
      );
    }

    const value = await Promise.all(store.dispatch(getRunningQueriesThunk()));
    const data: ITodoResponse[] = value[0].data as ITodoResponse[];

    return {
      props: {
        listToDo: data,
      },
    };
  }
);

export default Index;
