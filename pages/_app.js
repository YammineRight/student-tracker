import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { wrapper } from "../common/store";

const MyApp = ({ Component, pageProps: { meta = {}, ...props } }) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Courses Overflow</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta property="og:title" content="Courses Overflow" />
        <meta property="og:description" content="Keep track of all your courses in one place." />
      </Head>
      {getLayout(<Component {...props}></Component>)}
    </>
  );
};

export default wrapper.withRedux(MyApp);
