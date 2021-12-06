import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { wrapper } from "../common/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFunctionsUtils from "@date-io/date-fns";
import { UserProvider } from "../modules/user/services/user/provider";

const MyApp = ({ Component, pageProps: { session, meta = {}, ...props } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <div>
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
      <UserProvider>
        <MuiPickersUtilsProvider utils={DateFunctionsUtils}>
          {getLayout(<Component {...props}></Component>)}
        </MuiPickersUtilsProvider>
      </UserProvider>
    </div>
  );
};

export default wrapper.withRedux(MyApp);
