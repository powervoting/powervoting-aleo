import './global.css'
import Header from '@/components/Header'
import { StoreProvider } from '@/lib/context'

export default function Layout ({ children }) {
  return (
    <html lang='en'>
      <body className='bg-[#1B2331] text-[#fff]'>
        <StoreProvider>
          <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
            <Header />
            <div className='w-[1200px] mx-auto pt-10 pb-20'>{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
