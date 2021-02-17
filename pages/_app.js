import '../styles/globals.scss'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const LoginUri = 'https://discord.com/api/oauth2/authorize?client_id=774632098966667304&redirect_uri=http%3A%2F%2Ftest.stormdev.club%3A3000%2Fcallback&response_type=code&scope=identify%20guilds%20email'
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

export default MyApp