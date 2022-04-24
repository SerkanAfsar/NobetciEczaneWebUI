import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'nprogress/nprogress.css';
import '../styles/globals.scss'
import Layout from '../Components/Layout'
import NProgress from 'nprogress';
import Router from 'next/router';



Router.onRouteChangeStart = () => {

  NProgress.start();


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
