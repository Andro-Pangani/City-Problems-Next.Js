import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import React, { useEffect } from "react";
import MainLayoutTest from "../Csr/mainLayout";

export default function Home() {
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    if (query.docId) {
      router.push("/");
    }
  });

  return (
    <div className="appContainer">
      <MainLayoutTest router={router} title={"Home"}>
        <h2> Welcome to Home Page</h2>
      </MainLayoutTest>
    </div>
  );
}
