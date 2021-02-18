import '../styles/globals.scss'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import {AppContext} from "next/app";
import {AppInitialProps} from "next/app";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())



function MyApp({ Component, pageProps: {LoginUri, ...pageProps} }) {
  return <div>
    <div className="navbar bg-primary navbar-expand navbar-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">SYSTEM</a>
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={(() => {
              window.open(LoginUri, 'login', 'width=500,height=776')
            })}>로그인</a>
          </li>
        </ul>
      </div>
    </div>
    <Component {...pageProps} />
  </div>
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const LoginUri = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.DISCORD_CALLBACK_URI)}&response_type=code&scope=identify%20guilds%20email&prompt=none`

  return { pageProps: {...pageProps, LoginUri} };
}



export default MyApp