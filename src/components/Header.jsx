import logo from '@/public/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
const links = [
  {
    name: 'Voting',
    href: 'voting'
  },
  {
    name: 'DAO Governance',
    href: 'dao-governance'
  }
]
export default function Header () {
  return (
    <header className='flex h-[96px]  px-8 items-center justify-between bg-[#273141]'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <Link href='/'>
            <Image height={64} src={logo} alt='power voting logo' />
          </Link>
        </div>
        <div className='ml-20 flex items-baseline space-x-20'>
          {links.map((link, index) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className='text-2xl text-[#7F8FA3] hover:opacity-80'
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className='space-x-2.5'>
        <Link href='/create'>
          <Button type='primary'>Create A Poll</Button>
        </Link>
        <Button type='primary'>Connect Wallet</Button>
      </div>
    </header>
  )
}
