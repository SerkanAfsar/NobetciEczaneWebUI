import "bootstrap/dist/css/bootstrap.min.css";
import 'nprogress/nprogress.css';
import '../styles/globals.scss'
import Layout from '../Components/Layout'
import NProgress from 'nprogress';
import Router from 'next/router';



Router.onRouteChangeStart = () => {

  NProgress.start();
  NProgress.setHeight("10px");

}

Router.onRouteChangeComplete = () => {
  NProgress.done();
}

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />

    </Layout>
  );
}

export default MyApp
