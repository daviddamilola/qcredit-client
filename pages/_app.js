import React from 'react';
import App from "next/app";
import Head from "next/head";
import { SideProvider } from '../components/Drawer';
import {AuthProvider} from '../context/authenticate';
import '../css/main.css';
import '../css/forms.css';
// import '../css/dashboard.css';
import '../css/spinner.css';

function HomePage({Component, pageProps}) {
    return (
      <>
        <Head>
        <title>Quick Credit</title>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
       </Head>
       <AuthProvider>
        <SideProvider>
          <Component {...pageProps} />
        </SideProvider>
       </AuthProvider>
      </>
    )
  }
  
  export default HomePage
