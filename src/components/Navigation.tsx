/* eslint-disable @next/next/no-img-element */
import { Fragment, ReactElement } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ellipseAddress } from '../lib/utilities'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  LoginIcon,
  LogoutIcon,
  StatusOnlineIcon,
} from '@heroicons/react/outline'
// import Link from "next/link"
import ConnectModal from '../components/ConnectModal'
import UserAvatar from './UserAvatar'
const navigation = [
  { name: 'DeFi', href: '/defi' },
  { name: 'Ocean', href: '/ocean' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export type NavigationProps = {
  connect: any
  disconnect: any
  address: string
  web3Provider: any
  chainData: any
}
export default function Navigation({
  connect,
  disconnect,
  address,
  web3Provider,
  chainData,
}: NavigationProps): ReactElement {
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  let web3p
  if (typeof window !== 'undefined') {
    web3p = localStorage?.getItem('WEB3_CONNECT_CACHED_PROVIDER')
  }
  const router = useRouter()
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-transparent border-b-2 border-white border-opacity-10"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex">
                  <Link href="/">
                    <a className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-8 h-8 mr-2 ml-12 sm:ml-0"
                          width="64"
                          height="64"
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.403013 37.3991L26.6009 63.597C13.2225 61.3356 2.66442 50.7775 0.403013 37.3991Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M0 30.2868L33.7132 64C35.7182 63.8929 37.6742 63.6013 39.5645 63.142L0.85799 24.4355C0.398679 26.3259 0.10713 28.2818 0 30.2868Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M2.53593 19.4042L44.5958 61.4641C46.1277 60.8066 47.598 60.0331 48.9956 59.1546L4.84543 15.0044C3.96691 16.402 3.19339 17.8723 2.53593 19.4042Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M7.69501 11.1447C13.5677 4.32093 22.2677 0 31.9769 0C49.6628 0 64 14.3372 64 32.0231C64 41.7323 59.6791 50.4323 52.8553 56.305L7.69501 11.1447Z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-shrink-0 hidden md:block">
                        <h1 className="text-xl font-bold text-white leading-none">
                          DeFi Recommendation Portal
                        </h1>
                        <h2 className="text-xs font-medium text-white text-opacity-70 leading-none">
                          DeFi recommendations from your social circle
                          {/* Powered by UTU Trust Engine */}
                        </h2>
                      </div>
                    </a>
                  </Link>

                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.href === router.pathname
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={
                              item.href === router.pathname ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {address && (
                    <div className="grid">
                      <div>
                        <p className=" rounded-full hidden md:block px-2 py-1 bg-gray-900 text-white text-xs bg-opacity-50 text-opacity-90 mx-2">
                          {ellipseAddress(address)}
                        </p>
                      </div>
                    </div>
                  )}

                  {!address && !web3p && !web3Provider && (
                    <button
                      className="w-full border-white border-2 space-x-3 flex-row flex justify-between  rounded-md shadow pr-3 py-2 bg-transparent text-white font-mediumnhover:bg-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      onClick={() => setIsConnectOpen(true)}
                    >
                      <p>
                        <LoginIcon
                          className="h-6 w-6 ml-3"
                          aria-hidden="true"
                        />
                      </p>
                      <p className="mt-0.5">CONNECT</p>
                    </button>
                  )}
                  {address && <UserAvatar address={address} size={32} />}

                  {address && (
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="ml-3 bg-transparent p-1 rounded-full text-white hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <span className="sr-only">View notifications</span>

                          <DotsVerticalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'px-4 py-1 mt-1 text-sm  bg-gray-50 text-gray-700 text-right flex flex-row space-x-2'
                                )}
                              >
                                <StatusOnlineIcon
                                  className="h-6 w-6 text-green-500"
                                  aria-hidden="true"
                                />
                                <p className="mt-0.5 font-medium text-gray-500">
                                  {chainData?.name}
                                </p>
                              </div>
                            )}
                          </Menu.Item>
                          {/* <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={disconnect}
                                className={classNames(
                                  active ? 'bg-red-100 text-red-500 ' : '',
                                  'justify-between flex flex-row whitespace-nowrap px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Disconnect wallet
                                <LogoutIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.href === router.pathname
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={
                        item.href === router.pathname ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {!address && isConnectOpen && (
        <ConnectModal
          connect={connect}
          open={isConnectOpen}
          setOpen={setIsConnectOpen}
        />
      )}
    </>
  )
}
