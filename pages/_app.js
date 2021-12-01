import { wrapper } from "../redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps, store }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
