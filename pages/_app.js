import { Provider } from "react-redux";

import { ThemeProvider } from "@chakra-ui/core";

import store from "./../redux/store";
import "../styles/index.css";
import newTheme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={newTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
