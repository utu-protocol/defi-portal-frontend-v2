import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getSortedProviders, IProtocol } from '../api';
import { RootState } from '../redux/rootReducer';

export function useProtocols() {
  const [protocols, setProtocols] = useState<IProtocol[]>();

  const { ethAddress } = useSelector(({ address }: RootState) => {
    return {
      ethAddress:address,
    };
  });

  const triggerSubscriptionAndGetProtocols = useCallback(
    () => {
      const cancelTokenSource = axios.CancelToken.source();

      getSortedProviders(ethAddress, cancelTokenSource.token, true)
        .then(response => {
          console.info(`${new Date().toLocaleTimeString()} Triggered Subscription and Retrieved ratings`);
          return setProtocols(response.data.result);
        })
        .catch(handleError);

      return cancelTokenSource;

    }, [ethAddress]
  );

  const getProtocols = useCallback(
    () => {
      const cancelTokenSource = axios.CancelToken.source();

      getSortedProviders(ethAddress, cancelTokenSource.token)
        .then(response => {
          console.info(`${new Date().toLocaleTimeString()} Retrieved ratings`);
          return setProtocols(response.data.result);
        })
        .catch(handleError);

      return cancelTokenSource;

    }, [ethAddress]
  );

  function handleError(error: Error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }

  return { protocols, getProtocols, triggerSubscriptionAndGetProtocols };
}