import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../store';
  
  // declaring the types for our state
  export type AuthState = {
    logined: Boolean;
    wallet: string;
    token: string;
    user_name: string;
    user_email: string;
    is_verify: Number;
    user_id: Number;
    nonce: Number;
  };
  
  const initialState: AuthState = {
    logined: false,
    wallet: "",
    token: "",
    user_name: "",
    user_email: "",
    is_verify: 0,
    user_id: null,
    nonce: null
  };
  
  export const loginSlice = createSlice({
    name: 'login',
    initialState,
  // The `reducers` field lets us define reducers and generate associated actions. 
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
    reducers: {
      
      login: (state, action: PayloadAction<Object>) => {
        state.logined = true;
        state.wallet = action.payload['wallet'];
        state.token = action.payload['token'];
        state.user_name = action.payload['user_name'];
        state.user_email = action.payload['user_email'];
        state.is_verify = action.payload['is_verify'];
        state.user_id = action.payload['user_id'];
        state.nonce = action.payload['nonce'];

        localStorage.setItem('auth', JSON.stringify(state));
        localStorage.setItem('token', state.token as string);
      },

      logout: (state) => {
        state.logined = false,
        state.wallet = "",
        state.token = "",
        state.user_name = "",
        state.user_email = "",
        state.is_verify = 0,
        state.user_id = null,
        state.nonce = null
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
      }
    },
  });
  // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
  export const {
    login,
    logout
  } = loginSlice.actions;
  
  // exporting the reducer here, as we need to add this to the store
  export default loginSlice.reducer;