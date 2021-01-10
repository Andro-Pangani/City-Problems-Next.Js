import Head from "next/head";
import Link from "next/link";

import React from "react";
import MainLayoutTest from "../Csr/mainLayout";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="appContainer">
        <MainLayoutTest title={"Home"}>
          <h2> Welcome to Home Page</h2>
        </MainLayoutTest>
      </div>
    );
  }
}
