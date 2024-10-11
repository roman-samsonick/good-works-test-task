import '../styles/globals.css';
import { Header } from '@/components/header.component';
import { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps,
}: AppProps) {

  return <div className="h-[100vh] overflow-hidden">
    <Component {...pageProps} />
  </div>;
}
