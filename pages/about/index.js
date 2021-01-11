import Router, { useRouter } from "next/router";
// import MainLayoutTest from "../../Csr/mainLayout";
// import styles from "../styles/main.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { _url } from "../../Csr/_urls";

export default function AboutPage({ content }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      loadFbSdk();
    }

    console.log(router.query.docId, " ############ Router");
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

  const { address, type, description, Url, upload_date } = content.data;
  const docId = router.query.docId;

  console.log(docId, " ####### docId form about");

  return (
    <>
      <Head>
        <title>About Page</title>
        <meta
          property="og:url"
          content={`https://powerful-thicket-90466.herokuapp.com/about?docId=${docId}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Your description" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/deligation-40179.appspot.com/IMG_20201013_195931.jpg"
        />
      </Head>
      <div className="single_case_container">
        <div className="single_case-type">{type.toUpperCase()}</div>
        <div className="single_case-address">{address}</div>
        <div className="single_case-upload_date">{upload_date}</div>
        <div className="single_case_content">
          {content.data.Url.map((item, index) => {
            return item.type === "image" ? (
              <img key={index} className="single_case-image" src={item.link} />
            ) : item.type === "video" ? (
              <video
                key={index}
                className="single_case-video"
                src={item.link}
              />
            ) : null;
          })}
        </div>
        <button onClick={clickHandler}> to Home</button>
        <div
          className="fb-share-button"
          data-href={`https://powerful-thicket-90466.herokuapp.com/about?docId=${docId}`}
        ></div>
      </div>
    </>
  );
}

AboutPage.getInitialProps = async (ctx) => {
  // let content = null;
  const response = await fetch(
    _url.getSingleCase + "?docId=" + ctx.query.docId
  );

  const data = await response.json();

  console.log(data, "###### data from initialProps");

  return {
    content: data,
  };
};
