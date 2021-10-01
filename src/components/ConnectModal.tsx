import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef, ReactElement, useState } from 'react'
import { XIcon, LoginIcon, UserAddIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'

import { storeAddress } from '../redux/actions/wallet.actions'

export type ConnectModalProps = {
  connect: VoidFunction
  open: boolean
  setOpen: (arg0: boolean) => void
}

export default function ConnectModal({
  connect,
  open,
  setOpen,
}: ConnectModalProps): ReactElement {
  //   const [open, setOpen] = useState(open)
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const cancelButtonRef = useRef(null)
  const openDashboard = async () => {
    const result = await dispatch(storeAddress({ address }))
    if (!result) {
      setErrorMsg('Please provide a valid Ethereum address')
      return
    }
  }

  const onChangeAddress = (_e: any) => {
    if (errorMsg) {
      setErrorMsg('')
    }

    setAddress(_e.target.value)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-0 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-96 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserAddIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Connect your wallet
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Please, Input your wallet address or ENS domain manually
                        or connect it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <input
                    onChange={onChangeAddress}
                    aria-label="address"
                    type="text"
                    value={address}
                    className="font-mono appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:max-w-lg"
                    placeholder="Enter ENS domain or a Ethereum address"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errorMsg && errorMsg}
                  </p>
                  <div className="flex rounded-md sm:mt-0  sm:flex-shrink-0">
                    <button
                      onClick={openDashboard}
                      className="mt-4 w-full bg-primary shadow  flex items-center justify-center py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white hover:shadow-md focus:outline-none transition duration-150 ease-in-out"
                    >
                      SET MY WALLET ADDRESS
                    </button>
                  </div>
                  <p className="my-5 text-center justify-center w-full">OR</p>
                  <button
                    type="button"
                    className="shadow inline-flex justify-between rounded-md border border-transparent px-4 py-3 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto "
                    onClick={() => connect()}
                  >
                    CONNECT YOUR WALLET
                    <LoginIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="z-0 hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="bg-gray-50 px-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="mx-auto justify-between whitespace-nowrap flex flex-col font-light my-5 text-center text-gray-400 text-sm w-full">
                  <div className="whitespace-nowrap flex flex-row w-full  space-x-3 justify-between">
                    <p className="font-medium text-gray-700">
                      Supported wallets:
                    </p>
                    <div className="flex flex-row space-x-5">
                      <div className="whitespace-nowrap flex flex-row align-center justify-center font-medium space-x-2">
                        <img
                          width="24px"
                          height="24px"
                          src="/wallets/metamask.svg"
                          alt="Metamask Fox"
                        />
                        <p className="">Metamask</p>
                      </div>
                      <div className="whitespace-nowrap flex flex-row align-center justify-center font-medium space-x-2">
                        <img
                          width="24px"
                          height="24px"
                          src="/wallets/walletconnect.svg"
                          alt="WalletConnect"
                        />
                        <p>WalletConnect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
