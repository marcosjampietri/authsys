import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './index'

interface modState {
    ModOn: boolean;
    AllowMod: boolean;
}

const initialState = {
    ModOn: false,
    AllowMod: true,
} as modState


const modSlice = createSlice({
    name: 'mod',
    initialState,
    reducers: {
        modOnAction(state) {
            state.ModOn = true
        },
        modOffAction(state) {
            state.ModOn = false
        },


    },
})

export const { modOnAction, modOffAction } = modSlice.actions
export const selectModal = (state: AppState) => state.mod;
export default modSlice.reducer

