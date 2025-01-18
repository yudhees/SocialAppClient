import { createSlice, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: {},
      token:'',
    },
    reducers: {
      setUser:(state,action)=>{
         state.user=action.payload||{}
      },
      setToken:(state,action)=>{
        state.token=action.payload||''
        localStorage.setItem('authToken',state.token)
        axios.defaults.headers.common['Authorization'] =state.token;
      }
    }
  })
  export const { setUser,setToken } = authSlice.actions

  const AuthStore = configureStore({
    reducer:authSlice.reducer,
  });
  
  export default AuthStore;