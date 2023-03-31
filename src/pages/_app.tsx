import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React, { useEffect , useState } from 'react'
import theme from 'theme/theme'
import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head';

// streamr 
import Provider from 'streamr-client-react';

function MyApp ({ Component, pageProps }: AppProps) {

  const [options, setOptions] = useState({});

  useEffect(() => {
    if(window.ethereum){
      setOptions({
        auth: { ethereum: window.ethereum }
      });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>InstantHomes Dashboard</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <React.StrictMode>
        <Provider {...options}>
          <Component {...pageProps} />
        </Provider>
      </React.StrictMode>
    </ChakraProvider>
  )
}

export default MyApp
