import App from "next/app";

import MainLayout from "../components/layout/main";
import DefaultLayout from "../components/layout/default";
import { HandlerContextProvider } from "../contexts/HandlerContext";

import "@appigram/react-rangeslider/lib/index.css";
import "reactjs-popup/dist/index.css";
import "../css/styles.scss";

export default class RtjamApp extends App {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { Component, pageProps } = this.props;
    // @ts-ignore

    return (
      <HandlerContextProvider>
        <MainLayout>
          <DefaultLayout {...pageProps}>
            <Component {...pageProps} />
          </DefaultLayout>
        </MainLayout>
      </HandlerContextProvider>
    );
  }
}
