import React from "react";
import Head from "next/head";

const MainLayout = ({ children }: any) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <title>RTJam Nation</title>
      <meta name="rtjam-nation-app" content="RTJam Nation" />
      <meta name="viewport" content="width=device-width, initial-scale=0.8"></meta>
      <script src="/javascript/ActionheroWebsocketClient.js" />
    </Head>

    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div className="content-wrapper">{children}</div>
  </>
);

export default MainLayout;
