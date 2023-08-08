import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "@/config/redux.store";
import Layout from "@/components/layout";

export default function App({ Component, ...rest }: AppProps) {
  const route = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      {route.pathname.includes("error") ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
