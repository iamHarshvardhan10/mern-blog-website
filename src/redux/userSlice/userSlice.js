import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    loading : false,
    error : null
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signStart : (state) => {
            state.loading=true;
            state.error = null
        },
        signSuccess : (state , action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signFailure : (state, action) => {
            state.loading = false
            state.error = action.payload

        }
    }
})

export const {signStart , signSuccess , signFailure} = userSlice.actions

export default userSlice.reducer

