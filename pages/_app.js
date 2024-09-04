import "@/styles/globals.css";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";

 function App({ Component, pageProps }) {
  const {store , props} =wrapper.useWrappedStore(pageProps)

  return (
    <Provider store={store}>
       <Component {...props.pageProps} />;
    </Provider>
  )
  
}

export default wrapper.withRedux(App)


// import "@/styles/globals.css";
// import { wrapper } from "@/store/store";

// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default wrapper.withRedux(App);

