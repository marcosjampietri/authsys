import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './index'

interface toggleState {
    NavOn: boolean;
}

const initialState = {
    CartOn: false,
    NavOn: false,
} as toggleState


const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {

        navOnAction(state) {
            state.NavOn = true
        },
        navOffAction(state) {
            state.NavOn = false
        },

    },
})

export const {navOnAction, navOffAction } = toggleSlice.actions
export const selectToggle = (state: AppState) => state.toggle;
export default toggleSlice.reducer

