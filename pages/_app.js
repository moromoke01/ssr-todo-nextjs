// import "@/styles/globals.css";
// import { wrapper } from "@/store/store";
// import { Provider } from "react-redux";

//  function App({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//        <Component {...pageProps} />;
//     </Provider>
//   )
  
// }

// export default wrapper.withRedux(App)


import "@/styles/globals.css";
import { wrapper } from "@/store/store";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);

