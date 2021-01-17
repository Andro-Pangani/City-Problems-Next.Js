import Router, { useRouter } from "next/router";
// import MainLayoutTest from "../../Csr/mainLayout";
// import styles from "../styles/main.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { _url } from "../../Csr/_urls";
import { SingleCaseItem } from "../../Csr/Components/singleCaseContent/singleCaseItem";
import { useSelector } from "react-redux";

export default function AboutPage({ content }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      loadFbSdk();
    }

    // console.log(router.query.docId, " ############ Router");
  });

  const clickHandler = () => {
    Router.push(`/`);
  };

  // const getMetaLink = (link) => {
  //   if (link !== metaLink) {
  //     setMetaLink(link);
  //   }
  //   console.log(link, " <- link");
  // };

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

  const { docId, lastSnapshot, length } = router.query;
  return (
    <>
      <Head>
        <title>aqi</title>
        <meta
          property="og:url"
          content={`https://powerful-thicket-90466.herokuapp.com/aqiShare`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="Marjanishvili Ave" />
        <meta
          property="og:image"
          content={`https://powerful-thicket-90466.herokuapp.com/aqi/ge/tbilisi/marjanishvili_ave-veryPoor.png`}
        />
      </Head>
      <div
        className="single_case_container"
        onMouseEnter={() => {
          console.log("Mouse down on container");
        }}
      >
        <header className="single_case_header">
          {/* <div className="single_case-type">{type.toUpperCase()}</div>
          <div className="single_case-address">{address}</div>
          <div className="single_case-upload_date">{upload_date}</div> */}
        </header>
        <div className="single_case_content">
          <img src={`/aqi/ge/tbilisi/marjanishvili_ave-veryPoor.png`} />
        </div>
        <div
          className="fb-share-button"
          onMouseEnter={() => {
            console.log("Mouse down");
          }}
          data-layout="button"
          data-size="small"
          data-href={`https://powerful-thicket-90466.herokuapp.com/aqiShare`}
        ></div>
        <button onClick={clickHandler}> to Home</button>
        {/* <MainLayoutTest query={query} /> */}
      </div>
    </>
  );
}
