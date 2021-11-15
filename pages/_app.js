import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { wrapper } from "../common/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFunctionsUtils from "@date-io/date-fns";
import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps: {session, meta = {}, ...props } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider>
      <Head>
        <title>Courses Overflow</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:title" content="Courses Overflow" />
        <meta
          property="og:description"
          content="Keep track of all your courses in one place."
        />
      </Head>
        <MuiPickersUtilsProvider utils={DateFunctionsUtils}>
          {getLayout(<Component {...props}></Component>)}
        </MuiPickersUtilsProvider>
      </Provider>
  );
};

export default wrapper.withRedux(MyApp);
