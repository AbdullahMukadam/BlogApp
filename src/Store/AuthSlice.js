import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  UserData: null
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state,action)=>{
      state.status = true,
      state.UserData = action.payload.UserData
    },
    logout:(state,action)=>{
      state.status = false,
      state.UserData = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = AuthSlice.actions

export default AuthSlice.reducer