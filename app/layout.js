import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const description =
  'Welcome to Red Oak Landscaping serving Lancaster, Lebanon, Berks, and Chester Counties. Providing Design, Installing Landscapes and Hardscapes.'

export const metadata = {
  metadataBase: new URL('https://www.redoakinc.org'),
  title: 'Red Oak Landscaping Inc',
  description,
  icons: { icon: '/images/favicon.png' },
  openGraph: {
    title: 'Red Oak Landscaping Inc',
    description,
    url: '/',
    type: 'website',
    images: '/images/ogimg.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' dir='ltr'>
      <body>
        <div className='wrapper'>
          <Header />
          {children}
          <Footer />
        </div>

        <Script src='https://www.googletagmanager.com/gtag/js?id=G-95LLZXZ5YR' />
        <Script id='gtag'>
          {`window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-95LLZXZ5YR');`}
        </Script>
      </body>
    </html>
  )
}
