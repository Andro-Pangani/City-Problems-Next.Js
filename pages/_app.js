import {Provider} from 'react-redux';

import '../styles/globals.scss'
import { store } from '../Redux/main_redux';

export default function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
   <Component {...pageProps} />
  </Provider>
  )
}


