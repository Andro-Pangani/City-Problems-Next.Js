import { Provider, connect } from "react-redux";
import App from "next/app";
import "../styles/globals.scss";
import withRedux from "next-redux-wrapper";
import { store } from "../Csr/Redux/Store";
import { useEffect } from "react";
import { getMainDataSuccess } from "../Csr/Redux/( a-r )getMainData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be accessed by the client
    return { pageProps: pageProps };
  }

  componentDidMount() {
    console.log("<<<<<<<<<<<<<<<>>>>>>> Component _app.js Mounted");
  }

  render() {
    //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  getMainDataSuccess,
};

const makeStore = () => store;

// export default withRedux(makeStore)(MyApp);
export default MyApp;
