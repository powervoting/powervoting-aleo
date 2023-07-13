'use client'
import logo from '@/public/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { useStore } from '@/lib/context'
import {
  connectWalletPlugin,
  walletAccount,
  walletConnected,
  disconnectWalletPlugin
} from '@/api/aleo'
import { useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { shortAddress } from '@/util'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
function hasWallet () {
  return window && window.wallet
}

export default function Header () {
  const [state, dispatch] = useStore()

  useEffect(() => {
    connectWallet()
    window.addEventListener('focus', connectWallet)
    return () => {
      window.removeEventListener('focus', connectWallet)
    }
  }, [])

  async function connectWallet () {
    console.log("try to connect")
    if (!hasWallet()) return
    let isConnect = walletConnected()
    console.log(isConnect)
    dispatch({ type: 'walletConnected', value: isConnect })
    if (isConnect) {
      setAddressData()
      return
    }
    await connectWalletPlugin()
    if (await walletConnected()) {
      dispatch({ type: 'walletConnected', value: true })
      setAddressData()
    } else {
      dispatch({ type: 'currentAddress', value: '' })
    }
  }

  async function setAddressData () {
    let account = await walletAccount()
    console.log(account)
    if (account && account.address) {
      dispatch({ type: 'currentAddress', value: account.address })
    }
  }
  function disConnect () {
    dispatch({ type: 'walletConnected', value: false })
    disconnectWalletPlugin()
  }
  console.log({ state })
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

        {state.currentAddress ? (
          <Menu>
            <Menu.Button>
              <span className='inline-block rounded hover:opacity-80 py-4 px-8 text-xl bg-[#1991EB] text-[#fff]'>
                {shortAddress(state.currentAddress)}
              </span>
            </Menu.Button>
            <Transition
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  <CopyToClipboard
                    text={state.currentAddress}
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

                  <Menu.Item onClick={disConnect}>
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
          <Button type='primary' onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
