'use client'
import Link from 'next/link'
import Button from '@/components/Button'
import { useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { shortAddress } from '@/util'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useSWR, { mutate } from 'swr'
import aleoFetcher from '@/fetcher/aleo'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

const links = [
  {
    name: 'Voting',
    href: '/'
  },
  {
    name: 'DAO Governance',
    href: '/dao-governance/'
  }
]

export default function Header () {
  const pathname = usePathname()
  const { data: walletAccount, mutate: walletAccountMutate } = useSWR(
    'walletAccount',
    aleoFetcher
  )
  const { data: walletConnected } = useSWR('walletConnected', aleoFetcher)
  const [autoConnect, setAutoConnect] = useState(true)

  useEffect(() => {
    const focusHandle = () => {
      if (!walletConnected && autoConnect) {
        aleoFetcher('connect').then(walletAccountMutate)
        setAutoConnect(false)
      }
    }
    focusHandle()
    // globalThis.addEventListener('focus', focusHandle)
    // return () => {
    //   globalThis.removeEventListener('focus', focusHandle)
    // }
  }, [walletConnected, autoConnect])

  return (
    <header className='flex h-[96px]  px-8 items-center justify-between bg-[#273141]'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <Link href='/'>
            <img
              className='h-[64px] w-auto'
              src='/images/logo.png'
              alt='power voting logo'
            />
          </Link>
        </div>
        <div className='ml-20 flex items-baseline space-x-20'>
          {links.map((link, index) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={classNames(
                  'text-2xl hover:opacity-80 relative',
                  isActive ? 'text-white' : 'text-[#7F8FA3] '
                )}
              >
                {isActive && (
                  <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex w-8 justify-between'>
                    <i className='w-1.5 h-1.5 rounded-full bg-[#2DA1F7]' />
                    <i className='w-1.5 h-1.5 rounded-full bg-[#2DA1F7]' />
                    <i className='w-1.5 h-1.5 rounded-full bg-[#2DA1F7]' />
                  </div>
                )}
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

        {walletAccount?.address ? (
          <Menu>
            <Menu.Button>
              <span className='inline-block rounded hover:opacity-80 py-4 px-8 text-xl bg-[#1991EB] text-[#fff]'>
                {shortAddress(walletAccount.address)}
              </span>
            </Menu.Button>
            <Transition
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100 relative z-10'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  <CopyToClipboard
                    text={walletAccount.address}
                    onCopy={() => {
                      console.log('X')
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-[#1991EB] text-[#fff]'
                              : 'text-gray-900'
                          } group flex w-full items-center rounded py-4 px-8 text-xl`}
                        >
                          Copy Address
                        </button>
                      )}
                    </Menu.Item>
                  </CopyToClipboard>

                  <Menu.Item
                    onClick={async () => {
                      await aleoFetcher('cancelPre')
                      await aleoFetcher('disConnect')
                      walletAccountMutate([])
                    }}
                  >
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-[#1991EB] text-[#fff]' : 'text-gray-900'
                        } group flex w-full items-center rounded py-4 px-8 text-xl`}
                      >
                        Disconnect
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Button
            type='primary'
            onClick={() => {
              aleoFetcher('connect').then(walletAccountMutate)
            }}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
