import React from 'react';
import App from "next/app";
import Head from "next/head";
import { SideProvider } from '../components/Drawer';
import {AuthProvider} from '../context/authenticate';
import  {LoansProvider} from '../context/loans';
import '../css/main.css';
import '../css/forms.css';
import { ThemeProvider } from '@material-ui/core/styles';
import '../css/spinner.css';
import theme from '../theme';

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
        <ThemeProvider  theme={theme}>
          <LoansProvider>
            <Component {...pageProps} />
          </LoansProvider>
        </ThemeProvider>
        </SideProvider>
       </AuthProvider>
      </>
    )
  }
  
  export default HomePage
