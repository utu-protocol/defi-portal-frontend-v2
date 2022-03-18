

import { useCallback, useEffect } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../api';
import { API_BASE_URL } from '../Config';
import { connectApi, getUTUApiAccessToken } from '../redux/actions/wallet.actions';


const AuthProvider = ({ children }: {
    children: ReactElement | ReactElement[]
}) => {
    const dispatch = useDispatch();
    const { address } = useSelector(
        (state: any) => state.wallet
    )

    const redirectToHome = () => {
        if (
            window.location.pathname !== '/'
        ) {
            window.location.href = '/';
        }
    };

    const checkIfAccessTokenExist = useCallback(async () => {
        const accessToken = await getUTUApiAccessToken();
        if (accessToken) return;
        dispatch(connectApi());
    }, [dispatch])

    const checkAccessTokenValidity = useCallback(async () => {
        const accessToken = await getUTUApiAccessToken();
        if (!accessToken) return;

        try {
            await apiRequest.get(`${API_BASE_URL}/social/status`);
        } catch (e: any) {
            if (e.response && e.response.status === 401) {
                dispatch(connectApi());
            }
        }
    }, [dispatch])

    useEffect(() => {
        if (!address) return redirectToHome();
        checkAccessTokenValidity();
    }, [address]);

    useEffect(() => {
        if (!address) return;
        checkIfAccessTokenExist();
    }, []);
    
    return <>{children}</>;
};

export default AuthProvider;