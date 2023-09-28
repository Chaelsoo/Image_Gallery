import './globals.css'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Home',
  description: "Great pictures to look at ",
}

export const revalidate = 360

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="/favicon.ico" rel="icon" type="image/x-icon" />
              </head>

      <body >
        <Navbar/>
        <main className='mx-auto max-w-6xl'>{children} </main></body>
    </html>
  )
}
