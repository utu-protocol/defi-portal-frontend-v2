import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type metaMaskState = {
  address: string;
  balance: string;
};


// throw new Error
const  initialState: metaMaskState = {
  address: '',
  balance: ''
}


const newinitialState: metaMaskState = {
    address: (typeof window !== "undefined") ? localStorage?.getItem('address') : '',
    balance: '0',
  };
// }

const metaMaskSlice = createSlice({
  name: 'metaMask',
  initialState: initialState || newinitialState,
  reducers: {
    setMetaAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
      localStorage.setItem('address', state.address);
    },
    setMetaBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload;
    },
  },
});

export const { setMetaAddress, setMetaBalance } = metaMaskSlice.actions;

export default metaMaskSlice.reducer;
