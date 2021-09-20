/* eslint-disable @next/next/no-img-element */
import { Fragment, ReactElement } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ellipseAddress } from '../lib/utilities'
import { useState } from 'react'
import {
  LoginIcon,
  LogoutIcon,
  StatusOnlineIcon,
} from '@heroicons/react/outline'
// import Link from "next/link"
import ConnectModal from '../components/ConnectModal'
import UserAvatar from './UserAvatar'
const navigation = [
  { name: 'Overview', href: '/', current: false },
  { name: 'DeFi', href: '/defi', current: false },
  { name: 'Ocean', href: '/ocean', current: true },
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
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {address && (
                    <div className="grid">
                      <div>
                        {/* <p className="mb-1">Address:</p> */}
                        <p className=" rounded-full px-2 py-1 bg-gray-900 text-white text-xs bg-opacity-50 text-opacity-90 mx-2">
                          {ellipseAddress(address)}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* {address && (
          <div className="grid">
            <div>
              <p className=" rounded-full px-2 py-1 bg-gray-900 text-white bg-opacity-50 text-opacity-90 w-24 hover:w-full truncate overflow-ellipsis overflow-hidden">{address}</p>
            </div>
          </div>
        )} */}
                  {!address && !web3p && !web3Provider && (
                    <button
                      className="w-full border-white border-2 space-x-3 flex-row flex justify-between  rounded-md shadow pr-3 py-2 bg-transparent text-white font-mediumnhover:bg-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      //  className="rounded-full bg-green-400 px-3 py-2 text-white hover:bg-green-500"
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
                          <Menu.Item>
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
                          </Menu.Item>
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
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
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
