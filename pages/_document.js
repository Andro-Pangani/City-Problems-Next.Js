import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  fbSdkLoad() {

   
    window.fbAsyncInit = function () {
      FB.init({
        appId: "515172929069901",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v9.0",
      });
    };
  }

  componentDidMount() {
    this.fbSdkLoad();
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
          <div id="fb-root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
