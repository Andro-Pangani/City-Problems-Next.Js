import Router, { useRouter } from 'next/router';
// import MainLayoutTest from "../../Csr/mainLayout";
// import styles from "../styles/main.module.css";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { _url } from '../../Csr/_urls';
import { SingleCaseItem } from '../../Csr/Components/singleCaseContent/singleCaseItem';
import { MainLayoutTest } from '../../Csr/mainLayout';
import { useSelector } from 'react-redux';

export default function AboutPage({ content }) {
  const [mounted, setMounted] = useState(false);
  const [metaLink, setMetaLink] = useState(content.data.Url[0].link);
  const router = useRouter();
  const storeData = useSelector((state) => state.material_data.data);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      loadFbSdk();
    }
    if (!storeData) {
      console.log('STORE IS EMPTY BABE FROM ABOUT INDEX', storeData);
    } else {
      console.log('STORE FROM ABOUT INDEX', storeData);
    }

    // console.log(router.query.docId, " ############ Router");
  });

  const clickHandler = () => {
    let empty = storeData ? false : true;
    Router.push(
      `/?docId=${docId}&singleCase=${true}&length=${length}&empty=${empty}&lastSnapshot=${lastSnapshot}`
    );
  };

  const getMetaLink = (link) => {
    if (link !== metaLink) {
      setMetaLink(link);
    }
    console.log(link, ' <- link');
  };

  const loadFbSdk = () => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: 515172929069901,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5', // use version 2.1
      });
    };

    console.log('Loading fb api');
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const { address, type, description, Url, upload_date } = content.data;
  const { docId, lastSnapshot, length } = router.query;
  console.log('######### CONTENT TYPE FROM ABOUT PAGE', content);
  return (
    <>
      <Head>
        <title>{content.data.type.toUpperCase()}</title>
        <meta
          property="og:url"
          content={`https://powerful-thicket-90466.herokuapp.com/about?docId=${docId}&lastSnapshot=${lastSnapshot}&length=${length}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.data.type.toUpperCase()} />
        <meta property="og:description" content={content.data.address} />
        <meta property="og:image" content={content.data.Url[0].link} />
      </Head>
      <div
        className="single_case_container"
        onMouseEnter={() => {
          console.log('Mouse down on container');
        }}
      >
        <div className="single_case">
          <header className="single_case_header">
            <div className="single_case-type">{type.toUpperCase()} </div>
            <div className="single_case-uploaded">
              {upload_date ? upload_date : ' - '}
            </div>
            <div className="single_case-address">
              <div className="single_case-address_title">Location: </div>
              <div className="single_case-address_text">
                {address ? address : '-'}
              </div>
            </div>
            <div className="single_case-upload_date"></div>
          </header>
          <div className="single_case_content">
            {Url.map((item, index) => {
              return (
                <SingleCaseItem
                  getMetaLink={getMetaLink}
                  key={index}
                  link={item.link}
                  item={item}
                  type={item.type}
                  docId={docId}
                />
              );
            })}
          </div>
          <footer className="single_case_footer">
            <div
              className="fb-share-button"
              onMouseEnter={() => {
                console.log('Mouse down');
              }}
              data-layout="button"
              data-size="small"
              data-href={`https://powerful-thicket-90466.herokuapp.com/about?docId=${docId}&lastSnapshot=${lastSnapshot}&length=${length}`}
            ></div>
            <button onClick={clickHandler}>{`< back`}</button>
          </footer>
        </div>
        {/* <MainLayoutTest query={query} /> */}
      </div>
    </>
  );
}

AboutPage.getInitialProps = async (ctx) => {
  // let content = null;
  const response = await fetch(
    _url.getSingleCase + '?docId=' + ctx.query.docId
  );

  const data = await response.json();

  // console.log(data, "###### data from initialProps");

  return {
    content: data,
  };
};
