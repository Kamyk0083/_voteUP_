import { AppProps } from 'next/app';
import { VotingProvider } from '../app/context/VotingContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VotingProvider>
      <Component {...pageProps} />
    </VotingProvider>
  );
}

export default MyApp;
