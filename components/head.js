import React from "react";
import NextHead from "next/head";

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* <link rel="icon" href="/static/favicon.ico" /> */}
  </NextHead>
);

export default Head;
