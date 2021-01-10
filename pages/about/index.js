import Router from "next/router";
// import MainLayoutTest from "../../Csr/mainLayout";
// import styles from "../styles/main.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      loadFbSdk();
    }
  });

  const clickHandler = () => {
    Router.push("/");
  };

  const loadFbSdk = () => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: 515172929069901,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  return (
    <>
      <Head>
        <title>About Page</title>
        <meta
          property="og:url"
          content="https://www.your-domain.com/your-page.html"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Your description" />
        <meta
          property="og:image"
          content="https://www.your-domain.com/path/image.jpg"
        />
      </Head>
      <h1>About Page</h1>

      <button onClick={clickHandler}> to Home</button>
      <div
        className="fb-share-button"
        data-href="https://hiddenwood.herokuapp.com"
      ></div>
    </>
  );
}
